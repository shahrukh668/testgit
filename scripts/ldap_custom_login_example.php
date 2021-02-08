<?php
# Example script for LDAP login.
# TLS LDAP workaround (when problem with tls certs, not a permanent solution):
# in /etc/ldap/ldap.conf add or uncomment line:
# TLS_REQCERT never
# Added example for MS AD usage. Search for 'AD variant' string.

# debug for manual run
if (!function_exists('debug_log')) {
	function debug_log($txt) {
		echo $txt . "\n";
	}
}
# uncomment next line for test with manual run from command line (php SCRIPTNAME)
#custom_login('USER', 'PASS');

# LOGIN FUNCTION
function custom_login($user, $password) {

# NEED TO SET !!!
# one or more ldap servers
#	$ldapsrvs = array("ldaps://SSL_SERVER1", "ldap://NONSSL_SERVER2");
# username for ldap's access
#	$ldapuser = 'cn=NAME,ou=ORGUNIT,dc=DC_A,dc=DC_B';
# password for ldapuser
#	$ldappass = 'PASS';
# base dn for user's search
#	$ldapbasedn = 'ou=ORG,dc=DC1,dc=DC2';
# END of NEED TO SET

	if (!function_exists('ldap_connect')) {
		debug_log('No ldap module loaded. Please install php ldap module.');
		return(NULL);
	}

	foreach ($ldapsrvs as $ldaps) {

		if (!$connect = @ldap_connect($ldaps)) {
			debug_log("no connection to '$ldaps' failed: " . ldap_error($connect) . ": $ldaps");
			ldap_close($connect);
			continue;
		}

		ldap_set_option($connect, LDAP_OPT_PROTOCOL_VERSION, 3);
		// AD variant
		// ldap_set_option($connect, LDAP_OPT_REFERRALS, 0);

		if (($bind = @ldap_bind($connect, $ldapuser, $ldappass)) == false){
			debug_log("bind to $ldaps: __FAILED__");
			ldap_close($connect);
			continue;
		}

		// search for user
		if (($res_id = ldap_search($connect, $ldapbasedn, "uid=$user")) == false) {
		// possible AD variant
		// if (($res_id = ldap_search($connect, $ldapbasedn, "sAMAccountName=$user")) == false) {
			debug_log("$ldaps failure: search in LDAP-tree failed.");
			ldap_close($connect);
			continue;
		}

		// check number of returned entries
		$numfound = ldap_count_entries($connect, $res_id);
		if ($numfound == 0) {
			debug_log("$ldaps failure: no username $user found.");
			debug_log(var_export(ldap_get_entries($connect, $res_id), true));
			ldap_close($connect);
			continue;
		}
		if ($numfound > 1) {
			debug_log("$ldaps failure: username $user found more than once.");
			debug_log(var_export(ldap_get_entries($connect, $res_id), true));
			ldap_close($connect);
			continue;
		}

/* if you want to check group membership then uncomment this piece of code
		// try to find group membership
		$GROUP = 'YOUR_GROUP';
		if (($res_group = ldap_search($connect, $ldapbasedn, "(&(&(objectClass=posixgroup)(cn=$GROUP))(memberuid=$user))")) == false) {
			debug_log("$ldaps failure: search group in LDAP-tree failed.");
			ldap_close($connect);
			continue;
		}
		if (ldap_count_entries($connect, $res_group) != 1) {
			debug_log("$ldaps failure: username $user not found in the $GROUP group.");
			ldap_close($connect);
			continue;
		}
		// OR AD variant: group containing admin users
		// $GROUP = 'ADM-VoIPmonitor-Users,OU=Resources,OU=Groups,OU=Global,DC=domain,DC=local';
		// recursively search for user in defined group through all nested groups (AD)
		// if (($res_id = ldap_search($connect, $ldapbasedn, "(&(objectCategory=Person)(sAMAccountName=$user)(memberOf:1.2.840.113556.1.4.1941:=CN=$GROUP))")) == false) {
		//	debug_log("$ldaps failure: search group in LDAP-tree failed.");
		//	ldap_close($connect);
		//	continue;
		//}
*/
		// get entry
		if (($entry_id = ldap_first_entry($connect, $res_id)) == false) {
			debug_log("$ldaps failure: entry of search result couln't be fetched.");
			ldap_close($connect);
			continue;
		}

		// get dn of the entry
		if (($user_dn = ldap_get_dn($connect, $entry_id)) == false) {
			debug_log("$ldaps failure: user-dn coulnd't be fetched.");
			ldap_close($connect);
			continue;
		}

		// try to auth with founded username to test entered password
		if (($link_id = ldap_bind($connect, $user_dn, $password)) == false) {
			debug_log("$ldaps failure: username, password didn't match: $user_dn");
			ldap_close($connect);
			continue;
		}
		$info = ldap_get_entries($connect, $res_id);

		//var_dump($info);
		if (isset($info[0]["uidnumber"][0])) {
			$userIdUniqueNum = $info[0]["uidnumber"][0];
		// AD variant
		//if (isset($info[0]["employeeID"][0])) {
		//	$userIdUniqueNum = $info[0]["employeeID"][0];
			debug_log('Login ok.');
		} else {
			$userIdUniqueNum = 666;
			debug_log('Login ok. But no uid number returned !!');
		}

		ldap_close($connect);

		return(array(
			'username' => $user,
			'is_admin' => true,
			'id' => $userIdUniqueNum,	// id is required
//			'id_group' => 1,		// you can set user rights with the gui's group id too
//			'enable_sensors' => array(2,3)
			)
		);

	}
	debug_log("Login for user $user failed.");
	return(NULL);
}

?>
