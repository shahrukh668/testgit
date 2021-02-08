#!/usr/bin/perl -w

# import pcaps from voipmonitor's spooldir back into system
# the main use is when database is lost and only pcaps remain in spooldir.
# this way you can resurrect the calls in your db
# keep in mind that the recovery can take days/weeks for large spools

use strict;

eval("use Date::Parse");
if ($@) {
	die "Can't load module Date::Parse. Use 'apt-get install libdatetime-format-dateparse-perl' or 'yum install perl-DateTime-Format-DateParse.noarch'";
}

my $voipcfg = '/etc/voipmonitor-test.conf';
my $spooldir = '/var/spool/voipmonitor';
my $voipbin = '/usr/local/sbin/voipmonitor';
my $mergecap = '/usr/bin/mergecap';
my $tmpdir = '/tmp';
my ($fromstr, $tostr);

sub help {
	my ($msg) = @_;

	print qq{
Error: $msg

Help:
  --mergecap=<binary>
        set binary for merging pcaps. By default its '$mergecap' now.
  --voipbin=<binary>
        set binary for importing pcaps. By default its '$voipbin' now.
  --voipcfg=<cfgfile>
        set configuration file for $voipbin. By default its '$voipcfg' now.
  --spooldir=<directory>
        set directory from which re-import pcaps. By default its '$spooldir' now.
  --tmpdir=<directory>
        set working directory for pcap's processing. By default its '$tmpdir' now.
  --fromdate='<date>'
        set from which date import pcaps. Format is YYYY-MM-DD[ HH:MM]. Need to set.
  --todate='<date>'
        set to which date import pcaps. Format is YYYY-MM-DD[ HH:MM]. Need to set.

Minimal example:

$0 --fromdate='2017-04-08 5:40' --todate='2017-04-10 11:40'

How it works:

The script joins separate SIP/RTP pcaps into one pcap (in tmp directory) and then
run voipmonitor binary with -r parameter (import packets from file).

Some notes:

# import pcaps from voipmonitor's spooldir back into system
# the main use is when database is lost and only pcaps remain in spooldir.
# this way you can resurrect the calls in your db
# keep in mind that the recovery can take days/weeks for large spools
#
};
	exit 0;
}

# process args
foreach (@ARGV) {
	if (/^--voipcfg=([\w\/\.\-]+)/) {
		$voipcfg = $1;
	} elsif (/^--spooldir=([\w\/\.\-]+)/) {
		$spooldir = $1;
	} elsif (/^--tmpdir=([\w\/\.\-]+)/) {
		$tmpdir = $1;
	} elsif (/^--voipbin=([\w\/\.\-]+)/) {
		$voipbin = $1;
	} elsif (/^--mergecap=([\w\/\.\-]+)/) {
		$mergecap = $1;
	} elsif (/^--fromdate=([ \d\:\-]+)/) {
		$fromstr = $1;
	} elsif (/^--todate=([ \d\:\-]+)/) {
		$tostr = $1;
	}
}

# basic checks
unless (-x '/bin/tar') {
	help("/bin/tar binary is needed. Please install.");
}
unless (-x '/bin/gunzip') {
	help("/bin/gunzip binary is needed. Please install.");
}
unless (-x $mergecap) {
	help("Can't access mergecap's binary.");
}
unless (-x $voipbin) {
	help("Can't access voipmonitor's binary.");
}
unless (-f $voipcfg) {
	help("$voipcfg file doesn't exist.");
}
unless (-d $spooldir) {
	help("$spooldir directory doesn't exist.");
}
unless (-d $tmpdir) {
	help("$tmpdir directory doesn't exist.");
}
unless (defined $fromstr) {
	help("No FROM date entered.");
}
unless (defined $tostr) {
	help("No TO date entered.");
}

my $futc = str2time($fromstr);
unless (defined $futc) {
	help("Bad FROM date entered.");
}
my $tutc = str2time($tostr);
unless (defined $tutc) {
	help("Bad TO date entered.");
}
if ($futc >= $tutc) {
	help("FROM date is after TO date. Please fix.");
}

# clean/prepare work space 
`rm -rf $tmpdir/RTP $tmpdir/SIP $tmpdir/MERGE`;
mkdir "$tmpdir/RTP";
mkdir "$tmpdir/SIP";
mkdir "$tmpdir/MERGE";

# calc dates
my (undef, $fmin, $fhour, $fmday, $fmon, $fyear, undef) = localtime($futc);
my (undef, $tmin, $thour, $tmday, $tmon, $tyear, undef) = localtime($tutc);
$fyear += 1900;
$tyear += 1900;
$fmon++;
$tmon++;

my $fdayutc = str2time("$fyear-$fmon-$fmday");
my $tdayutc = str2time("$tyear-$tmon-$tmday");

# process spooldir
opendir DIR, $spooldir or die "Can'r open $spooldir directory: $!";
my @days = sort grep {/^\d{4}-\d{2}-\d{2}$/} readdir DIR;
closedir DIR;

