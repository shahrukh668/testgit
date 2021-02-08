_EmailAlertType_RTP		= 1;
_EmailAlertType_SIP_response	= 2;
_EmailAlertType_SIP_various	= 3;
_EmailAlertType_ReasonSipQ850	= 13;
_EmailAlertType_DSCP		= 4;
_EmailAlertType_CPS		= 5;
_EmailAlertType_CALL_TIMEDOUT	= 6;
_EmailAlertType_ASR		= 7;
_EmailAlertType_NER		= 20;
_EmailAlertType_ACD		= 16;
_EmailAlertType_InternalProxyError
				= 8;
_EmailAlertType_TimeWithoutCall
				= 15;
_EmailAlertType_ConcurrentCalls	= 19;
_EmailAlertType_Sensors		= 9;
_EmailAlertType_Fraud_RCC       = 21;
_EmailAlertType_Fraud_CHC       = 22;
_EmailAlertType_Fraud_CHCR      = 23;
_EmailAlertType_Fraud_D         = 24;
_EmailAlertType_Fraud_SPC       = 25;
_EmailAlertType_Fraud_RC        = 26;
_EmailAlertType_Fraud_Seq       = 27;
_EmailAlertType_Fraud_BilingOverQuota        
				= 31;
_EmailAlertType_Fraud_BilingHighRate        
				= 32;
_EmailAlertType_Register_check_active
				= 48;
_EmailAlertType_Register_unreg  = 41;
_EmailAlertType_Register_failed = 42;
_EmailAlertType_Register_ua     = 43;
_EmailAlertType_Register_short  = 44;
_EmailAlertType_Register_mult   = 45;
_EmailAlertType_Register_expire = 46;
_EmailAlertType_Register_rrd    = 47;

_EmailAlertType_SipMsg_qualify  = 49;

_EmailDailyReportType_RTP	= 1;
_EmailDailyReportType_ProxyDegradMOS
				= 12;
_EmailDailyReportType_CdrSummary
				= 14;
_EmailDailyReportType_ConcurrentCallStat
				= 17;
_EmailDailyReportType_CPS	= 50;
_EmailDailyReportType_ConcurrentCallStat_license_chart
				= 18;
_EmailDailyReportType_Chart	= 11;

_cc_aggreg_type_max 		= 0;
_cc_aggreg_type_avg 		= 1;

_cc_interval_minute             = 1;
_cc_interval_hour               = 2;
_cc_interval_day                = 3;

_CdrGroupBy_sipUsers		= 1;
_CdrGroupBy_sipIP		= 2;
_CdrGroupBy_codecs		= 3;
_CdrGroupBy_sipResponse		= 4;
_CdrGroupBy_sipResponse_bye_code
				= 41;
_CdrGroupBy_ipGroup		= 5;
_CdrGroupBy_reasonSip		= 6;
_CdrGroupBy_reasonQ850		= 7;
_CdrGroupBy_ua			= 8;
_CdrGroupBy_country_number	= 21;
_CdrGroupBy_country_caller	= 22;
_CdrGroupBy_country_called	= 23;
_CdrGroupBy_country_sipip	= 24;
_CdrGroupBy_country_sipcallerip = 25;
_CdrGroupBy_country_sipcalledip = 26;

_MessageGroupBy_sipResponse	= 1;
_MessageGroupBy_sipIP		= 2;
_MessageGroupBy_ipGroup		= 3;
_MessageGroupBy_country_number	= 21;
_MessageGroupBy_country_caller	= 22;
_MessageGroupBy_country_called	= 23;
_MessageGroupBy_country_sipip	= 24;
_MessageGroupBy_country_sipcallerip 
				= 25;
_MessageGroupBy_country_sipcalledip 
				= 26;

_TrackerStatusType_Open		= 1;
_TrackerStatusType_Closed	= 2;

_RegState_OK			= 1;
_RegState_Failed		= 2;
_RegState_UnknownMessageOK	= 3;
_RegState_ManyRegMessages	= 4;
_RegState_Expired		= 5;
_RegState_Unregister		= -1;

_FileFormat_Image_Svg		= 1;
_FileFormat_Image_Png		= 2;
_FileFormat_Image_Svg_String	= 'svg';
_FileFormat_Image_Png_String	= 'png';

_AuditActivity_download_wav   	= 1;
_AuditActivity_download_pcap   	= 2;
_AuditActivity_play_wav   	= 3;
_AuditActivity_show_fax   	= 4;
_AuditActivity_batch_download   = 5;
_AuditActivity_filterFormCDR   	= 11;
_AuditActivity_login   		= 91;
_AuditActivity_logout  		= 92;
_AuditActivity_liveSnifferStart	= 93;
_AuditActivity_liveSnifferStop	= 94;
_AuditActivity_getVoiceRecording= 95;
_AuditActivity_getPCAP		= 96;
_AuditActivity_handleActiveCall	= 97;
_AuditActivity_getVoipCalls	= 98;
_AuditActivity_getShareURL	= 99;

_cdrFieldsCaller		= 'caller';
_cdrFieldsCalled		= 'called';
_cdrFieldsSipIpSrc		= 'sipcallerip';
_cdrFieldsSipIpDst		= 'sipcalledip';
_cdrFieldsRtpIpSrc		= 'a_saddr';
_cdrFieldsRtpIpDst		= 'b_saddr';

_cdrSide_Src			= 'src';
_cdrSide_Dst			= 'dst';
_cdrSide_Both			= 'both';

_side_CallerNum			= 1;
_side_CalledNum			= 2;
_side_Caller			= 'caller';
_side_Called			= 'called';

_sipMsg_OPTIONS			= 8;
_sipMsg_SUBSCRIBE		= 7;
_sipMsg_NOTIFY			= 9;

_sensorId_empty			= -2;
_sensorId_all			= -1;

__default_chartWidth		= 800;
__default_chartHeight		= 500;
__default_chartPrevIntervalHourTolerance
				= 12;

_IPPROTO_IP			= 0;
//_IPPROTO_HOPOPTS		= 0;
_IPPROTO_ICMP			= 1;
_IPPROTO_IGMP			= 2;
_IPPROTO_IPIP			= 4;
_IPPROTO_TCP			= 6;
_IPPROTO_EGP			= 8;
_IPPROTO_PUP			= 12;
_IPPROTO_UDP			= 17;
_IPPROTO_IDP			= 22;
_IPPROTO_TP			= 29;
_IPPROTO_DCCP			= 33;
_IPPROTO_IPV6			= 41;
_IPPROTO_ROUTING		= 43;
_IPPROTO_FRAGMENT		= 44;
_IPPROTO_RSVP			= 46;
_IPPROTO_GRE			= 47;
_IPPROTO_ESP			= 50;
_IPPROTO_AH			= 51;
_IPPROTO_ICMPV6			= 58;
_IPPROTO_NONE			= 59;
_IPPROTO_DSTOPTS		= 60;
_IPPROTO_MTP			= 92;
_IPPROTO_ENCAP			= 98;
_IPPROTO_PIM			= 103;
_IPPROTO_COMP			= 108;
_IPPROTO_SCTP			= 132;
_IPPROTO_UDPLITE		= 136;
_IPPROTO_RAW			= 255;