foreach my $day (@days) {
	my $utcday = str2time($day);
	next if ($utcday < $fdayutc);
	last if ($utcday > $tdayutc);

	opendir DAYDIR, "$spooldir/$day" or die "Can't open $spooldir/$day: $!";
	my @hours = sort { $a <=> $b } grep {/^\d{2}$/} readdir DAYDIR;
	closedir DAYDIR;
	foreach my $hour (@hours) {
		if ($utcday == $fdayutc) {
			next if ($hour < $fhour);
		}
		if ($utcday == $tdayutc) {
			last if ($hour > $thour);
		}
		opendir HOMEDIR, "$spooldir/$day/$hour" or die "Can't open $spooldir/$day/$hour: $!";
		my @mins = sort { $a <=> $b } grep {/^\d{2}$/} readdir HOMEDIR;
		close HOMEDIR;
		foreach my $min (@mins) {
			if ($utcday == $fdayutc and $hour == $fhour) {
				next if ($min < $fmin);
			}
			if ($utcday == $tdayutc and $hour == $thour) {
				last if ($min > $tmin);
			}
# get files from SIP directory datetime
			my $dir = "$spooldir/$day/$hour/$min";
			opendir SIPDIR, "$dir/SIP" or die "Can't open $dir/SIP: $!";
			my @sips = grep {!/^\./} readdir SIPDIR;
			closedir SIPDIR;
# get files from RTP directory datetime
			my @rtps;
			if (opendir RTPDIR, "$dir/RTP") {
				@rtps = grep {!/^\./} readdir RTPDIR;
				closedir RTPDIR;
			}
# copy sips to process dir and do untar, unzips ...
			foreach my $sip (@sips) {
				`cp '$dir/SIP/$sip' $tmpdir/SIP`;
				if ($sip =~ /\.gz$/) {
					`gunzip '$tmpdir/SIP/$sip'`;
					$sip =~ s/\.gz$//;
				}
				if ($sip =~ /\.tar$/) {
					`tar xf '$tmpdir/SIP/$sip' -C $tmpdir/SIP`;
					unlink "$tmpdir/SIP/$sip";
				}
			}
# copy rtps to process dir and do untar, join pcap, unzips ...
			foreach my $rtp (@rtps) {
				`cp '$dir/RTP/$rtp' $tmpdir/RTP`;
				if ($rtp =~ /\.gz$/) {
					`gunzip '$tmpdir/RTP/$rtp'`;
					$rtp =~ s/\.gz$//;
				}
				if ($rtp =~ /\.tar$/) {
					`tar xf '$tmpdir/RTP/$rtp' -C $tmpdir/RTP`;
					unlink "$tmpdir/RTP/$rtp";
					opendir DDIR, "$tmpdir/RTP" or die "Can't open $tmpdir/RTP: $!";
					my @files = grep {!/^\./} readdir DDIR;
					closedir DDIR;
					my $ff;
					foreach (@files) {
						my ($fname, $num) = split/#/, $_;
						if (defined $num) {
							push @{$ff->{$fname}->{nums}}, $num;
						} else {
							$ff->{$fname}->{primfile} = 1;
						}
					}
					foreach my $fname (keys %$ff) {
						if (defined $ff->{$fname}->{nums}) {
							foreach my $num (sort {$a <=> $b} @{$ff->{$fname}->{nums}}) {
								`cat '$tmpdir/RTP/$fname#$num' >> '$tmpdir/RTP/$fname.tmp'`;
								unlink "$tmpdir/RTP/$fname#$num";
							}
						}
						`cat '$tmpdir/RTP/$fname' >> '$tmpdir/RTP/$fname.tmp'`;
						unlink "$tmpdir/RTP/$fname";
# check if LZO
						sysopen RTF, "$tmpdir/RTP/$fname.tmp", 0 or die "Can't open $tmpdir/RTP/$fname.tmp: $!";
						my $bytes;
						sysread RTF, $bytes, 3;
						close RTF;
						if ($bytes =~ /LZO/) {
							`$voipbin -kc --unlzo-gui='$tmpdir/RTP/$fname.tmp $tmpdir/RTP/$fname'`;
							unlink "$tmpdir/RTP/$fname.tmp";
						} else {
							rename "$tmpdir/RTP/$fname.tmp", "$tmpdir/RTP/$fname";
						}
					}
				}
			}
# merge prepared sip/rtp files and import via -r parameter
			opendir TMPDIR, "$tmpdir/SIP" or die "Can't open $tmpdir/SIP: $!";
			my $psips;
			map {$psips->{$_} = 1} grep {!/^\./} readdir TMPDIR;
			closedir TMPDIR;
			opendir TMPDIR, "$tmpdir/RTP" or die "Can't open $tmpdir/RTP: $!";
			my $prtps;
			map {$prtps->{$_} = 1} grep {!/^\./} readdir TMPDIR;
			closedir TMPDIR;

			foreach my $fname (keys %$psips) {
				my $param = "'$tmpdir/SIP/$fname'";
				if (defined($prtps->{$fname})) {
					$param .= " '$tmpdir/RTP/$fname'";
				}
				`$mergecap $param -w '$tmpdir/MERGE/$fname'`;
				delete $prtps->{$fname};
				delete $psips->{$fname};
				`$voipbin --config-file=$voipcfg -RSG -k -y -r '$tmpdir/MERGE/$fname'`;
			}
			foreach my $fname (keys %$prtps) {
				`$voipbin --config-file=$voipcfg -RSG -k -y -r '$tmpdir/RTP/$fname'`;
			}
# clean up for next minute
			`rm -rf $tmpdir/MERGE/* $tmpdir/RTP/* $tmpdir/SIP/*`;
		} # min loop
	} # hour loop
} # day loop

