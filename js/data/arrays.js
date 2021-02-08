function setArrays() {

	arExtScriptIds = {};

	arExtScriptIds[_EmailAlertType_Register_check_active] = [
		['active_total', 'active_total', 'Number of registrations']
	];

	arExtScriptIds[_EmailAlertType_Register_unreg] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['ID', 'ID', 'id'],
		['id_sensor', 'id_sensor', 'Sensor ID'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['calldate', 'calldate', 'Date of call'],
		['expires_at', 'expires_at', 'Expire time'],
		['expires', 'expires', 'Number of expires'],
		['state', 'state', 'State'],
		['rrd_avg', 'rrd_avg', 'Average Registration Request Delay'],
		['fname', 'fname', 'Pcap filename']
	];
	arExtScriptIds[_EmailAlertType_Register_failed] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['ID', 'ID', 'id'],
		['id_sensor', 'id_sensor', 'Sensor ID'],
		['counter', 'counter', 'Counter'],
		['created_at', 'created_at', 'Creation date'],
		['ua_id', 'ua_id', 'ua_id'],
		['fname', 'fname', 'Pcap filename']
	];
	arExtScriptIds[_EmailAlertType_Register_ua] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['at', 'at', 'Date'],
		['prev_state_at', 'prev_state_at', 'Date of previous state'],
		['time_from_prev_state', 'time_from_prev_state', 'Time from previous state'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['prev_state', 'prev_state', 'Previous tate'],
		['state', 'state', 'State']
	];
	arExtScriptIds[_EmailAlertType_Register_short] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['at', 'at', 'Date'],
		['prev_state_at', 'prev_state_at', 'Date of previous state'],
		['time_from_prev_state', 'time_from_prev_state', 'Time from previous state'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['prev_state', 'prev_state', 'Previous tate'],
		['state', 'state', 'State']
	];
	arExtScriptIds[_EmailAlertType_Register_mult] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['ID', 'ID', 'id'],
		['id_sensor', 'id_sensor', 'Sensor ID'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['calldate', 'calldate', 'Date of call'],
		['expires_at', 'expires_at', 'Expire time'],
		['expires', 'expires', 'Number of expires'],
		['state', 'state', 'State'],
		['rrd_avg', 'rrd_avg', 'Average Registration Request Delay'],
		['fname', 'fname', 'Pcap filename']
	];
	arExtScriptIds[_EmailAlertType_Register_expire] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['at', 'at', 'Date'],
		['prev_state_at', 'prev_state_at', 'Date of previous state'],
		['time_from_prev_state', 'time_from_prev_state', 'Time from previous state'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['prev_state', 'prev_state', 'Previous tate'],
		['state', 'state', 'State']
	];
	arExtScriptIds[_EmailAlertType_Register_rrd] = [
		['sipcallerip', 'sipcallerip', 'SIP src ip'],
		['sipcalledip', 'sipcalledip', 'SIP dst ip'],
		['from_num', 'from_num', 'Caller number'],
		['to_num', 'to_num', 'Called number'],
		['contact_num', 'contact_num', 'Contact number'],
		['contact_domain', 'contact_domain', 'Contact domain'],
		['digestusername', 'digestusername', 'Username'],
		['to_domain', 'to_domain', 'Dst domain'],
		['ID', 'ID', 'id'],
		['id_sensor', 'id_sensor', 'Sensor ID'],
		['from_domain', 'from_domain', 'Src domain'],
		['digestrealm', 'digestrealm', 'Realm'],
		['from_name', 'from_name', 'From name'],
		['ua', 'ua', 'User agent'],
		['calldate', 'calldate', 'Date of call'],
		['expires_at', 'expires_at', 'Expire time'],
		['expires', 'expires', 'Number of expires'],
		['state', 'state', 'State'],
		['rrd_avg', 'rrd_avg', 'Average Registration Request Delay'],
		['fname', 'fname', 'Pcap filename']
	];

	arCodec = [
		[0, 'PAYLOAD_PCMU', 		'G.711u'],
		[3, 'PAYLOAD_GSM',		'GSM'],
		[4, 'PAYLOAD_G723',		'G723'],
		[8, 'PAYLOAD_PCMA',		'G.711a'],
		[9, 'PAYLOAD_G722',		'G.722'],
		[12, 'PAYLOAD_QCELP',		'QCELP'],
		[13, 'PAYLOAD_CN',		'CN'],
		[18, 'PAYLOAD_G729',		'G729'],
		[97, 'PAYLOAD_ILBC',		'iLBC'],
		[98, 'PAYLOAD_SPEEX',		'speex'],
		[301, 'PAYLOAD_SILK',		'SILK'],
		[302, 'PAYLOAD_SILK8', 		'SILK8'],
		[303, 'PAYLOAD_SILK12',		'SILK12'],
		[304, 'PAYLOAD_SILK16',		'SILK16'],
		[305, 'PAYLOAD_SILK24',		'SILK24'],
		[306, 'PAYLOAD_ISAC',		'ISAC'],
		[307, 'PAYLOAD_ISAC16',		'ISAC16'],
		[308, 'PAYLOAD_ISAC32',		'ISAC32'],
		[311, 'PAYLOAD_OPUS',		'OPUS'],
		[312, 'PAYLOAD_OPUS8',		'OPUS8'],
		[313, 'PAYLOAD_OPUS12',		'OPUS12'],
		[314, 'PAYLOAD_OPUS16',		'OPUS16'],
		[315, 'PAYLOAD_OPUS24',		'OPUS24'],
		[316, 'PAYLOAD_OPUS48',		'OPUS48'],
		[320, 'PAYLOAD_AMR',		'AMR'],
		[321, 'PAYLOAD_AMRWB',		'AMR WB'],
		[331, 'PAYLOAD_G7221',		'G7221'],
		[332, 'PAYLOAD_G72218',		'G72218'],
		[333, 'PAYLOAD_G722112',	'G722112'],
		[334, 'PAYLOAD_G722116',	'G722116'],
		[335, 'PAYLOAD_G722124',	'G722124'],
		[336, 'PAYLOAD_G722148',	'G722148'],
		[337, 'PAYLOAD_XOPUS',		'XOPUS'],
		[338, 'PAYLOAD_XOPUS8',		'XOPUS8'],
		[339, 'PAYLOAD_XOPUS12',	'XOPUS12'],
		[340, 'PAYLOAD_XOPUS16',	'XOPUS16'],
		[341, 'PAYLOAD_XOPUS24',	'XOPUS24'],
		[342, 'PAYLOAD_XOPUS48',	'XOPUS48'],
		[343, 'PAYLOAD_VXOPUS',		'VXOPUS'],
		[344, 'PAYLOAD_VXOPUS8',	'VXOPUS8'],
		[345, 'PAYLOAD_VXOPUS12',	'VXOPUS12'],
		[346, 'PAYLOAD_VXOPUS16',	'VXOPUS16'],
		[347, 'PAYLOAD_VXOPUS24',	'VXOPUS24'],
		[348, 'PAYLOAD_VXOPUS48',	'VXOPUS48'],
		[1000, 'PAYLOAD_T38',		'FAX T.38'],
		[1001, 'PAYLOAD_T30',		'FAX T.30'],
		[100, 'PAYLOAD_CLEARMODE', 	'CLEARMODE']
	];
	arDelay = [
		[50, '>= 50 ms'],
		[70, '>= 70 ms'],
		[90, '>= 90 ms'],
		[120, '>= 120 ms'],
		[150, '>= 150 ms'],
		[200, '>= 200 ms'],
		[300, '>= 300 ms']
	];
	arNationalOrInternational = [
		[0, 'national + international'],
		[1, 'only national'],
		[2, 'only international']
	];
	arTrunk = [
		[1, 'IN'],
		[2, 'OUT'],
		[3, 'INTERNAL']
	];
/* sip method numbers should be synchonized with #defines from calltable.h */
	arSipMethod = [
		[1, 'INVITE'],
		[2, 'BYE'],
		[3, 'CANCEL'],
		[4, 'REGISTER'],
		[5, 'MESSAGE'],
		[6, 'INFO'],
		[7, 'SUBSCRIBE'],
		[8, 'OPTIONS'],
		[9, 'NOTIFY'],
		[10, 'ACK'],
		[11, 'PRACK'],
		[12, 'PUBLISH'],
		[13, 'REFER'],
		[14, 'UPDATE']
	];
	arFirstLastValue = [
		[0, 'Sensors setting'],
		[1, 'First found value'],
		[2, 'Last found value']
	];
	arAuditActivity = [
		[_AuditActivity_download_wav, arLang.LauditActivity_download_wav],
		[_AuditActivity_download_pcap, arLang.LauditActivity_download_pcap],
		[_AuditActivity_play_wav, arLang.LauditActivity_play_wav],
		[_AuditActivity_show_fax, arLang.LauditActivity_show_fax],
		[_AuditActivity_batch_download, arLang.LauditActivity_batch_download],
		[_AuditActivity_filterFormCDR, arLang.LauditActivity_filterFormCDR],
		[_AuditActivity_login, arLang.LauditActivity_login],
		[_AuditActivity_logout, arLang.LauditActivity_logout],
		[_AuditActivity_liveSnifferStart, arLang.LauditActivity_liveSnifferStart],
		[_AuditActivity_liveSnifferStop, arLang.LauditActivity_liveSnifferStop]
	];
	arRegState = [
		[_RegState_OK, arLang.LregState_OK, '#5FC40C'],
		[_RegState_Failed, arLang.LregState_Failed],
		[_RegState_UnknownMessageOK, arLang.LregState_UnknownMessageOK],
		[_RegState_ManyRegMessages, arLang.LregState_ManyRegMessages],
		[_RegState_Expired, arLang.LregState_Expired, 'red'],
		[_RegState_Unregister, arLang.LregState_Unregister, '#FFD941']
	];
	arTrackerStatusType = [
		[_TrackerStatusType_Open, arLang.LtrackerStatusType_Open],
		[_TrackerStatusType_Closed, arLang.LtrackerStatusType_Closed]
	];
	arTrackerPriority = [
		[1, arLang.LtrackerPriotity_1],
		[2, arLang.LtrackerPriotity_2],
		[3, arLang.LtrackerPriotity_3],
		[4, arLang.LtrackerPriotity_4],
		[5, arLang.LtrackerPriotity_5]
	];
	arAlertType = [
		[_EmailAlertType_RTP, arLang.LemailAlertType_RTP, arLang.LemailAlertType_RTP_descr],
		[_EmailAlertType_SIP_response, arLang.LemailAlertType_SIP_response, arLang.LemailAlertType_SIP_response_descr],
		//[_EmailAlertType_SIP_various, 'SIP Various']*/
	];
	if(window.existsCdrReason) arAlertType.push(
		[_EmailAlertType_ReasonSipQ850, arLang.LemailAlertType_ReasonSipQ850, arLang.LemailAlertType_ReasonSipQ850_descr]
	)
	arAlertType.push(
		[_EmailAlertType_CPS, arLang.LemailAlertType_CPS, arLang.LemailAlertType_CPS_descr]
	);
	if(window.existsDscpCdr) arAlertType.push(
		[_EmailAlertType_DSCP, arLang.LemailAlertType_DSCP, arLang.LemailAlertType_DSCP_descr]
	);
	arAlertType.push(
		[_EmailAlertType_ASR, arLang.LemailAlertType_ASR, arLang.LemailAlertType_ASR_descr],
		[_EmailAlertType_NER, arLang.LemailAlertType_NER, arLang.LemailAlertType_NER_descr],
		[_EmailAlertType_ACD, arLang.LemailAlertType_ACD, arLang.LemailAlertType_ACD_descr],
		[_EmailAlertType_InternalProxyError, arLang.LemailAlertType_InternalProxyError, arLang.LemailAlertType_InternalProxyError_descr],
		[_EmailAlertType_CALL_TIMEDOUT, arLang.LemailAlertType_CALL_TIMEDOUT, arLang.LemailAlertType_CALL_TIMEDOUT_descr],
		[_EmailAlertType_TimeWithoutCall, arLang.LemailAlertType_TimeWithoutCall, arLang.LemailAlertType_TimeWithoutCall_descr],
		[_EmailAlertType_ConcurrentCalls, arLang.LemailAlertType_ConcurrentCalls, arLang.LemailAlertType_ConcurrentCalls_descr],
		[_EmailAlertType_Sensors, arLang.LemailAlertType_Sensors, arLang.LemailAlertType_Sensors_descr],
		[_EmailAlertType_Fraud_RCC, arLang.LemailAlertType_Fraud_RCC, arLang.LemailAlertType_Fraud_RCC_descr],
		[_EmailAlertType_Fraud_CHC, arLang.LemailAlertType_Fraud_CHC, arLang.LemailAlertType_Fraud_CHC_descr],
		[_EmailAlertType_Fraud_CHCR, arLang.LemailAlertType_Fraud_CHCR, arLang.LemailAlertType_Fraud_CHCR_descr],
		[_EmailAlertType_Fraud_D, arLang.LemailAlertType_Fraud_D, arLang.LemailAlertType_Fraud_D_descr],
		[_EmailAlertType_Fraud_SPC, arLang.LemailAlertType_Fraud_SPC, arLang.LemailAlertType_Fraud_SPC_descr],
		[_EmailAlertType_Fraud_RC, arLang.LemailAlertType_Fraud_RC, arLang.LemailAlertType_Fraud_RC_descr],
		[_EmailAlertType_Fraud_Seq, arLang.LemailAlertType_Fraud_Seq, arLang.LemailAlertType_Fraud_Seq_descr],
		[_EmailAlertType_Fraud_BilingOverQuota, arLang.LemailAlertType_Fraud_BilingOverQuota, arLang.LemailAlertType_Fraud_BilingOverQuota_descr],
		[_EmailAlertType_Fraud_BilingHighRate, arLang.LemailAlertType_Fraud_BilingHighRate, arLang.LemailAlertType_Fraud_BilingHighRate_descr]
	);
	arAlertType.push(
		[_EmailAlertType_Register_check_active, arLang.LemailAlertType_Register_check_active, arLang.LemailAlertType_Register_check_active_descr ],
		[_EmailAlertType_Register_unreg, arLang.LemailAlertType_Register_unreg, arLang.LemailAlertType_Register_unreg_desr ],
		[_EmailAlertType_Register_failed, arLang.LemailAlertType_Register_failed, arLang.LemailAlertType_Register_failed_desr ],
		[_EmailAlertType_Register_ua, arLang.LemailAlertType_Register_ua, arLang.LemailAlertType_Register_ua_desr ],
		[_EmailAlertType_Register_short, arLang.LemailAlertType_Register_short, arLang.LemailAlertType_Register_short_desr ],
		[_EmailAlertType_Register_mult, arLang.LemailAlertType_Register_mult, arLang.LemailAlertType_Register_mult_desr ],
		[_EmailAlertType_Register_expire, arLang.LemailAlertType_Register_expire, arLang.LemailAlertType_Register_expire_desr ],
		[_EmailAlertType_Register_rrd, arLang.LemailAlertType_Register_rrd, arLang.LemailAlertType_Register_rrd_desr ]
	);
	arAlertType.push(
		[_EmailAlertType_SipMsg_qualify, arLang.LemailAlertType_SipMsg_qualify, arLang.LemailAlertType_SipMsg_qualify_desr ]
	);
	arDailyReportType = [
		[_EmailDailyReportType_RTP, arLang.LemailDailyReportType_RTP],
		[_EmailDailyReportType_ProxyDegradMOS, arLang.LemailDailyReportType_ProxyDegradMOS],
		[_EmailDailyReportType_CdrSummary, arLang.LemailDailyReportType_CdrSummary],
		[_EmailDailyReportType_ConcurrentCallStat, arLang.LemailDailyReportType_ConcurrentCallStat],
		[_EmailDailyReportType_Chart, arLang.LemailDailyReportType_Chart],
		[_EmailDailyReportType_ConcurrentCallStat_license_chart, arLang.LemailDailyReportType_ConcurrentCallStat_license_chart]
	];
	arFileFormat_Image_SvgPng = [
		[_FileFormat_Image_Svg, arLang.LfileFormat_Image_Svg],
		[_FileFormat_Image_Png, arLang.LfileFormat_Image_Png]
	];
	arCdrFields_forCdrCharts = [
		[_cdrFieldsCaller, arLang.LcdrFieldsCaller],
		[_cdrFieldsCalled, arLang.LcdrFieldsCalled],
		[_cdrFieldsSipIpSrc, arLang.LcdrFieldsSipIpSrc],
		[_cdrFieldsSipIpDst, arLang.LcdrFieldsSipIpDst],
		[_cdrFieldsRtpIpSrc, arLang.LcdrFieldsRtpIpSrc],
		[_cdrFieldsRtpIpDst, arLang.LcdrFieldsRtpIpDst]
	];
	arCdrSideCharts = [
		[1, _cdrSide_Src, arLang.LcdrSideSrc],
		[2, _cdrSide_Dst, arLang.LcdrSideDst],
		[3, _cdrSide_Both, arLang.LcdrSideBoth]
	];
	arCallerCalledSide = [
		[_side_CallerNum, _side_Caller, arLang.LsideCaller],
		[_side_CalledNum, _side_Called, arLang.LsideCalled]
	];
	arType_IpOrNumber = [
		[1, 'ip', arLang.Ltype_IpOrNumber_ip],
		[2, 'number', arLang.Ltype_IpOrNumber_number]
	];
	arSipMsg_Type = [
		[_sipMsg_OPTIONS, arLang.LsipMsg_OPTIONS],
		[_sipMsg_SUBSCRIBE, arLang.LsipMsg_SUBSCRIBE],
		[_sipMsg_NOTIFY, arLang.LsipMsg_NOTIFY]
	];
	arReqRespDirection = [
		['request', arLang.LreqRespDirection_request],
		['response', arLang.LreqRespDirection_response],
		['both', arLang.LreqRespDirection_both]
	];
	arTypeFraudAlertRule = [
		[1, 'src_ip__blacklist', arLang.LtypeFraudAlertRule_src_ip__blacklist],
		[2, 'src_ip__blacklist_countries', arLang.LtypeFraudAlertRule_src_ip__blacklist_countries],
		[3, 'src_ip__blacklist_area', arLang.LtypeFraudAlertRule_src_ip__blacklist_area],
		[4, 'src_ip__change', arLang.LtypeFraudAlertRule_src_ip__change],
		[5, 'ua__blacklist', arLang.LtypeFraudAlertRule_ua__blacklist],
		[6, 'dst_num__blacklist', arLang.LtypeFraudAlertRule_dst_num__blacklist],
		[7, 'dst_num__blacklist_countries', arLang.LtypeFraudAlertRule_dst_num__blacklist_countries],
		[8, 'dst_num__blacklist_area', arLang.LtypeFraudAlertRule_dst_num__blacklist_area],
		[9, 'price__per_call', arLang.LtypeFraudAlertRule_price__per_call],
		[10, 'price__during_interval', arLang.LtypeFraudAlertRule_price__during_interval],
		[11, 'same_number', arLang.LtypeFraudAlertRule_same_number],
		[12, 'international_number_limit', arLang.LtypeFraudAlertRule_international_number_limit],
		[13, 'concurrent_calls', arLang.LtypeFraudAlertRule_concurrent_calls]
	];
	arIntervalFraudAlertRule = [
		[1, '1min', arLang.LIntervalFraudAlertRule_1min],
		[2, '5min', arLang.LIntervalFraudAlertRule_5min],
		[3, '15min', arLang.LIntervalFraudAlertRule_15min],
		[4, 'hour', arLang.LIntervalFraudAlertRule_hour],
		[5, 'day', arLang.LIntervalFraudAlertRule_day],
		[6, 'week', arLang.LIntervalFraudAlertRule_week],
		[7, 'month', arLang.LIntervalFraudAlertRule_month]
	];
	arRegisterAlertListType = [
		[0, arLang.LRegisterAlertListType_none],
		[1, arLang.LRegisterAlertListType_ip_ua]
	];
	arCdrGroupBy = [];
	arMessageGroupBy = [];
	arCdrChart_timeAxisTypes = {
		TA_SECONDS: 		{ format: 'H:i:s',	step: 1,	factor: [ 5, 10, 15, 30, 60, 120 ] },
		TA_MINUTES: 		{ format: 'd H:i',	step: 60,	factor: [ 5, 10, 15, 30, 60, 120 ] },
		TA_MINUTES_FROM_ACT: 	{ format: 'd H:i',	step: 60,	factor: [ 5, 10, 15, 30, 60, 120 ] },
		TA_5MINUTES: 		{ format: 'd H:i',	step: 60*5,	factor: [ 3, 6, 12, 24, 48 ] },
		TA_10MINUTES: 		{ format: 'd H:i',	step: 60*10,	factor: [ 3, 6, 12, 24, 48 ] },
		TA_QUARTER: 		{ format: 'd H:i',	step: 60*15,	factor: [ 2, 4, 8, 16, 32 ] },
		TA_QUARTER_FROM_ACT: 	{ format: 'd H:i',	step: 60*15,	factor: [ 2, 4, 8, 16, 32 ] },
		TA_HOURS: 		{ format: 'd H:i',	step: 60*60 },
		TA_HOURS_FROM_ACT: 	{ format: 'd H:i',	step: 60*60 },
		TA_2HOURS: 		{ format: 'd H:i',	step: 60*60*2 },
		TA_2HOURS_FROM_ACT: 	{ format: 'd H:i',	step: 60*60*2 },
		TA_DAYS: 		{ format: 'm-d',	step: 60*60*24 },
		TA_DAYS_FROM_ACT: 	{ format: 'm-d',	step: 60*60*24 },
		TA_WEEKS: 		{ format: 'm-d',	step: 60*60*24*7 },
		TA_WEEKS_FROM_SUNDAY: 	{ format: 'm-d',	step: 60*60*24*7 },
		TA_WEEKS_FROM_ACT: 	{ format: 'm-d',	step: 60*60*24*7 },
		TA_MONTHS: 		{ format: 'Y-m',	step: 60*60*24*30.5 },
		TA_MONTHS_FROM_ACT: 	{ format: 'Y-m',	step: 60*60*24*30.5 },
		TA_YEARS: 		{ format: 'Y',		step: 60*60*24*365.25 },
		TA_YEARS_FROM_ACT: 	{ format: 'Y',		step: 60*60*24*365.25 }
	};
	arTimeIntervals = [
		[ 'last_hour',		arLang.LtimeInterval_last_hour ],
		[ 'last_2h',		arLang.LtimeInterval_last_2h ],
		[ 'last_3h',		arLang.LtimeInterval_last_3h ],
		[ 'last_8h',		arLang.LtimeInterval_last_8h ],
		[ 'last_24h',		arLang.LtimeInterval_last_24h ],
		[ 'last_2d',		arLang.LtimeInterval_last_2d ],
		[ 'last_3d',		arLang.LtimeInterval_last_3d ],
		[ 'last_7d',		arLang.LtimeInterval_last_7d ],
		[ 'last_8d',		arLang.LtimeInterval_last_8d ],
		[ 'last_30d',		arLang.LtimeInterval_last_30d ],
		[ 'last_60d',		arLang.LtimeInterval_last_60d ],
		[ 'last_90d',		arLang.LtimeInterval_last_90d ],
		[ 'this_hour',		arLang.LtimeInterval_this_hour ],
		[ 'today',		arLang.LtimeInterval_today,			60*60*24 ],
		[ 'yesterday',		arLang.LtimeInterval_yesterday,			60*60*24 ],
		[ 'this_week_m',	arLang.LtimeInterval_this_week_from_monday,	60*60*24*7 ],
		[ 'this_week_s',	arLang.LtimeInterval_this_week_from_sunday,	60*60*24*7 ],
		[ 'this_month',		arLang.LtimeInterval_this_month, 		60*60*24*30.5 ],
		[ 'prev_month',		arLang.LtimeInterval_prev_month, 		60*60*24*30.5 ]
	];
	arCdrChart_chartTypes = [
		[ 'TCH_count',				arLang.LtypeChart_TCH_count ],
		[ 'TCH_cps',				arLang.LtypeChart_TCH_cps ],
		[ 'TCH_minutes',			arLang.LtypeChart_TCH_minutes ]
	];
	if(window.rtpQualityUse) arCdrChart_chartTypes.push(
		[ 'TCH_mos_intervals',			arLang.LtypeChart_TCH_mos_intervals ],
		[ 'TCH_mos',				arLang.LtypeChart_TCH_mos ],
		[ 'TCH_mos_caller_intervals',		arLang.LtypeChart_TCH_mos_caller_intervals ],
		[ 'TCH_mos_caller',			arLang.LtypeChart_TCH_mos_caller ],
		[ 'TCH_mos_called_intervals',		arLang.LtypeChart_TCH_mos_called_intervals ],
		[ 'TCH_mos_called',			arLang.LtypeChart_TCH_mos_called ]
	);
	if(existsMosXrCdr && window.rtpQualityUse) arCdrChart_chartTypes.push(
		[ 'TCH_mos_xr_avg_intervals',		arLang.LtypeChart_TCH_mos_xr_avg_intervals ],
		[ 'TCH_mos_xr_avg',			arLang.LtypeChart_TCH_mos_xr_avg ],
		[ 'TCH_mos_xr_avg_caller',		arLang.LtypeChart_TCH_mos_xr_avg_caller ],
		[ 'TCH_mos_xr_avg_called',		arLang.LtypeChart_TCH_mos_xr_avg_called ],
		[ 'TCH_mos_xr_min_intervals',		arLang.LtypeChart_TCH_mos_xr_min_intervals ],
		[ 'TCH_mos_xr_min',			arLang.LtypeChart_TCH_mos_xr_min ],
		[ 'TCH_mos_xr_min_caller',		arLang.LtypeChart_TCH_mos_xr_min_caller ],
		[ 'TCH_mos_xr_min_called',		arLang.LtypeChart_TCH_mos_xr_min_called ]
	);
	if(existsMosSilenceCdr && window.rtpQualityUse) arCdrChart_chartTypes.push(
		[ 'TCH_mos_silence_avg_intervals',	arLang.LtypeChart_TCH_mos_silence_avg_intervals ],
		[ 'TCH_mos_silence_avg',		arLang.LtypeChart_TCH_mos_silence_avg ],
		[ 'TCH_mos_silence_avg_caller',		arLang.LtypeChart_TCH_mos_silence_avg_caller ],
		[ 'TCH_mos_silence_avg_called',		arLang.LtypeChart_TCH_mos_silence_avg_called ],
		[ 'TCH_mos_silence_min_intervals',	arLang.LtypeChart_TCH_mos_silence_min_intervals ],
		[ 'TCH_mos_silence_min',		arLang.LtypeChart_TCH_mos_silence_min ],
		[ 'TCH_mos_silence_min_caller',		arLang.LtypeChart_TCH_mos_silence_min_caller ],
		[ 'TCH_mos_silence_min_called',		arLang.LtypeChart_TCH_mos_silence_min_called ]
	);
	if(existsMosLqoCdr && window.rtpQualityUse) arCdrChart_chartTypes.push(
		[ 'TCH_mos_lqo_caller',			arLang.LtypeChart_TCH_mos_lqo_caller ],
		[ 'TCH_mos_lqo_called',			arLang.LtypeChart_TCH_mos_lqo_called ]
	);
	if(window.rtpQualityUse) arCdrChart_chartTypes.push(
		[ 'TCH_packet_lost_intervals',		arLang.LtypeChart_TCH_packet_lost_intervals ],
		[ 'TCH_packet_lost_caller_intervals',	arLang.LtypeChart_TCH_packet_lost_caller_intervals ],
		[ 'TCH_packet_lost_called_intervals',	arLang.LtypeChart_TCH_packet_lost_called_intervals ],
		[ 'TCH_packet_lost',			arLang.LtypeChart_TCH_packet_lost ],
		[ 'TCH_jitter_intervals',		arLang.LtypeChart_TCH_jitter_intervals ],
		[ 'TCH_jitter',				arLang.LtypeChart_TCH_jitter ],
		[ 'TCH_delay',				arLang.LtypeChart_TCH_delay_avg ],
		[ 'TCH_rtcp_avgjitter_intervals',	arLang.LtypeChart_TCH_rtcp_avgjitter_intervals ],
		[ 'TCH_rtcp_avgjitter',			arLang.LtypeChart_TCH_rtcp_avgjitter ],
		[ 'TCH_rtcp_maxjitter_intervals',	arLang.LtypeChart_TCH_rtcp_maxjitter_intervals ],
		[ 'TCH_rtcp_maxjitter',			arLang.LtypeChart_TCH_rtcp_maxjitter ],
		[ 'TCH_rtcp_avgfr_intervals',		arLang.LtypeChart_TCH_rtcp_avgfr_intervals ],
		[ 'TCH_rtcp_avgfr',			arLang.LtypeChart_TCH_rtcp_avgfr ],
		[ 'TCH_rtcp_maxfr_intervals',		arLang.LtypeChart_TCH_rtcp_maxfr_intervals ],
		[ 'TCH_rtcp_maxfr',			arLang.LtypeChart_TCH_rtcp_maxfr ],
		[ 'TCH_rtcp_avgrtd_intervals',		arLang.LtypeChart_TCH_rtcp_avgrtd_intervals ],
		[ 'TCH_rtcp_avgrtd',			arLang.LtypeChart_TCH_rtcp_avgrtd ],
		[ 'TCH_rtcp_maxrtd_intervals',		arLang.LtypeChart_TCH_rtcp_maxrtd_intervals ],
		[ 'TCH_rtcp_maxrtd',			arLang.LtypeChart_TCH_rtcp_maxrtd ]
	);
	arCdrChart_chartTypes.push(
		[ 'TCH_acd_avg',			arLang.LtypeChart_TCH_acd_avg ],
		[ 'TCH_acd',				arLang.LtypeChart_TCH_acd ],
		[ 'TCH_asr_avg',			arLang.LtypeChart_TCH_asr_avg ],
		[ 'TCH_asr',				arLang.LtypeChart_TCH_asr ],
		[ 'TCH_ner_avg',			arLang.LtypeChart_TCH_ner_avg ],
		[ 'TCH_ner',				arLang.LtypeChart_TCH_ner ],
		[ 'TCH_pdd_intervals',			arLang.LtypeChart_TCH_pdd_intervals ],
		[ 'TCH_pdd',				arLang.LtypeChart_TCH_pdd ],
		[ 'TCH_sipResp',			arLang.LtypeChart_TCH_sipResp ],
		[ 'TCH_sipResponse',			arLang.LtypeChart_TCH_sipResponse ],
		[ 'TCH_sipResponse_base',		arLang.LtypeChart_TCH_sipResponse_base ],
		[ 'TCH_codecs',				arLang.LtypeChart_TCH_codecs ],
		[ 'TCH_IP_src',				arLang.LtypeChart_TCH_IP_src ],
		[ 'TCH_IP_dst',				arLang.LtypeChart_TCH_IP_dst ],
		[ 'TCH_domain_src',			arLang.LtypeChart_TCH_domain_src ],
		[ 'TCH_domain_dst',			arLang.LtypeChart_TCH_domain_dst ]
	);
	if(window.existsCdrSilence) arCdrChart_chartTypes.push(
		[ 'TCH_silence',			arLang.LtypeChart_TCH_silence ],
		[ 'TCH_silence_caller',			arLang.LtypeChart_TCH_silence_caller ],
		[ 'TCH_silence_called',			arLang.LtypeChart_TCH_silence_called ],
		[ 'TCH_silence_end',			arLang.LtypeChart_TCH_silence_end ],
		[ 'TCH_silence_end_caller',		arLang.LtypeChart_TCH_silence_end_caller ],
		[ 'TCH_silence_end_called',		arLang.LtypeChart_TCH_silence_end_called ]
	);
	if(window.existsCdrClipping) arCdrChart_chartTypes.push(
		[ 'TCH_clipping',			arLang.LtypeChart_TCH_clipping ],
		[ 'TCH_clipping_caller',		arLang.LtypeChart_TCH_clipping_caller ],
		[ 'TCH_clipping_called',		arLang.LtypeChart_TCH_clipping_called ]
	);
	arMessagesChart_chartTypes = [
		[ 'TCH_count',				arLang.LtypeChart_TCH_count_messages ],
		[ 'TCH_cps',				arLang.LtypeChart_TCH_cps_messages ],
		[ 'TCH_sipResp',			arLang.LtypeChart_TCH_sipResp ],
		[ 'TCH_sipResponse',			arLang.LtypeChart_TCH_sipResponse ],
		[ 'TCH_sipResponse_base',		arLang.LtypeChart_TCH_sipResponse_base ],
		[ 'TCH_IP_src',				arLang.LtypeChart_TCH_IP_src ],
		[ 'TCH_IP_dst',				arLang.LtypeChart_TCH_IP_dst ],
		[ 'TCH_domain_src',			arLang.LtypeChart_TCH_domain_src ],
		[ 'TCH_domain_dst',			arLang.LtypeChart_TCH_domain_dst ]
	];
	arSipMsgChart_chartTypes = [
		[ 'TCH_count',				arLang.LtypeChart_TCH_count_sip_msg ],
		[ 'TCH_cps',				arLang.LtypeChart_TCH_cps_sip_msg ],
		[ 'TCH_IP_src',				arLang.LtypeChart_TCH_IP_src ],
		[ 'TCH_IP_dst',				arLang.LtypeChart_TCH_IP_dst ],
		[ 'TCH_domain_src',			arLang.LtypeChart_TCH_domain_src ],
		[ 'TCH_domain_dst',			arLang.LtypeChart_TCH_domain_dst ]
	];
	arCdrChart_chartSeriesTypes = [
		[ 'TCHS_count_all',			arLang.LtypeSeries_TCHS_count,			arLang.LsubtypeSeries_TCHS_all,		'TCH_total',			's_count_all' ],
		[ 'TCHS_count_max',			arLang.LtypeSeries_TCHS_concurrent,		arLang.LsubtypeSeries_TCHS_max,		'TCH_count',			's_count_max' ],
		[ 'TCHS_count_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_count',			's_count_avg1' ],
		[ 'TCHS_count_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_count',			's_count_min1' ],
		[ 'TCHS_count_perc_short_60',		arLang.LtypeSeries_TCHS_perc_count,		arLang.LsubtypeSeries_TCHS_count_perc_short_60,
																		'TCH_count_perc_short',		's_count_perc_short', 'param', '60' ],
		[ 'TCHS_count_perc_short_20',		'',						arLang.LsubtypeSeries_TCHS_count_perc_short_20,
																		'TCH_count_perc_short',		's_count_perc_short', 'param', '20' ],
		[ 'TCHS_cps_max',			arLang.LtypeSeries_TCHS_cps,			arLang.LsubtypeSeries_TCHS_max,		'TCH_cps',			's_cps_max' ],
		[ 'TCHS_cps_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_cps',			's_cps_avg1' ],
		[ 'TCHS_cps_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_cps',			's_cps_min1' ],
		[ 'TCHS_minutes_all',			arLang.LtypeSeries_TCHS_minutes,		arLang.LsubtypeSeries_TCHS_all,		'TCH_minutes',			's_minutes_all' ]//,
		//[ 'TCHS_minutes_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_minutes',			's_minutes_max' ],
		//[ 'TCHS_minutes_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_minutes',			's_minutes_avg' ],
		//[ 'TCHS_minutes_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_minutes',			's_minutes_min' ]
	];
	if(window.rtpQualityUse) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_mos_intervals',			arLang.LtypeSeries_TCHS_mos,			arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos',			'sm_mos_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos',			'mos_max' ],
		[ 'TCHS_mos_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos',			'mos_avg' ],
		[ 'TCHS_mos_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos',			'mos_min' ],
		[ 'TCHS_mos_perc95',			'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos',			'mos_perc95' ],
		[ 'TCHS_mos_perc99',			'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos',			'mos_perc99' ],
		[ 'TCHS_mos_caller_intervals',		arLang.LtypeSeries_TCHS_mos_caller,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_caller',		'sm_mos_caller_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_caller_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_caller',		'mos_caller_max' ],
		[ 'TCHS_mos_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_caller',		'mos_caller_avg' ],
		[ 'TCHS_mos_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_caller',		'mos_caller_min' ],
		[ 'TCHS_mos_caller_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_caller',		'mos_caller_perc95' ],
		[ 'TCHS_mos_caller_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_caller',		'mos_caller_perc99' ],
		[ 'TCHS_mos_called_intervals',		arLang.LtypeSeries_TCHS_mos_called,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_called',		'sm_mos_called_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_called_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_called',		'mos_called_max' ],
		[ 'TCHS_mos_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_called',		'mos_called_avg' ],
		[ 'TCHS_mos_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_called',		'mos_called_min' ],
		[ 'TCHS_mos_called_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_called',		'mos_called_perc95' ],
		[ 'TCHS_mos_called_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_called',		'mos_called_perc99' ]
	);
	if(existsMosXrCdr && window.rtpQualityUse) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_mos_xr_avg_intervals',		arLang.LtypeSeries_TCHS_mos_xr_avg,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_xr_avg',		'sm_mos_xr_avg_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_xr_avg_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_avg',		'mos_xr_avg_max' ],
		[ 'TCHS_mos_xr_avg_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_avg',		'mos_xr_avg_avg' ],
		[ 'TCHS_mos_xr_avg_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_avg',		'mos_xr_avg_min' ],
		[ 'TCHS_mos_xr_avg_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_avg',		'mos_xr_avg_perc95' ],
		[ 'TCHS_mos_xr_avg_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_avg',		'mos_xr_avg_perc99' ],
		[ 'TCHS_mos_xr_avg_caller_max',		arLang.LtypeSeries_TCHS_mos_xr_avg_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_avg_caller',	'mos_xr_avg_caller_max' ],
		[ 'TCHS_mos_xr_avg_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_avg_caller',	'mos_xr_avg_caller_avg' ],
		[ 'TCHS_mos_xr_avg_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_avg_caller',	'mos_xr_avg_caller_min' ],
		[ 'TCHS_mos_xr_avg_caller_perc95', 	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_avg_caller',	'mos_xr_avg_caller_perc95' ],
		[ 'TCHS_mos_xr_avg_caller_perc99', 	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_avg_caller',	'mos_xr_avg_caller_perc99' ],
		[ 'TCHS_mos_xr_avg_called_max',		arLang.LtypeSeries_TCHS_mos_xr_avg_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_avg_called',	'mos_xr_avg_called_max' ],
		[ 'TCHS_mos_xr_avg_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_avg_called',	'mos_xr_avg_called_avg' ],
		[ 'TCHS_mos_xr_avg_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_avg_called',	'mos_xr_avg_called_min' ],
		[ 'TCHS_mos_xr_avg_called_perc95', 	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_avg_called',	'mos_xr_avg_called_perc95' ],
		[ 'TCHS_mos_xr_avg_called_perc99', 	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_avg_called',	'mos_xr_avg_called_perc99' ],
		[ 'TCHS_mos_xr_min_intervals',		arLang.LtypeSeries_TCHS_mos_xr_min,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_xr_min',		'sm_mos_xr_min_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_xr_min_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_min',		'mos_xr_min_max' ],
		[ 'TCHS_mos_xr_min_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_min',		'mos_xr_min_avg' ],
		[ 'TCHS_mos_xr_min_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_min',		'mos_xr_min_min' ],
		[ 'TCHS_mos_xr_min_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_min',		'mos_xr_min_perc95' ],
		[ 'TCHS_mos_xr_min_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_min',		'mos_xr_min_perc99' ],
		[ 'TCHS_mos_xr_min_caller_max',		arLang.LtypeSeries_TCHS_mos_xr_min_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_min_caller',	'mos_xr_min_caller_max' ],
		[ 'TCHS_mos_xr_min_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_min_caller',	'mos_xr_min_caller_avg' ],
		[ 'TCHS_mos_xr_min_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_min_caller',	'mos_xr_min_caller_min' ],
		[ 'TCHS_mos_xr_min_caller_perc95', 	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_min_caller',	'mos_xr_min_caller_perc95' ],
		[ 'TCHS_mos_xr_min_caller_perc99', 	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_min_caller',	'mos_xr_min_caller_perc99' ],
		[ 'TCHS_mos_xr_min_called_max',		arLang.LtypeSeries_TCHS_mos_xr_min_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_xr_min_called',	'mos_xr_min_called_max' ],
		[ 'TCHS_mos_xr_min_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_xr_min_called',	'mos_xr_min_called_avg' ],
		[ 'TCHS_mos_xr_min_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_xr_min_called',	'mos_xr_min_called_min' ],
		[ 'TCHS_mos_xr_min_called_perc95', 	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_xr_min_called',	'mos_xr_min_called_perc95' ],
		[ 'TCHS_mos_xr_min_called_perc99', 	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_xr_min_called',	'mos_xr_min_called_perc99' ]
	);
	if(existsMosSilenceCdr && window.rtpQualityUse) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_mos_silence_avg_intervals',	arLang.LtypeSeries_TCHS_mos_silence_avg,	arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_silence_avg',		'sm_mos_silence_avg_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_silence_avg_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_avg',		'mos_silence_avg_max' ],
		[ 'TCHS_mos_silence_avg_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_avg',		'mos_silence_avg_avg' ],
		[ 'TCHS_mos_silence_avg_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_avg',		'mos_silence_avg_min' ],
		[ 'TCHS_mos_silence_avg_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_avg',		'mos_silence_avg_perc95' ],
		[ 'TCHS_mos_silence_avg_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_avg',		'mos_silence_avg_perc99' ],
		[ 'TCHS_mos_silence_avg_caller_max',	arLang.LtypeSeries_TCHS_mos_silence_avg_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_avg_caller',	'mos_silence_avg_caller_max' ],
		[ 'TCHS_mos_silence_avg_caller_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_avg_caller',	'mos_silence_avg_caller_avg' ],
		[ 'TCHS_mos_silence_avg_caller_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_avg_caller',	'mos_silence_avg_caller_min' ],
		[ 'TCHS_mos_silence_avg_caller_perc95', '',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_avg_caller',	'mos_silence_avg_caller_perc95' ],
		[ 'TCHS_mos_silence_avg_caller_perc99', '',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_avg_caller',	'mos_silence_avg_caller_perc99' ],
		[ 'TCHS_mos_silence_avg_called_max',	arLang.LtypeSeries_TCHS_mos_silence_avg_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_avg_called',	'mos_silence_avg_called_max' ],
		[ 'TCHS_mos_silence_avg_called_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_avg_called',	'mos_silence_avg_called_avg' ],
		[ 'TCHS_mos_silence_avg_called_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_avg_called',	'mos_silence_avg_called_min' ],
		[ 'TCHS_mos_silence_avg_called_perc95', '',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_avg_called',	'mos_silence_avg_called_perc95' ],
		[ 'TCHS_mos_silence_avg_called_perc99', '',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_avg_called',	'mos_silence_avg_called_perc99' ],
		[ 'TCHS_mos_silence_min_intervals',	arLang.LtypeSeries_TCHS_mos_silence_min,	arLang.LsubtypeSeries_TCHS_intervals,	'TCH_mos_silence_min',		'sm_mos_silence_min_intervals', 'multiSeries', null,
		  [ [ 3.1, '#AD1616' ],
		    [ 3.6, '#CA5400' ],
		    [ 4.0, '#AD8A00' ],
		    [ 4.3, '#7B8A00' ],
		    [ null, '#0D8A00' ] ]
		],
		[ 'TCHS_mos_silence_min_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_min',		'mos_silence_min_max' ],
		[ 'TCHS_mos_silence_min_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_min',		'mos_silence_min_avg' ],
		[ 'TCHS_mos_silence_min_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_min',		'mos_silence_min_min' ],
		[ 'TCHS_mos_silence_min_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_min',		'mos_silence_min_perc95' ],
		[ 'TCHS_mos_silence_min_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_min',		'mos_silence_min_perc99' ],
		[ 'TCHS_mos_silence_min_caller_max',	arLang.LtypeSeries_TCHS_mos_silence_min_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_min_caller',	'mos_silence_min_caller_max' ],
		[ 'TCHS_mos_silence_min_caller_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_min_caller',	'mos_silence_min_caller_avg' ],
		[ 'TCHS_mos_silence_min_caller_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_min_caller',	'mos_silence_min_caller_min' ],
		[ 'TCHS_mos_silence_min_caller_perc95', '',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_min_caller',	'mos_silence_min_caller_perc95' ],
		[ 'TCHS_mos_silence_min_caller_perc99', '',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_min_caller',	'mos_silence_min_caller_perc99' ],
		[ 'TCHS_mos_silence_min_called_max',	arLang.LtypeSeries_TCHS_mos_silence_min_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_silence_min_called',	'mos_silence_min_called_max' ],
		[ 'TCHS_mos_silence_min_called_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_silence_min_called',	'mos_silence_min_called_avg' ],
		[ 'TCHS_mos_silence_min_called_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_silence_min_called',	'mos_silence_min_called_min' ],
		[ 'TCHS_mos_silence_min_called_perc95', '',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_silence_min_called',	'mos_silence_min_called_perc95' ],
		[ 'TCHS_mos_silence_min_called_perc99', '',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_silence_min_called',	'mos_silence_min_called_perc99' ]
	);
	if(existsMosLqoCdr && window.rtpQualityUse) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_mos_lqo_caller_max',		arLang.LtypeSeries_TCHS_mos_lqo_caller,		arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_lqo_caller',		'mos_lqo_caller_max' ],
		[ 'TCHS_mos_lqo_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_lqo_caller',		'mos_lqo_caller_avg' ],
		[ 'TCHS_mos_lqo_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_lqo_caller',		'mos_lqo_caller_min' ],
		[ 'TCHS_mos_lqo_caller_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_lqo_caller',		'mos_lqo_caller_perc95' ],
		[ 'TCHS_mos_lqo_caller_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_lqo_caller',		'mos_lqo_caller_perc99' ],
		[ 'TCHS_mos_lqo_called_max',		arLang.LtypeSeries_TCHS_mos_lqo_called,		arLang.LsubtypeSeries_TCHS_max,		'TCH_mos_lqo_called',		'mos_lqo_called_max' ],
		[ 'TCHS_mos_lqo_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_mos_lqo_called',		'mos_lqo_called_avg' ],
		[ 'TCHS_mos_lqo_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_mos_lqo_called',		'mos_lqo_called_min' ],
		[ 'TCHS_mos_lqo_called_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_mos_lqo_called',		'mos_lqo_called_perc95' ],
		[ 'TCHS_mos_lqo_called_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_mos_lqo_called',		'mos_lqo_called_perc99' ]
	)
	if(window.rtpQualityUse) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_packet_lost_intervals',		arLang.LtypeSeries_TCHS_packet_lost,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_packet_lost',		'sm_packet_lost_intervals', 'multiSeries', null,
		  [ [ 0.1,	'#00C000' ], // zelana
		    [ 0.5,	'#7DC000' ], // zelana + malinko zluta
		    [ 1,	'#AAC000' ], // zelana + vice zlute
		    [ 2,	'#E9E600' ], // zluta
		    [ 5,	'#E9B300' ], // oranzova
		    [ 10,	'#E98400' ], // oranzovo cervena
		    [ 20,	'#E95601' ], // vice cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_packet_lost_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_packet_lost',		'packet_lost_max' ],
		[ 'TCHS_packet_lost_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_packet_lost',		'packet_lost_avg' ],
		[ 'TCHS_packet_lost_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_packet_lost',		'packet_lost_min' ],
		[ 'TCHS_packet_lost_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_packet_lost',		'packet_lost_perc95' ],
		[ 'TCHS_packet_lost_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_packet_lost',		'packet_lost_perc99' ],
		[ 'TCHS_packet_lost_caller_intervals',	arLang.LtypeSeries_TCHS_packet_lost_caller,	arLang.LsubtypeSeries_TCHS_intervals,	'TCH_packet_lost_caller',	'sm_packet_lost_intervals', 'multiSeries', null,
		  [ [ 0.1,	'#00C000' ], // zelana
		    [ 0.5,	'#7DC000' ], // zelana + malinko zluta
		    [ 1,	'#AAC000' ], // zelana + vice zlute
		    [ 2,	'#E9E600' ], // zluta
		    [ 5,	'#E9B300' ], // oranzova
		    [ 10,	'#E98400' ], // oranzovo cervena
		    [ 20,	'#E95601' ], // vice cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_packet_lost_called_intervals',	arLang.LtypeSeries_TCHS_packet_lost_called,	arLang.LsubtypeSeries_TCHS_intervals,	'TCH_packet_lost_called',	'sm_packet_lost_intervals', 'multiSeries', null,
		  [ [ 0.1,	'#00C000' ], // zelana
		    [ 0.5,	'#7DC000' ], // zelana + malinko zluta
		    [ 1,	'#AAC000' ], // zelana + vice zlute
		    [ 2,	'#E9E600' ], // zluta
		    [ 5,	'#E9B300' ], // oranzova
		    [ 10,	'#E98400' ], // oranzovo cervena
		    [ 20,	'#E95601' ], // vice cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_jitter_intervals',		arLang.LtypeSeries_TCHS_jitter,			arLang.LsubtypeSeries_TCHS_intervals,	'TCH_jitter',			'sm_jitter_intervals', 'multiSeries', null,
		  [ [ 20,	'#00C000' ], // zelana
		    [ 50,	'#AAC000' ], // zelano-oranzova
		    [ 100,	'#E9B300' ], // oranzova
		    [ 200,	'#E98400' ], // oranzovo cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_jitter_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_jitter',			'jitter_max' ],
		[ 'TCHS_jitter_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_jitter',			'jitter_avg' ],
		[ 'TCHS_jitter_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_jitter',			'jitter_min' ],
		[ 'TCHS_jitter_perc95',			'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_jitter',			'jitter_perc95' ],
		[ 'TCHS_jitter_perc99',			'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_jitter',			'jitter_perc99' ],
		[ 'TCHS_delay_max',			arLang.LtypeSeries_TCHS_delay_avg,		arLang.LsubtypeSeries_TCHS_max,		'TCH_delay',			'delay_max' ],
		[ 'TCHS_delay_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_delay',			'delay_avg' ],
		[ 'TCHS_delay_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_delay',			'delay_min' ],
		[ 'TCHS_delay_perc95',			'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_delay',			'delay_perc95' ],
		[ 'TCHS_delay_perc99',			'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_delay',			'delay_perc99' ],
		[ 'TCHS_rtcp_avgjitter_intervals',	arLang.LtypeSeries_TCHS_rtcp_avgjitter,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_avgjitter',		'sm_rtcp_avgjitter_intervals', 'multiSeries', null,
		  [ [ 20,	'#00C000' ], // zelana
		    [ 50,	'#AAC000' ], // zelano-oranzova
		    [ 100,	'#E9B300' ], // oranzova
		    [ 200,	'#E98400' ], // oranzovo cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_rtcp_avgjitter_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_avgjitter',		'rtcp_avgjitter_max' ],
		[ 'TCHS_rtcp_avgjitter_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_avgjitter',		'rtcp_avgjitter_avg' ],
		[ 'TCHS_rtcp_avgjitter_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_avgjitter',		'rtcp_avgjitter_min' ],
		[ 'TCHS_rtcp_avgjitter_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_avgjitter',		'rtcp_avgjitter_perc95' ],
		[ 'TCHS_rtcp_avgjitter_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_avgjitter',		'rtcp_avgjitter_perc99' ],
		[ 'TCHS_rtcp_maxjitter_intervals',	arLang.LtypeSeries_TCHS_rtcp_maxjitter,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_maxjitter',		'sm_rtcp_maxjitter_intervals', 'multiSeries', null,
		  [ [ 20,	'#00C000' ], // zelana
		    [ 50,	'#AAC000' ], // zelano-oranzova
		    [ 100,	'#E9B300' ], // oranzova
		    [ 200,	'#E98400' ], // oranzovo cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_rtcp_maxjitter_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_maxjitter',		'rtcp_maxjitter_max' ],
		[ 'TCHS_rtcp_maxjitter_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_maxjitter',		'rtcp_maxjitter_avg' ],
		[ 'TCHS_rtcp_maxjitter_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_maxjitter',		'rtcp_maxjitter_min' ],
		[ 'TCHS_rtcp_maxjitter_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_maxjitter',		'rtcp_maxjitter_perc95' ],
		[ 'TCHS_rtcp_maxjitter_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_maxjitter',		'rtcp_maxjitter_perc99' ],
		[ 'TCHS_rtcp_avgfr_intervals',		arLang.LtypeSeries_TCHS_rtcp_avgfr,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_avgfr',		'sm_rtcp_avgfr_intervals', 'multiSeries', null,
		  [ [ 0.1,	'#00C000' ],
		    [ 0.5,	'#7DC000' ],
		    [ 1,	'#AAC000' ],
		    [ 2,	'#E9E600' ],
		    [ 5,	'#E9B300' ],
		    [ 10,	'#E98400' ],
		    [ 20,	'#E95601' ],
		    [ null,	'#E90000' ] ]
		],
		[ 'TCHS_rtcp_avgfr_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_avgfr',		'rtcp_avgfr_max' ],
		[ 'TCHS_rtcp_avgfr_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_avgfr',		'rtcp_avgfr_avg' ],
		[ 'TCHS_rtcp_avgfr_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_avgfr',		'rtcp_avgfr_min' ],
		[ 'TCHS_rtcp_avgfr_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_avgfr',		'rtcp_avgfr_perc95' ],
		[ 'TCHS_rtcp_avgfr_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_avgfr',		'rtcp_avgfr_perc99' ],
		[ 'TCHS_rtcp_maxfr_intervals',		arLang.LtypeSeries_TCHS_rtcp_maxfr,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_maxfr',		'sm_rtcp_maxfr_intervals', 'multiSeries', null,
		  [ [ 0.1,	'#00C000' ],
		    [ 0.5,	'#7DC000' ],
		    [ 1,	'#AAC000' ],
		    [ 2,	'#E9E600' ],
		    [ 5,	'#E9B300' ],
		    [ 10,	'#E98400' ],
		    [ 20,	'#E95601' ],
		    [ null,	'#E90000' ] ]
		],
		[ 'TCHS_rtcp_maxfr_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_maxfr',		'rtcp_maxfr_max' ],
		[ 'TCHS_rtcp_maxfr_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_maxfr',		'rtcp_maxfr_avg' ],
		[ 'TCHS_rtcp_maxfr_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_maxfr',		'rtcp_maxfr_min' ],
		[ 'TCHS_rtcp_maxfr_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_maxfr',		'rtcp_maxfr_perc95' ],
		[ 'TCHS_rtcp_maxfr_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_maxfr',		'rtcp_maxfr_perc99' ],
		[ 'TCHS_rtcp_avgrtd_intervals',		arLang.LtypeSeries_TCHS_rtcp_avgrtd,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_avgrtd',		'sm_rtcp_avgrtd_intervals', 'multiSeries', null,
		  [ [ 1,	'#AAC000' ],
		    [ 2,	'#E9E600' ],
		    [ 5,	'#E9B300' ],
		    [ 10,	'#E98400' ],
		    [ 20,	'#E95601' ],
		    [ null,	'#E90000' ] ]
		],
		[ 'TCHS_rtcp_avgrtd_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_avgrtd',		'rtcp_avgrtd_max' ],
		[ 'TCHS_rtcp_avgrtd_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_avgrtd',		'rtcp_avgrtd_avg' ],
		[ 'TCHS_rtcp_avgrtd_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_avgrtd',		'rtcp_avgrtd_min' ],
		[ 'TCHS_rtcp_avgrtd_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_avgrtd',		'rtcp_avgrtd_perc95' ],
		[ 'TCHS_rtcp_avgrtd_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_avgrtd',		'rtcp_avgrtd_perc99' ],
		[ 'TCHS_rtcp_maxrtd_intervals',		arLang.LtypeSeries_TCHS_rtcp_maxrtd,		arLang.LsubtypeSeries_TCHS_intervals,	'TCH_rtcp_maxrtd',		'sm_rtcp_maxrtd_intervals', 'multiSeries', null,
		  [ [ 1,	'#AAC000' ],
		    [ 2,	'#E9E600' ],
		    [ 5,	'#E9B300' ],
		    [ 10,	'#E98400' ],
		    [ 20,	'#E95601' ],
		    [ null,	'#E90000' ] ]
		],
		[ 'TCHS_rtcp_maxrtd_max',		'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_rtcp_maxrtd',		'rtcp_maxrtd_max' ],
		[ 'TCHS_rtcp_maxrtd_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_rtcp_maxrtd',		'rtcp_maxrtd_avg' ],
		[ 'TCHS_rtcp_maxrtd_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_rtcp_maxrtd',		'rtcp_maxrtd_min' ],
		[ 'TCHS_rtcp_maxrtd_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_rtcp_maxrtd',		'rtcp_maxrtd_perc95' ],
		[ 'TCHS_rtcp_maxrtd_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_rtcp_maxrtd',		'rtcp_maxrtd_perc99' ]
	);
	arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_acd_avg',			arLang.LtypeSeries_TCHS_acd_avg,		'',					'TCH_acd_avg',			'acd_avg' ],
		[ 'TCHS_acd',				arLang.LtypeSeries_TCHS_acd,			'',					'TCH_acd',			'acd' ],
		[ 'TCHS_asr_avg',			arLang.LtypeSeries_TCHS_asr_avg,		'',					'TCH_asr_avg',			'asr_avg' ],
		[ 'TCHS_asr',				arLang.LtypeSeries_TCHS_asr,			'',					'TCH_asr',			'asr' ],
		[ 'TCHS_ner_avg',			arLang.LtypeSeries_TCHS_ner_avg,		'',					'TCH_ner_avg',			'ner_avg' ],
		[ 'TCHS_ner',				arLang.LtypeSeries_TCHS_ner,			'',					'TCH_ner',			'ner' ],
		[ 'TCHS_pdd_intervals',			arLang.LtypeSeries_TCHS_pdd,			arLang.LsubtypeSeries_TCHS_intervals,	'TCH_pdd',			'sm_pdd_intervals', 'multiSeries', null,
		  [ [ 1,	'#00C000' ], // zelana
		    [ 5,	'#AAC000' ], // zelano-oranzova
		    [ 10,	'#E9B300' ], // oranzova
		    [ 20,	'#E98400' ], // oranzovo cervena
		    [ null,	'#E90000' ] ] // cervena
		],
		[ 'TCHS_pdd_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_pdd',			'pdd_max' ],
		[ 'TCHS_pdd_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_pdd',			'pdd_avg' ],
		[ 'TCHS_pdd_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_pdd',			'pdd_min' ],
		[ 'TCHS_pdd_perc95',			'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_pdd',			'pdd_perc95' ],
		[ 'TCHS_pdd_perc99',			'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_pdd',			'pdd_perc99' ],
		[ 'TCHS_sipResp',			arLang.LtypeSeries_TCHS_sipResp,		'XXX',					'TCH_sipResp',			'lastSIPresponse', 'param' ],
		[ 'TCHS_sipResp_2XX',			'',						'2XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '2XX' ],
		[ 'TCHS_sipResp_3XX',			'',						'3XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '3XX' ],
		[ 'TCHS_sipResp_4XX',			'',						'4XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '4XX' ],
		[ 'TCHS_sipResp_5XX',			'',						'5XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '5XX' ],
		[ 'TCHS_sipResp_6XX',			'',						'6XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '6XX' ],
		[ 'TCHS_sipResponse',			arLang.LtypeSeries_TCHS_sipResponse,		'',					'TCH_sipResponse',		'sm_lastSIPresponse', 'multiSeries' ],
		[ 'TCHS_sipResponse_base',		arLang.LtypeSeries_TCHS_sipResponse_base,	'',					'TCH_sipResponse_base',		'sm_lastSIPresponse_base', 'multiSeries', null,
		  [ [ '0XX/not response',	'#AAAAAA' ], // světle šedá
		    [ '1XX/1xx',		'#888888' ], // šedá
		    [ '2XX/2xx',		'#00AA00' ], // zelená
		    [ '3XX/3xx',		'#EA9C00' ], // oranžová
		    [ '4XX/4xx',		'#0055FF' ], // modrá
		    [ '5XX/5xx',		'#FF4C11' ], // světle červená
		    [ '6XX/6xx',		'#CC0000' ] ] // sytě červená
		],
		[ 'TCHS_codecs',			arLang.LtypeSeries_TCHS_codecs,			'',					'TCH_codecs',			'sm_payload', 'multiSeries' ],
		[ 'TCHS_IP_src',			arLang.LtypeSeries_TCHS_IP_src,			'',					'TCH_IP_src',			'sm_ip_src', 'multiSeries' ],
		[ 'TCHS_IP_dst',			arLang.LtypeSeries_TCHS_IP_dst,			'',					'TCH_IP_dst',			'sm_ip_dst', 'multiSeries' ],
		[ 'TCHS_domain_src',			arLang.LtypeSeries_TCHS_domain_src,		'',					'TCH_domain_src',		'sm_domain_src', 'multiSeries' ],
		[ 'TCHS_domain_dst',			arLang.LtypeSeries_TCHS_domain_dst,		'',					'TCH_domain_dst',		'sm_domain_dst', 'multiSeries' ]
	);
	if(window.existsCdrSilence) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_silence_max',			arLang.LtypeSeries_TCHS_silence,		arLang.LsubtypeSeries_TCHS_max,		'TCH_silence',			'silence_max' ],
		[ 'TCHS_silence_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence',			'silence_avg' ],
		[ 'TCHS_silence_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence',			'silence_min' ],
		[ 'TCHS_silence_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence',			'silence_perc95' ],
		[ 'TCHS_silence_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence',			'silence_perc99' ],
		[ 'TCHS_silence_caller_max',		arLang.LtypeSeries_TCHS_silence_caller,		arLang.LsubtypeSeries_TCHS_max,		'TCH_silence_caller',		'silence_caller_max' ],
		[ 'TCHS_silence_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence_caller',		'silence_caller_avg' ],
		[ 'TCHS_silence_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence_caller',		'silence_caller_min' ],
		[ 'TCHS_silence_caller_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence_caller',		'silence_caller_perc95' ],
		[ 'TCHS_silence_caller_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence_caller',		'silence_caller_perc99' ],
		[ 'TCHS_silence_called_max',		arLang.LtypeSeries_TCHS_silence_called,		arLang.LsubtypeSeries_TCHS_max,		'TCH_silence_called',		'silence_called_max' ],
		[ 'TCHS_silence_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence_called',		'silence_called_avg' ],
		[ 'TCHS_silence_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence_called',		'silence_called_min' ],
		[ 'TCHS_silence_called_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence_called',		'silence_called_perc95' ],
		[ 'TCHS_silence_called_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence_called',		'silence_called_perc99' ],
		[ 'TCHS_silence_end_max',		arLang.LtypeSeries_TCHS_silence_end,		arLang.LsubtypeSeries_TCHS_max,		'TCH_silence_end',		'silence_end_max' ],
		[ 'TCHS_silence_end_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence_end',		'silence_end_avg' ],
		[ 'TCHS_silence_end_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence_end',		'silence_end_min' ],
		[ 'TCHS_silence_end_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence_end',		'silence_end_perc95' ],
		[ 'TCHS_silence_end_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence_end',		'silence_end_perc99' ],
		[ 'TCHS_silence_end_caller_max',	arLang.LtypeSeries_TCHS_silence_end_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_silence_end_caller',	'silence_end_caller_max' ],
		[ 'TCHS_silence_end_caller_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence_end_caller',	'silence_end_caller_avg' ],
		[ 'TCHS_silence_end_caller_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence_end_caller',	'silence_end_caller_min' ],
		[ 'TCHS_silence_end_caller_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence_end_caller',	'silence_end_caller_perc95' ],
		[ 'TCHS_silence_end_caller_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence_end_caller',	'silence_end_caller_perc99' ],
		[ 'TCHS_silence_end_called_max',	arLang.LtypeSeries_TCHS_silence_end_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_silence_end_called',	'silence_end_called_max' ],
		[ 'TCHS_silence_end_called_avg',	'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_silence_end_called',	'silence_end_called_avg' ],
		[ 'TCHS_silence_end_called_min',	'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_silence_end_called',	'silence_end_called_min' ],
		[ 'TCHS_silence_end_called_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_silence_end_called',	'silence_end_called_perc95' ],
		[ 'TCHS_silence_end_called_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_silence_end_called',	'silence_end_called_perc99' ]
	);
	if(window.existsCdrClipping) arCdrChart_chartSeriesTypes.push(
		[ 'TCHS_clipping_max',			arLang.LtypeSeries_TCHS_clipping,		arLang.LsubtypeSeries_TCHS_max,		'TCH_clipping',			'clipping_max' ],
		[ 'TCHS_clipping_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_clipping',			'clipping_avg' ],
		[ 'TCHS_clipping_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_clipping',			'clipping_min' ],
		[ 'TCHS_clipping_perc95',		'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_clipping',			'clipping_perc95' ],
		[ 'TCHS_clipping_perc99',		'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_clipping',			'clipping_perc99' ],
		[ 'TCHS_clipping_caller_max',		arLang.LtypeSeries_TCHS_clipping_caller,	arLang.LsubtypeSeries_TCHS_max,		'TCH_clipping_caller',		'clipping_caller_max' ],
		[ 'TCHS_clipping_caller_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_clipping_caller',		'clipping_caller_avg' ],
		[ 'TCHS_clipping_caller_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_clipping_caller',		'clipping_caller_min' ],
		[ 'TCHS_clipping_caller_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_clipping_caller',		'clipping_caller_perc95' ],
		[ 'TCHS_clipping_caller_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_clipping_caller',		'clipping_caller_perc99' ],
		[ 'TCHS_clipping_called_max',		arLang.LtypeSeries_TCHS_clipping_called,	arLang.LsubtypeSeries_TCHS_max,		'TCH_clipping_called',		'clipping_called_max' ],
		[ 'TCHS_clipping_called_avg',		'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_clipping_called',		'clipping_called_avg' ],
		[ 'TCHS_clipping_called_min',		'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_clipping_called',		'clipping_called_min' ],
		[ 'TCHS_clipping_called_perc95',	'',						arLang.LsubtypeSeries_TCHS_perc95,	'TCH_clipping_called',		'clipping_called_perc95' ],
		[ 'TCHS_clipping_called_perc99',	'',						arLang.LsubtypeSeries_TCHS_perc99,	'TCH_clipping_called',		'clipping_called_perc99' ]
	);
	arMessagesChart_chartSeriesTypes = [
		[ 'TCHS_count_all',			arLang.LtypeSeries_TCHS_count_messages,		arLang.LsubtypeSeries_TCHS_all,		'TCH_count',			's_count_all' ],
		[ 'TCHS_count_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_count',			's_count_max' ],
		[ 'TCHS_count_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_count',			's_count_avg1' ],
		[ 'TCHS_count_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_count',			's_count_min1' ],
		[ 'TCHS_cps_max',			arLang.LtypeSeries_TCHS_cps_messages,		arLang.LsubtypeSeries_TCHS_max,		'TCH_cps',			's_cps_max' ],
		[ 'TCHS_cps_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_cps',			's_cps_avg1' ],
		[ 'TCHS_cps_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_cps',			's_cps_min1' ],
		[ 'TCHS_sipResp',			arLang.LtypeSeries_TCHS_sipResp,		'XXX',					'TCH_sipResp',			'lastSIPresponse', 'param' ],
		[ 'TCHS_sipResp_2XX',			'',						'2XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '2XX' ],
		[ 'TCHS_sipResp_3XX',			'',						'3XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '3XX' ],
		[ 'TCHS_sipResp_4XX',			'',						'4XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '4XX' ],
		[ 'TCHS_sipResp_5XX',			'',						'5XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '5XX' ],
		[ 'TCHS_sipResp_6XX',			'',						'6XX',					'TCH_sipResp',			'lastSIPresponse', 'param', '6XX' ],
		[ 'TCHS_sipResponse',			arLang.LtypeSeries_TCHS_sipResponse,		'',					'TCH_sipResponse',		'sm_lastSIPresponse', 'multiSeries' ],
		[ 'TCHS_sipResponse_base',		arLang.LtypeSeries_TCHS_sipResponse_base,	'',					'TCH_sipResponse_base',		'sm_lastSIPresponse_base', 'multiSeries', null,
		  [ [ '0/not response',	'#AAAAAA' ], // světle šedá
		    [ '1xx',		'#888888' ], // šedá
		    [ '2xx',		'#00AA00' ], // zelená
		    [ '3xx',		'#FFAA00' ], // oranžová
		    [ '4xx',		'#0055FF' ], // modrá
		    [ '5xx',		'#FF4C11' ], // světle červená
		    [ '6xx',		'#CC0000' ] ] // sytě červená
		],
		[ 'TCHS_IP_src',			arLang.LtypeSeries_TCHS_IP_src,			'',					'TCH_IP_src',			'sm_ip_src', 'multiSeries' ],
		[ 'TCHS_IP_dst',			arLang.LtypeSeries_TCHS_IP_dst,			'',					'TCH_IP_dst',			'sm_ip_dst', 'multiSeries' ],
		[ 'TCHS_domain_src',			arLang.LtypeSeries_TCHS_domain_src,		'',					'TCH_domain_src',		'sm_domain_src', 'multiSeries' ],
		[ 'TCHS_domain_dst',			arLang.LtypeSeries_TCHS_domain_dst,		'',					'TCH_domain_dst',		'sm_domain_dst', 'multiSeries' ]
	];
	arSipMsgChart_chartSeriesTypes = [
		[ 'TCHS_count_all',			arLang.LtypeSeries_TCHS_count_sip_msg,		arLang.LsubtypeSeries_TCHS_all,		'TCH_count',			's_count_all' ],
		[ 'TCHS_count_max',			'',						arLang.LsubtypeSeries_TCHS_max,		'TCH_count',			's_count_max' ],
		[ 'TCHS_count_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_count',			's_count_avg1' ],
		[ 'TCHS_count_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_count',			's_count_min1' ],
		[ 'TCHS_cps_max',			arLang.LtypeSeries_TCHS_cps_sip_msg,		arLang.LsubtypeSeries_TCHS_max,		'TCH_cps',			's_cps_max' ],
		[ 'TCHS_cps_avg',			'',						arLang.LsubtypeSeries_TCHS_avg,		'TCH_cps',			's_cps_avg1' ],
		[ 'TCHS_cps_min',			'',						arLang.LsubtypeSeries_TCHS_min,		'TCH_cps',			's_cps_min1' ],
		[ 'TCHS_IP_src',			arLang.LtypeSeries_TCHS_IP_src,			'',					'TCH_IP_src',			'sm_ip_src', 'multiSeries' ],
		[ 'TCHS_IP_dst',			arLang.LtypeSeries_TCHS_IP_dst,			'',					'TCH_IP_dst',			'sm_ip_dst', 'multiSeries' ],
		[ 'TCHS_domain_src',			arLang.LtypeSeries_TCHS_domain_src,		'',					'TCH_domain_src',		'sm_domain_src', 'multiSeries' ],
		[ 'TCHS_domain_dst',			arLang.LtypeSeries_TCHS_domain_dst,		'',					'TCH_domain_dst',		'sm_domain_dst', 'multiSeries' ]
	];
	arCdrChart_chartSeriesData = [
		[ 'TCHS_count_all',			{ unit: 'count' } ],
		[ 'TCHS_count_max',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_avg',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_min',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_perc_short_60',		{ unit: 'perc' } ],
		[ 'TCHS_count_perc_short_20',		{ unit: 'perc' } ],
		[ 'TCHS_cps_max',			{ unit: 'cps' } ],
		[ 'TCHS_cps_avg',			{ unit: 'cps' } ],
		[ 'TCHS_cps_min',			{ unit: 'cps' } ],
		[ 'TCHS_minutes_all',			{ unit: 'minutes' } ],
		[ 'TCHS_minutes_max',			{ unit: 'minutes' } ],
		[ 'TCHS_minutes_avg',			{ unit: 'minutes' } ],
		[ 'TCHS_minutes_min',			{ unit: 'minutes' } ]
	];
	if(window.rtpQualityUse) arCdrChart_chartSeriesData.push(
		[ 'TCHS_mos_intervals',			{ unit: 'count' } ],
		[ 'TCHS_mos_max',			{ unit: 'mos' } ],
		[ 'TCHS_mos_avg',			{ unit: 'mos' } ],
		[ 'TCHS_mos_min',			{ unit: 'mos' } ],
		[ 'TCHS_mos_perc95',			{ unit: 'mos' } ],
		[ 'TCHS_mos_perc99',			{ unit: 'mos' } ],
		[ 'TCHS_mos_caller_intervals',		{ unit: 'count' } ],
		[ 'TCHS_mos_caller_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_caller_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_caller_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_caller_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_caller_perc99',		{ unit: 'mos' } ],
		[ 'TCHS_mos_called_intervals',		{ unit: 'count' } ],
		[ 'TCHS_mos_called_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_called_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_called_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_called_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_called_perc99',		{ unit: 'mos' } ]
	);
	if(existsMosXrCdr && window.rtpQualityUse) arCdrChart_chartSeriesData.push(
		[ 'TCHS_mos_xr_avg_intervals',		{ unit: 'count' } ],
		[ 'TCHS_mos_xr_avg_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_perc99',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_caller_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_caller_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_caller_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_caller_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_caller_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_called_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_called_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_called_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_called_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_avg_called_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_intervals',		{ unit: 'count' } ],
		[ 'TCHS_mos_xr_min_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_perc99',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_caller_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_caller_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_caller_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_caller_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_caller_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_called_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_called_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_called_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_called_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_xr_min_called_perc99',	{ unit: 'mos' } ]
	);
	if(existsMosSilenceCdr && window.rtpQualityUse) arCdrChart_chartSeriesData.push(
		[ 'TCHS_mos_silence_avg_intervals',	{ unit: 'count' } ],
		[ 'TCHS_mos_silence_avg_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_caller_max',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_caller_avg',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_caller_min',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_caller_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_caller_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_called_max',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_called_avg',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_called_min',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_called_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_avg_called_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_intervals',	{ unit: 'count' } ],
		[ 'TCHS_mos_silence_min_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_caller_max',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_caller_avg',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_caller_min',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_caller_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_caller_perc99',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_called_max',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_called_avg',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_called_min',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_called_perc95',	{ unit: 'mos' } ],
		[ 'TCHS_mos_silence_min_called_perc99',	{ unit: 'mos' } ]
	);
	if(existsMosLqoCdr && window.rtpQualityUse) arCdrChart_chartSeriesData.push(
		[ 'TCHS_mos_lqo_caller_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_caller_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_caller_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_caller_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_caller_perc99',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_called_max',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_called_avg',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_called_min',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_called_perc95',		{ unit: 'mos' } ],
		[ 'TCHS_mos_lqo_called_perc99',		{ unit: 'mos' } ]
	);
	if(window.rtpQualityUse) arCdrChart_chartSeriesData.push(
		[ 'TCHS_packet_lost_intervals',		{ unit: 'count' } ],
		[ 'TCHS_packet_lost_caller_intervals',	{ unit: 'count' } ],
		[ 'TCHS_packet_lost_called_intervals',	{ unit: 'count' } ],
		[ 'TCHS_packet_lost_max',		{ unit: 'packet_loss' } ],
		[ 'TCHS_packet_lost_max',		{ unit: 'packet_loss' } ],
		[ 'TCHS_packet_lost_avg',		{ unit: 'packet_loss' } ],
		[ 'TCHS_packet_lost_min',		{ unit: 'packet_loss' } ],
		[ 'TCHS_packet_lost_perc95',		{ unit: 'packet_loss' } ],
		[ 'TCHS_packet_lost_perc99',		{ unit: 'packet_loss' } ],
		[ 'TCHS_jitter_intervals',		{ unit: 'count' } ],
		[ 'TCHS_jitter_max',			{ unit: 'jitter' } ],
		[ 'TCHS_jitter_avg',			{ unit: 'jitter' } ],
		[ 'TCHS_jitter_min',			{ unit: 'jitter' } ],
		[ 'TCHS_jitter_perc95',			{ unit: 'jitter' } ],
		[ 'TCHS_jitter_perc99',			{ unit: 'jitter' } ],
		[ 'TCHS_delay_max',			{ unit: 'delay' } ],
		[ 'TCHS_delay_avg',			{ unit: 'delay' } ],
		[ 'TCHS_delay_min',			{ unit: 'delay' } ],
		[ 'TCHS_delay_perc95',			{ unit: 'delay' } ],
		[ 'TCHS_delay_perc99',			{ unit: 'delay' } ],
		[ 'TCHS_rtcp_avgjitter_intervals',	{ unit: 'count' } ],
		[ 'TCHS_rtcp_avgjitter_max',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_avgjitter_avg',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_avgjitter_min',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_avgjitter_perc95',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_avgjitter_perc99',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_maxjitter_intervals',	{ unit: 'count' } ],
		[ 'TCHS_rtcp_maxjitter_max',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_maxjitter_avg',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_maxjitter_min',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_maxjitter_perc95',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_maxjitter_perc99',		{ unit: 'jitter' } ],
		[ 'TCHS_rtcp_avgfr_intervals',		{ unit: 'count' } ],
		[ 'TCHS_rtcp_avgfr_max',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_avgfr_avg',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_avgfr_min',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_avgfr_perc95',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_avgfr_perc99',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_maxfr_intervals',		{ unit: 'count' } ],
		[ 'TCHS_rtcp_maxfr_max',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_maxfr_avg',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_maxfr_min',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_maxfr_perc95',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_maxfr_perc99',		{ unit: 'fr' } ],
		[ 'TCHS_rtcp_avgrtd_intervals',		{ unit: 'count' } ],
		[ 'TCHS_rtcp_avgrtd_max',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_avgrtd_avg',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_avgrtd_min',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_avgrtd_perc95',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_avgrtd_perc99',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_maxrtd_intervals',		{ unit: 'count' } ],
		[ 'TCHS_rtcp_maxrtd_max',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_maxrtd_avg',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_maxrtd_min',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_maxrtd_perc95',		{ unit: 'ms' } ],
		[ 'TCHS_rtcp_maxrtd_perc99',		{ unit: 'ms' } ]
	);
	arCdrChart_chartSeriesData.push(
		[ 'TCHS_acd_avg',			{ unit: 'acd' } ],
		[ 'TCHS_acd',				{ unit: 'acd' } ],
		[ 'TCHS_asr_avg',			{ unit: 'perc' } ],
		[ 'TCHS_asr',				{ unit: 'perc' } ],
		[ 'TCHS_ner_avg',			{ unit: 'perc' } ],
		[ 'TCHS_ner',				{ unit: 'perc' } ],
		[ 'TCHS_pdd_intervals',			{ unit: 'count' } ],
		[ 'TCHS_pdd_max',			{ unit: 'pdd' } ],
		[ 'TCHS_pdd_avg',			{ unit: 'pdd' } ],
		[ 'TCHS_pdd_min',			{ unit: 'pdd' } ],
		[ 'TCHS_pdd_perc95',			{ unit: 'pdd' } ],
		[ 'TCHS_pdd_perc99',			{ unit: 'pdd' } ],
		[ 'TCHS_sipResp',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_2XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_3XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_4XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_5XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_6XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResponse',			{ unit: 'count' } ],
		[ 'TCHS_sipResponse_base',		{ unit: 'count' } ],
		[ 'TCHS_codecs',			{ unit: 'count' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_dst',			{ unit: 'count' } ]
	);
	arMessagesChart_chartSeriesData = [
		[ 'TCHS_count_all',			{ unit: 'count' } ],
		[ 'TCHS_count_max',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_avg',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_min',			{ unit: 'count_peak' } ],
		[ 'TCHS_cps_max',			{ unit: 'cps' } ],
		[ 'TCHS_cps_avg',			{ unit: 'cps' } ],
		[ 'TCHS_cps_min',			{ unit: 'cps' } ],
		[ 'TCHS_sipResp',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_2XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_3XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_4XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_5XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResp_6XX',			{ unit: 'count' } ],
		[ 'TCHS_sipResponse',			{ unit: 'count' } ],
		[ 'TCHS_sipResponse_base',		{ unit: 'count' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_dst',			{ unit: 'count' } ]
	];
	arSipMsgChart_chartSeriesData = [
		[ 'TCHS_count_all',			{ unit: 'count' } ],
		[ 'TCHS_count_max',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_avg',			{ unit: 'count_peak' } ],
		[ 'TCHS_count_min',			{ unit: 'count_peak' } ],
		[ 'TCHS_cps_max',			{ unit: 'cps' } ],
		[ 'TCHS_cps_avg',			{ unit: 'cps' } ],
		[ 'TCHS_cps_min',			{ unit: 'cps' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_IP_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_src',			{ unit: 'count' } ],
		[ 'TCHS_domain_dst',			{ unit: 'count' } ]
	];
	arCdrChart_chartThemes = [
		[ 'CdrChart', arLang.LchartTheme_CdrChart ],
		[ 'CdrChartLine', arLang.LchartTheme_CdrChartLine ],
		[ 'CdrChartColumn', arLang.LchartTheme_CdrChartColumn ],
		[ 'CdrChartLineWithGreySum', arLang.LchartTheme_CdrChartLineWithGreySum ],
		[ 'CdrChartArea', arLang.LchartTheme_CdrChartArea ]
	];
	arCdrChart_legendPosition = [
		[ 'top', arLang.LchartLegendPosition_top ],
		[ 'bottom', arLang.LchartLegendPosition_bottom ],
		[ 'left', arLang.LchartLegendPosition_left ],
		[ 'right', arLang.LchartLegendPosition_right ],
		[ 'none', arLang.LchartLegendPosition_none ]
	];
	arCdrChart_defChartTypes = {
		TCH_count: {
			CDR: {
				series: [{
					series: 'TCHS_count_all',
					sideAxis: 'right',
					baseType: 'column_line',
					fill: true, color: 'grey'
				},{ 	series: 'TCHS_count_max', color: 'red'
				},{ 	series: 'TCHS_count_avg', color: 'blue'
				},{ 	series: 'TCHS_count_min', color: 'green'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'concurrent calls - max, avg, min',
				axisTitleRight: 'total calls'
			},
			MESSAGES: {
				series: [{
					series: 'TCHS_count_all', color: 'blue'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'total messages'
			},
			SIP_MSG: {
				series: [{
					series: 'TCHS_count_all', color: 'blue'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'total sip msg.'
			}
		},
		TCH_cps: {
			CDR: {
				series: [{ 	
					series: 'TCHS_cps_max', color: 'red'
				},{ 	series: 'TCHS_cps_avg', color: 'blue'
				},{ 	series: 'TCHS_cps_min', color: 'green'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'calls per second - max, avg, min'
			},
			MESSAGES: {
				series: [{ 	
					series: 'TCHS_cps_max', color: 'red'
				},{ 	series: 'TCHS_cps_avg', color: 'blue'
				},{ 	series: 'TCHS_cps_min', color: 'green'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'messages per second - max, avg, min'
			},
			SIP_MSG: {
				series: [{ 	
					series: 'TCHS_cps_max', color: 'red'
				},{ 	series: 'TCHS_cps_avg', color: 'blue'
				},{ 	series: 'TCHS_cps_min', color: 'green'
				}],
				theme: 'CdrChartLineWithGreySum',
				axisTitleLeft: 'opt., subsc., notify per second - max, avg, min'
			}
		},
		TCH_minutes: {
			series: [{ 	
				series: 'TCHS_minutes_all', color: 'blue'
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'minutes of calls'
		}
	};
	if(window.rtpQualityUse) Ext.apply(arCdrChart_defChartTypes, {
		TCH_mos_intervals: {
			series: [{
				series: 'TCHS_mos_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS - count'
		},
		TCH_mos: {
			series: [{ 	
				series: 'TCHS_mos_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS min(both) - avg, perc 95, perc 99'
		},
		TCH_mos_caller_intervals: {
			series: [{
				series: 'TCHS_mos_caller_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS Caller - count'
		},
		TCH_mos_caller: {
			series: [{ 	
				series: 'TCHS_mos_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Caller - avg, perc 95, perc 99'
		},
		TCH_mos_called_intervals: {
			series: [{
				series: 'TCHS_mos_called_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS Called - count'
		},
		TCH_mos_called: {
			series: [{ 	
				series: 'TCHS_mos_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Called - avg, perc 95, perc 99'
		}
	});
	if(existsMosXrCdr && window.rtpQualityUse) Ext.apply(arCdrChart_defChartTypes, {
		TCH_mos_xr_avg_intervals: {
			series: [{
				series: 'TCHS_mos_xr_avg_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS XR avg - count'
		},
		TCH_mos_xr_avg: {
			series: [{ 	
				series: 'TCHS_mos_xr_avg_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR avg (both) - avg, perc 95, perc 99'
		},
		TCH_mos_xr_avg_caller: {
			series: [{ 	
				series: 'TCHS_mos_xr_avg_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR avg Caller - avg, perc 95, perc 99'
		},
		TCH_mos_xr_avg_called: {
			series: [{ 	
				series: 'TCHS_mos_xr_avg_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_avg_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR avg Called - avg, perc 95, perc 99'
		},
		TCH_mos_xr_min_intervals: {
			series: [{
				series: 'TCHS_mos_xr_min_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS XR min - count'
		},
		TCH_mos_xr_min: {
			series: [{ 	
				series: 'TCHS_mos_xr_min_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_min_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_min_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR min (both) - avg, perc 95, perc 99'
		},
		TCH_mos_xr_min_caller: {
			series: [{ 	
				series: 'TCHS_mos_xr_min_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_min_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_min_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR min Caller - avg, perc 95, perc 99'
		},
		TCH_mos_xr_min_called: {
			series: [{ 	
				series: 'TCHS_mos_xr_min_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_xr_min_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_xr_min_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS XR min Called - avg, perc 95, perc 99'
		}
	});
	if(existsMosSilenceCdr && window.rtpQualityUse) Ext.apply(arCdrChart_defChartTypes, {
		TCH_mos_silence_avg_intervals: {
			series: [{
				series: 'TCHS_mos_silence_avg_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS Silence avg - count'
		},
		TCH_mos_silence_avg: {
			series: [{ 	
				series: 'TCHS_mos_silence_avg_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence avg (both) - avg, perc 95, perc 99'
		},
		TCH_mos_silence_avg_caller: {
			series: [{ 	
				series: 'TCHS_mos_silence_avg_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence avg Caller - avg, perc 95, perc 99'
		},
		TCH_mos_silence_avg_called: {
			series: [{ 	
				series: 'TCHS_mos_silence_avg_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_avg_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence avg Called - avg, perc 95, perc 99'
		},
		TCH_mos_silence_min_intervals: {
			series: [{
				series: 'TCHS_mos_silence_min_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'MOS Silence min - count'
		},
		TCH_mos_silence_min: {
			series: [{ 	
				series: 'TCHS_mos_silence_min_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_min_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_min_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence min (both) - avg, perc 95, perc 99'
		},
		TCH_mos_silence_min_caller: {
			series: [{ 	
				series: 'TCHS_mos_silence_min_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_min_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_min_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence min Caller - avg, perc 95, perc 99'
		},
		TCH_mos_silence_min_called: {
			series: [{ 	
				series: 'TCHS_mos_silence_min_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_silence_min_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_silence_min_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS Silence min Called - avg, perc 95, perc 99'
		}
	});
	if(existsMosLqoCdr && window.rtpQualityUse) Ext.apply(arCdrChart_defChartTypes, {
		TCH_mos_lqo_caller: {
			series: [{ 	
				series: 'TCHS_mos_lqo_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_lqo_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_lqo_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS LQO Caller - avg, perc 95, perc 99'
		},
		TCH_mos_lqo_called: {
			series: [{ 	
				series: 'TCHS_mos_lqo_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_mos_lqo_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_mos_lqo_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'MOS LQO Called - avg, perc 95, perc 99'
		}
	});
	if(window.rtpQualityUse) Ext.apply(arCdrChart_defChartTypes, {
		TCH_packet_lost_intervals: {
			series: [{
				series: 'TCHS_packet_lost_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'packet loss - count'
		},
		TCH_packet_lost_caller_intervals: {
			series: [{
				series: 'TCHS_packet_lost_caller_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'packet loss - caller - count'
		},
		TCH_packet_lost_called_intervals: {
			series: [{
				series: 'TCHS_packet_lost_called_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'packet loss - called - count'
		},
		TCH_packet_lost: {
			series: [{
				series: 'TCHS_packet_lost_perc99', color: '#400B12', fill: true
			},{ 	series: 'TCHS_packet_lost_perc95', color: '#861B29', fill: true
			},{ 	series: 'TCHS_packet_lost_avg', color: '#C6253B', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'packet loss - avg, perc 95, perc 99'
		},
		TCH_jitter_intervals: {
			series: [{
				series: 'TCHS_jitter_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'jitter - count'
		},
		TCH_jitter: {
			series: [{
				series: 'TCHS_jitter_perc99', color: '#40350B', fill: true
			},{ 	series: 'TCHS_jitter_perc95', color: '#886E1B', fill: true
			},{ 	series: 'TCHS_jitter_avg', color: '#C89726', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'jitter - avg, perc 95, perc 99'
		},
		TCH_delay: {
			series: [{
				series: 'TCHS_delay_perc99', color: '#3B0B40', fill: true
			},{ 	series: 'TCHS_delay_perc95', color: '#791B88', fill: true
			},{ 	series: 'TCHS_delay_avg', color: '#BD26C8', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'x̄ PDV - avg, perc 95, perc 99'
		},
		TCH_rtcp_avgjitter_intervals: {
			series: [{
				series: 'TCHS_rtcp_avgjitter_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp avg jitter - count'
		},
		TCH_rtcp_avgjitter: {
			series: [{
				series: 'TCHS_rtcp_avgjitter_perc99', color: '#0B4031', fill: true
			},{ 	series: 'TCHS_rtcp_avgjitter_perc95', color: '#1B885A', fill: true
			},{ 	series: 'TCHS_rtcp_avgjitter_avg', color: '#26C87A', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp avg jitter - avg, perc 95, perc 99'
		},
		TCH_rtcp_maxjitter_intervals: {
			series: [{
				series: 'TCHS_rtcp_maxjitter_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp max jitter - count'
		},
		TCH_rtcp_maxjitter: {
			series: [{
				series: 'TCHS_rtcp_maxjitter_perc99', color: '#0B400C', fill: true
			},{ 	series: 'TCHS_rtcp_maxjitter_perc95', color: '#1D881B', fill: true
			},{ 	series: 'TCHS_rtcp_maxjitter_avg', color: '#2EC826', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp max jitter - avg, perc 95, perc 99'
		},
		TCH_rtcp_avgfr_intervals: {
			series: [{
				series: 'TCHS_rtcp_avgfr_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp avg fr - count'
		},
		TCH_rtcp_avgfr: {
			series: [{
				series: 'TCHS_rtcp_avgfr_perc99', color: '#34400B', fill: true
			},{ 	series: 'TCHS_rtcp_avgfr_perc95', color: '#60881B', fill: true
			},{ 	series: 'TCHS_rtcp_avgfr_avg', color: '#A7C826', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp avg fr - avg, perc 95, perc 99'
		},
		TCH_rtcp_maxfr_intervals: {
			series: [{
				series: 'TCHS_rtcp_maxfr_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp max fr - count'
		},
		TCH_rtcp_maxfr: {
			series: [{
				series: 'TCHS_rtcp_maxfr_perc99', color: '#40350B', fill: true
			},{ 	series: 'TCHS_rtcp_maxfr_perc95', color: '#886E1B', fill: true
			},{ 	series: 'TCHS_rtcp_maxfr_avg', color: '#C89D26', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp max fr - avg, perc 95, perc 99'
		},
		TCH_rtcp_avgrtd_intervals: {
			series: [{
				series: 'TCHS_rtcp_avgrtd_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp avg rtd - count'
		},
		TCH_rtcp_avgrtd: {
			series: [{
				series: 'TCHS_rtcp_avgrtd_perc99', color: '#40350B', fill: true
			},{ 	series: 'TCHS_rtcp_avgrtd_perc95', color: '#886E1B', fill: true
			},{ 	series: 'TCHS_rtcp_avgrtd_avg', color: '#C89D26', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp avg rtd - avg, perc 95, perc 99'
		},
		TCH_rtcp_maxrtd_intervals: {
			series: [{
				series: 'TCHS_rtcp_maxrtd_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'rtcp max rtd - count'
		},
		TCH_rtcp_maxrtd: {
			series: [{
				series: 'TCHS_rtcp_maxrtd_perc99', color: '#40350B', fill: true
			},{ 	series: 'TCHS_rtcp_maxrtd_perc95', color: '#886E1B', fill: true
			},{ 	series: 'TCHS_rtcp_maxrtd_avg', color: '#C89D26', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'rtcp max rtd - avg, perc 95, perc 99'
		}
	});
	Ext.apply(arCdrChart_defChartTypes, {
		TCH_acd_avg: {
			series: [{
				series: 'TCHS_acd_avg', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'ACD'
		},
		TCH_acd: {
			series: [{
				series: 'TCHS_acd', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'ACD'
		},
		TCH_asr_avg: {
			series: [{
				series: 'TCHS_asr_avg', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'ASR'
		},
		TCH_asr: {
			series: [{
				series: 'TCHS_asr', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'ASR'
		},
		TCH_ner_avg: {
			series: [{
				series: 'TCHS_ner_avg', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'NER'
		},
		TCH_ner: {
			series: [{
				series: 'TCHS_ner', color: 'blue'
			}],
			theme: 'CdrChartColumn',
			axisTitleLeft: 'NER'
		},
		TCH_pdd_intervals: {
			series: [{
				series: 'TCHS_pdd_intervals',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'PDD - count'
		},
		TCH_pdd: {
			series: [{
				series: 'TCHS_pdd_max', color: 'red'
			},{ 	series: 'TCHS_pdd_avg', color: 'blue'
			},{ 	series: 'TCHS_pdd_min', color: 'green'
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'PDD - max, avg, min'
		},
		TCH_sipResp: {
			series: [{
				series: 'TCHS_sipResp_2XX', color: 'green'
			},{ 	series: 'TCHS_sipResp_3XX', color: 'blue'
			},{ 	series: 'TCHS_sipResp_4XX', color: 'orange'
			},{ 	series: 'TCHS_sipResp_5XX', color: 'red'
			},{ 	series: 'TCHS_sipResp_6XX', color: 'bloodred'
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'SIP response count'
		},
		TCH_sipResponse: {
			series: [{
				series: 'TCHS_sipResponse',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'SIP response count'
		},
		TCH_sipResponse_base: {
			series: [{
				series: 'TCHS_sipResponse_base',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'SIP response count'
		},
		TCH_codecs: {
			series: [{
				series: 'TCHS_codecs',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'codecs count'
		},
		TCH_IP_src: {
			series: [{
				series: 'TCHS_IP_src',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'IP src'
		},
		TCH_IP_dst: {
			series: [{
				series: 'TCHS_IP_dst',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'IP dst'
		},
		TCH_domain_src: {
			series: [{
				series: 'TCHS_domain_src',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'domain src'
		},
		TCH_domain_dst: {
			series: [{
				series: 'TCHS_domain_dst',
				baseType: 'area'
			}],
			theme: 'CdrChartArea',
			axisTitleLeft: 'domain dst'
		}
	});
	if(window.existsCdrSilence) Ext.apply(arCdrChart_defChartTypes, {
		TCH_silence: {
			series: [{ 	
				series: 'TCHS_silence_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Silence max(both) - avg, perc 95, perc 99'
		},
		TCH_silence_caller: {
			series: [{ 	
				series: 'TCHS_silence_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Silence Caller - avg, perc 95, perc 99'
		},
		TCH_silence_called: {
			series: [{ 	
				series: 'TCHS_silence_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Silence Called - avg, perc 95, perc 99'
		},
		TCH_silence_end: {
			series: [{ 	
				series: 'TCHS_silence_end_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_end_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_end_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Last Silence max(both) - avg, perc 95, perc 99'
		},
		TCH_silence_end_caller: {
			series: [{ 	
				series: 'TCHS_silence_end_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_end_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_end_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Last Silence Caller - avg, perc 95, perc 99'
		},
		TCH_silence_end_called: {
			series: [{ 	
				series: 'TCHS_silence_end_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_silence_end_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_silence_end_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Last Silence Called - avg, perc 95, perc 99'
		}
	});
	if(window.existsCdrClipping) Ext.apply(arCdrChart_defChartTypes, {
		TCH_clipping: {
			series: [{ 	
				series: 'TCHS_clipping_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_clipping_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_clipping_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Clipped Frames max(both) - avg, perc 95, perc 99'
		},
		TCH_clipping_caller: {
			series: [{ 	
				series: 'TCHS_clipping_caller_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_clipping_caller_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_clipping_caller_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Clipped Frames Caller - avg, perc 95, perc 99'
		},
		TCH_clipping_called: {
			series: [{ 	
				series: 'TCHS_clipping_called_perc99', color: '#2C9EE5', fill: true
			},{ 	series: 'TCHS_clipping_called_perc95', color: '#1B6288', fill: true
			},{ 	series: 'TCHS_clipping_called_avg', color: '#0B2C40', fill: true
			}],
			theme: 'CdrChartLine',
			axisTitleLeft: 'Clipped Frames Called - avg, perc 95, perc 99'
		}
	});
	arIpProto = [
		[ _IPPROTO_IP,		'Dummy protocol for TCP.' ],
		//[ _IPPROTO_HOPOPTS,	'IPv6 Hop-by-Hop options.' ],
		[ _IPPROTO_ICMP,	'Internet Control Message Protocol.' ],
		[ _IPPROTO_IGMP,	'Internet Group Management Protocol.' ],
		[ _IPPROTO_IPIP,	'IPIP tunnels (older KA9Q tunnels use 94).' ],
		[ _IPPROTO_TCP,		'Transmission Control Protocol.' ],
		[ _IPPROTO_EGP,		'Exterior Gateway Protocol.' ],
		[ _IPPROTO_PUP,		'PUP protocol.' ],
		[ _IPPROTO_UDP,		'User Datagram Protocol.' ],
		[ _IPPROTO_IDP,		'XNS IDP protocol.' ],
		[ _IPPROTO_TP,		'SO Transport Protocol Class 4.' ],
		[ _IPPROTO_DCCP,	'Datagram Congestion Control Protocol.' ],
		[ _IPPROTO_IPV6,	'IPv6 header.' ],
		[ _IPPROTO_ROUTING,	'IPv6 routing header.' ],
		[ _IPPROTO_FRAGMENT,	'IPv6 fragmentation header.' ],
		[ _IPPROTO_RSVP,	'Reservation Protocol.' ],
		[ _IPPROTO_GRE,		'General Routing Encapsulation.' ],
		[ _IPPROTO_ESP,		'encapsulating security payload.' ],
		[ _IPPROTO_AH,		'authentication header.' ],
		[ _IPPROTO_ICMPV6,	'ICMPv6.' ],
		[ _IPPROTO_NONE,	'IPv6 no next header.' ],
		[ _IPPROTO_DSTOPTS,	'IPv6 destination options.' ],
		[ _IPPROTO_MTP,		'Multicast Transport Protocol.' ],
		[ _IPPROTO_ENCAP,	'Encapsulation Header.' ],
		[ _IPPROTO_PIM,		'Protocol Independent Multicast.' ],
		[ _IPPROTO_COMP,	'Compression Header Protocol.' ],
		[ _IPPROTO_SCTP,	'Stream Control Transmission Protocol.' ],
		[ _IPPROTO_UDPLITE,	'UDP-Lite protocol.' ],
		[ _IPPROTO_RAW,		'Raw IP packets.' ]
	];
	arWeekday = [
		[ 1, arLang.Lsunday ],
		[ 2, arLang.Lmonday ],
		[ 3, arLang.Ltuesday ],
		[ 4, arLang.Lwednesday ],
		[ 5, arLang.Lthursday ],
		[ 6, arLang.Lfriday ],
		[ 7, arLang.Lsaturday ]
	];
	arDashboardTimeIntervals = [
		[ 'last_5minutes',	arLang.LtimeInterval_last_5minutes,		'TA_SECONDS',	5*60,		60,		0,	10 ],
		[ 'last_15minutes',	arLang.LtimeInterval_last_15minutes,		'TA_MINUTES',	15*60,		60,		0,	20 ],
		[ 'last_30minutes',	arLang.LtimeInterval_last_30minutes,		'TA_MINUTES',	30*60,		60,		0,	20 ],
		[ 'last_60minutes',	arLang.LtimeInterval_last_60minutes,		'TA_MINUTES',	60*60,		60,		0,	30 ],
		[ 'last_120minutes',	arLang.LtimeInterval_last_120minutes,		'TA_MINUTES',	120*60,		60,		0,	60 ],
		[ 'last_180minutes',	arLang.LtimeInterval_last_180minutes,		'TA_MINUTES',	180*60,		60,		0,	60 ],
		[ 'this_hour',		arLang.LtimeInterval_this_hour,			'TA_MINUTES',	60*60,		60*60,		0,	30 ],
		[ 'last_2hours',	arLang.LtimeInterval_last_2hours,		'TA_MINUTES',	2*60*60,	60*60,		15*60,	60 ],
		[ 'last_3hours',	arLang.LtimeInterval_last_3hours,		'TA_MINUTES',	3*60*60,	60*60,		15*60,	60 ],
		[ 'last_6hours',	arLang.LtimeInterval_last_6hours,		'TA_5MINUTES',	6*60*60,	60*60,		15*60,	60 ],
		[ 'last_12hours',	arLang.LtimeInterval_last_12hours,		'TA_5MINUTES',	12*60*60,	60*60,		15*60,	60 ],
		[ 'last_24hours',	arLang.LtimeInterval_last_24hours,		'TA_10MINUTES',	24*60*60,	60*60,		0,	300 ],
		[ 'last_48hours',	arLang.LtimeInterval_last_48hours,		'TA_QUARTER',	2*24*60*60,	60*60,		0,	300 ],
		[ 'last_72hours',	arLang.LtimeInterval_last_72hours,		'TA_HOURS',	3*24*60*60,	60*60,		0,	300 ],
		[ 'this_day',		arLang.LtimeInterval_this_day,			'TA_10MINUTES',	24*60*60,	24*60*60,	0,	300 ],
		[ 'last_2days',		arLang.LtimeInterval_last_2days,		'TA_QUARTER',	2*24*60*60,	24*60*60,	0,	300 ],
		[ 'last_3days',		arLang.LtimeInterval_last_3days,		'TA_HOURS',	3*24*60*60,	24*60*60,	0,	300 ],
		[ 'last_7days',		arLang.LtimeInterval_last_7days,		'TA_HOURS',	7*24*60*60,	24*60*60,	0,	600 ],
		[ 'last_8days',		arLang.LtimeInterval_last_8days,		'TA_HOURS',	8*24*60*60,	24*60*60,	0,	600 ],
		[ 'this_week_m',	arLang.LtimeInterval_this_week_from_monday,	'TA_HOURS',	7*24*60*60,	24*60*60,	0,	600,	'monday' ],
		[ 'this_week_s',	arLang.LtimeInterval_this_week_from_sunday,	'TA_HOURS',	7*24*60*60,	24*60*60,	0,	600,	'sunday' ],
		[ 'last_30days',	arLang.LtimeInterval_last_30days,		'TA_2HOURS',	30*24*60*60,	24*60*60,	0,	1200 ],
		[ 'this_month',		arLang.LtimeInterval_this_month,		'TA_2HOURS',	31*24*60*60,	24*60*60,	0,	1200,	'1_day',	'last_day' ]
	];
	arDashboardTimeIntervals_charts_long = [
		[ 'last_60days',	arLang.LtimeInterval_last_60days,		'TA_DAYS',	60*24*60*60,	24*60*60,	0,	1200 ],
		[ 'last_120days',	arLang.LtimeInterval_last_120days,		'TA_DAYS',	120*24*60*60,	24*60*60,	0,	1200 ],
		[ 'last_180days',	arLang.LtimeInterval_last_180days,		'TA_DAYS',	180*24*60*60,	24*60*60,	0,	1200 ],
		[ 'last_360days',	arLang.LtimeInterval_last_360days,		'TA_DAYS',	360*24*60*60,	24*60*60,	0,	1200 ]
	];
	arDashboardTimeIntervals_sensors_rrd = [
		[ 'last_60minutes',	arLang.LtimeInterval_last_60minutes,		'TA_MINUTES',	60*60,		60,		0,	30 ],
		[ 'last_24hours',	arLang.LtimeInterval_last_24hours,		'TA_10MINUTES',	24*60*60,	60*60,		0,	300 ],
		[ 'last_7days',		arLang.LtimeInterval_last_week,			'TA_HOURS',	7*24*60*60,	24*60*60,	0,	600 ],
		[ 'last_30days',	arLang.LtimeInterval_last_month,		'TA_DAYS',	30*24*60*60,	24*60*60,	0,	1200 ],
		[ 'last_year',		arLang.LtimeInterval_last_year,			'TA_DAYS',	365*24*60*60,	24*60*60,	0,	1200 ],
		[ '-' ],
		[ 'last_2hours',	arLang.LtimeInterval_last_2hours,		'TA_MINUTES',	2*60*60,	60*60,		15*60,	60 ],
		[ 'last_3hours',	arLang.LtimeInterval_last_3hours,		'TA_MINUTES',	3*60*60,	60*60,		15*60,	60 ],
		[ 'last_2days',		arLang.LtimeInterval_last_2days,		'TA_QUARTER',	2*24*60*60,	24*60*60,	0,	300 ],
		[ 'last_3days',		arLang.LtimeInterval_last_3days,		'TA_HOURS',	3*24*60*60,	24*60*60,	0,	300 ]
	];
	arExportCsvTimeIntervals = [
		[ 'past_interval_by_schedule_every',
					arLang.LtimeInterval_past_interval_by_schedule_every ],
		[ 'past_hour',		arLang.LtimeInterval_past_hour ],
		[ 'past_2_hours',	arLang.LtimeInterval_past_2_hours ],
		[ 'past_3_hours',	arLang.LtimeInterval_past_3_hours ],
		[ 'past_8_hours',	arLang.LtimeInterval_past_8_hours ],
		[ 'past_day',		arLang.LtimeInterval_past_day ],
		[ 'past_2_days',	arLang.LtimeInterval_past_2_days ],
		[ 'past_3_days',	arLang.LtimeInterval_past_3_days ],
		[ 'past_month',		arLang.LtimeInterval_past_month ]
	];
	arCrontabType = [
		[ 'create_csv_cdr',	arLang.LcrontabType_create_csv_cdr ],
		[ 'create_csv_message',	arLang.LcrontabType_create_csv_message ],
		[ 'create_csv_reg',	arLang.LcrontabType_create_csv_reg ]
	];
	arCrontabTypeAt = [
		[ 'every',		arLang.LcrontabTypeAt_every ],
		[ 'at',			arLang.LcrontabTypeAt_at ]
	];
	arCustomCleaningType = [
		[ 'cleaning_cdr',	arLang.LcustomCleaningType_cleaning_cdr ],
		[ 'cleaning_message',	arLang.LcustomCleaningType_cleaning_message ]
	];
	arDscp = [
		[ 0,	'CS0',	0 ],
		[ 8,	'CS1',	1 ],
		[ 10,	'AF11',	1 ],
		[ 12,	'AF12',	1 ],
		[ 14,	'AF13',	1 ],
		[ 16,	'CS2',	2 ],
		[ 18,	'AF21',	2 ],
		[ 20,	'AF22',	2 ],
		[ 22,	'AF23',	2 ],
		[ 24,	'CS3',	3 ],
		[ 26,	'AF31',	3 ],
		[ 28,	'AF32',	3 ],
		[ 30,	'AF33',	3 ],
		[ 32,	'CS4',	4 ],
		[ 34,	'AF41',	4 ],
		[ 36,	'AF42',	4 ],
		[ 38,	'AF43',	4 ],
		[ 40,	'CS5',	5 ],
		[ 46,	'EF',	5 ],
		[ 48,	'CS6',	6 ],
		[ 56,	'CS7',	7 ]
	];
	arScreenPopupOn = [
		[ '183/180', arLang.LscreenPopupOn_183x180 ],
		[ '200', arLang.LscreenPopupOn_200 ]/*,
		[ '183/180_200', arLang.LscreenPopupOn_183x180_200 ]*/
	];
	arCountryOrContinent = [
		[ 'country', arLang.LcountryOrContinent_country ],
		[ 'continent', arLang.LcountryOrContinent_continent ]
	];
	arSendAlertReportIf = [
		[ 0, arLang.LarSendAlertReportIf_match ],
		[ 1, arLang.LarSendAlertReportIf_no_match ],
		[ 2, arLang.LarSendAlertReportIf_both ]
	];
	arDashboardTypePanels = [
		'chart',
		'chart_3d_rtp_stat',
		'grid_rtp_stat',
		'sip_response_pie_chart',
		'top_ip_address_chart',
		'asr_acd_mos_by_sip_ip_grid',
		'asr_acd_mos_by_rtp_ip_grid',
		'asr_acd_mos_by_callerd_grid',
		'asr_acd_mos_by_ua_grid',
		'asr_acd_mos_by_country_by_sip_ip_grid',
		'asr_acd_mos_by_country_by_number_grid',
		'asr_acd_mos_by_sip_response_grid',
		'chart_message',
		'sip_response_pie_chart_message',
		'top_ip_address_chart_message',
		'chart_sip_msg',
		'count_by_sip_ip_grid_message',
		'count_by_callerd_grid_message',
		'count_by_country_by_sip_ip_grid_message',
		'count_by_country_by_number_grid_message',
		'count_by_sip_response_grid_message',
		'sniffer_stat',
		'sniffer_rrd',
		'active_calls_map',
		'active_calls_chart'
	];
	if(!user_can_3d_rtp_charts()) {
		var i = arDashboardTypePanels.indexOf('chart_3d_rtp_stat');
		if(i >= 0) {
			arDashboardTypePanels.splice(i, 1);
		}
	}
	if(window.enableCollectd) {
		arDashboardTypePanels.push(
			'collectd_rrd'
		);
	}
	arTypeHoliday = [
		[ 'fixed', arLang.LarTypeHoliday_fixed ],
		[ 'movable', arLang.LarTypeHoliday_movable ],
		[ 'easter_monday', arLang.LarTypeHoliday_easter_monday ],
		[ 'easter_friday', arLang.LarTypeHoliday_easter_friday ]
	];
	arCdrSide = [
		[ 'src', arLang.LcdrSideSrc ],
		[ 'dst', arLang.LcdrSideDst ],
		[ 'both', arLang.LcdrSideBoth ]
	];
	arSensorGraphsRRD = [
		[ 'calls', arLang.LsensorGraphsRRD_calls ],
		[ 'heap', arLang.LsensorGraphsRRD_heap ],
		[ 'SQLq', arLang.LsensorGraphsRRD_SQLq ],
		[ 'SQLf', arLang.LsensorGraphsRRD_SQLf ],
		[ 'tCPU', arLang.LsensorGraphsRRD_tCPU ],
		[ 'memusage', arLang.LsensorGraphsRRD_memusage ],
		[ 'loadavg', arLang.LsensorGraphsRRD_loadavg ],
		[ 'PS', arLang.LsensorGraphsRRD_PS ],
		[ 'PSC', arLang.LsensorGraphsRRD_PSC ],
		[ 'PSS', arLang.LsensorGraphsRRD_PSS ],
		[ 'PSSR', arLang.LsensorGraphsRRD_PSSR ],
		[ 'PSSM', arLang.LsensorGraphsRRD_PSSM ],
		[ 'PSR', arLang.LsensorGraphsRRD_PSR ],
		[ 'PSA', arLang.LsensorGraphsRRD_PSA ],
		[ 'speed', arLang.LsensorGraphsRRD_speed ],
		[ 'drop', arLang.LsensorGraphsRRD_drop ],
		[ 'tacCPU', arLang.LsensorGraphsRRD_tacCPU ]
	];
	arColumnsCDRstat = [
		'total_perc',
		'duration_all',
		'asr_all',
		'ner_all',
		'acd_all'
	];
	if(window.rtpQualityUse) arColumnsCDRstat.push(
		'mos_all',
		'mos_perc95_all',
		'mos_perc99_all'
	);
	arTypeIp = [
                [ 0, 'static', arLang.type_ip_static ],
                [ 1, 'dhcp', arLang.type_ip_dhcp ]
        ];
	if(existsMosXrCdr && window.rtpQualityUse) arColumnsCDRstat.push(
		'mos_xr_avg_all',
		'mos_xr_avg_perc95_all',
		'mos_xr_avg_perc99_all',
		'mos_xr_avg_caller_all',
		'mos_xr_avg_caller_perc95_all',
		'mos_xr_avg_caller_perc99_all',
		'mos_xr_avg_called_all',
		'mos_xr_avg_called_perc95_all',
		'mos_xr_avg_called_perc99_all',
		'mos_xr_min_all',
		'mos_xr_min_perc95_all',
		'mos_xr_min_perc99_all',
		'mos_xr_min_caller_all',
		'mos_xr_min_caller_perc95_all',
		'mos_xr_min_caller_perc99_all',
		'mos_xr_min_called_all',
		'mos_xr_min_called_perc95_all',
		'mos_xr_min_called_perc99_all'
	);
	if(existsMosSilenceCdr && window.rtpQualityUse) arColumnsCDRstat.push(
		'mos_silence_avg_all',
		'mos_silence_avg_perc95_all',
		'mos_silence_avg_perc99_all',
		'mos_silence_avg_caller_all',
		'mos_silence_avg_caller_perc95_all',
		'mos_silence_avg_caller_perc99_all',
		'mos_silence_avg_called_all',
		'mos_silence_avg_called_perc95_all',
		'mos_silence_avg_called_perc99_all',
		'mos_silence_min_all',
		'mos_silence_min_perc95_all',
		'mos_silence_min_perc99_all',
		'mos_silence_min_caller_all',
		'mos_silence_min_caller_perc95_all',
		'mos_silence_min_caller_perc99_all',
		'mos_silence_min_called_all',
		'mos_silence_min_called_perc95_all',
		'mos_silence_min_called_perc99_all'
	);
	if(existsMosLqoCdr && window.rtpQualityUse) arColumnsCDRstat.push(
		'mos_lqo_caller_all',
		'mos_lqo_caller_perc95_all',
		'mos_lqo_caller_perc99_all',
		'mos_lqo_called_all',
		'mos_lqo_called_perc95_all',
		'mos_lqo_called_perc99_all');
	if(window.rtpQualityUse) arColumnsCDRstat.push(
		'packets_lost_all',
		'packets_lost_perc95_all',
		'packets_lost_perc99_all',
		'jitter_all',
		'jitter_perc95_all',
		'jitter_perc99_all',
		'delay_all',
		'delay_perc95_all',
		'delay_perc99_all'
	);
	arColumnsCDRstat.push(
		'pdd_all',
		'pdd_perc95_all',
		'pdd_perc99_all',
		'cps_max',
		'cps_avg'
	);
	if(window.rtpQualityUse) arColumnsCDRstat.push(
		'rtcp_maxfr',
		'rtcp_maxfr_perc95_all',
		'rtcp_maxfr_perc99_all',
		'rtcp_avgfr',
		'rtcp_avgfr_perc95_all',
		'rtcp_avgfr_perc99_all',
		'rtcp_maxjitter',
		'rtcp_maxjitter_perc95_all',
		'rtcp_maxjitter_perc99_all',
		'rtcp_avgjitter',
		'rtcp_avgjitter_perc95_all',
		'rtcp_avgjitter_perc99_all',
		'rtcp_maxrtd',
		'rtcp_maxrtd_perc95_all',
		'rtcp_maxrtd_perc99_all',
		'rtcp_avgrtd',
		'rtcp_avgrtd_perc95_all',
		'rtcp_avgrtd_perc99_all'
	);
	if(existsCdrSilence) arColumnsCDRstat.push(
		'silence_all',
		'silence_perc95_all',
		'silence_perc99_all',
		'silence_end_all',
		'silence_end_perc95_all',
		'silence_end_perc99_all');
	if(existsCdrClipping) arColumnsCDRstat.push(
		'clipping_all',
		'clipping_perc95_all',
		'clipping_perc99_all');
	if(window.fillBillingTable) arColumnsCDRstat.push(
		'price_operator',
		'price_customer',
		'price_difference');
	if(window.disablePercentiles) {
		var arColumnsCDRstat_new = [];
		for(var i = 0; i < arColumnsCDRstat.length; i++) {
			if(!arColumnsCDRstat[i].match(/_perc9/)) {
				arColumnsCDRstat_new.push(arColumnsCDRstat[i]);
			}
		}
		arColumnsCDRstat = arColumnsCDRstat_new;
	}
	arColumnsRtpStat = {
		counter: null,
		mos_f1_min: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		mos_f1_avg: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		mos_f2_min: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		mos_f2_avg: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		mos_ad_min: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		mos_ad_avg: { agreg: [ 'min', 'avg', 'perc95', 'perc99'], chart: true },
		jitter_max: { agreg: [ 'max', 'avg', 'perc95', 'perc99'], chart: true },
		jitter_avg: { agreg: [ 'max', 'avg', 'perc95', 'perc99'], chart: true },
		loss_max: { agreg: [ 'max', 'avg', 'perc95', 'perc99'], chart: true },
		loss_avg: { agreg: [ 'max', 'avg', 'perc95', 'perc99'], chart: true },
	};
	arChart3D_rtp_stat = [
		[ 'mosf1_min', arLang.LarChart3D_rtp_stat_mosf1_min, arLang.LarChart3D_rtp_stat_mosf1_min_pretty ],
		[ 'mosf1_avg', arLang.LarChart3D_rtp_stat_mosf1_avg, arLang.LarChart3D_rtp_stat_mosf1_avg_pretty ],
		[ 'mosf2_min', arLang.LarChart3D_rtp_stat_mosf2_min, arLang.LarChart3D_rtp_stat_mosf2_min_pretty ],
		[ 'mosf2_avg', arLang.LarChart3D_rtp_stat_mosf2_avg, arLang.LarChart3D_rtp_stat_mosf2_avg_pretty ],
		[ 'mosAD_min', arLang.LarChart3D_rtp_stat_mosAD_min, arLang.LarChart3D_rtp_stat_mosAD_min_pretty ],
		[ 'mosAD_avg', arLang.LarChart3D_rtp_stat_mosAD_avg, arLang.LarChart3D_rtp_stat_mosAD_avg_pretty ],
		[ 'jitter_max', arLang.LarChart3D_rtp_stat_jitter_max, arLang.LarChart3D_rtp_stat_jitter_max_pretty ],
		[ 'jitter_avg', arLang.LarChart3D_rtp_stat_jitter_avg, arLang.LarChart3D_rtp_stat_jitter_avg_pretty ],
		[ 'loss_max', arLang.LarChart3D_rtp_stat_loss_max, arLang.LarChart3D_rtp_stat_loss_max_pretty ],
		[ 'loss_avg', arLang.LarChart3D_rtp_stat_loss_avg, arLang.LarChart3D_rtp_stat_loss_avg_pretty ]
	];
	arCdrCustomHeadersSpecialType = [
		[ 'max_length_sip_data', arLang.LarCdrCustomHeadersSpecialType_max_length_sip_data ],
		[ 'max_length_sip_packet', arLang.LarCdrCustomHeadersSpecialType_max_length_sip_packet ],
		[ 'max_retransmission_invite', arLang.LarCdrCustomHeadersSpecialType_max_retransmission_invite ]
	];
	arMessageCustomHeadersSpecialType = [
		[ 'gsm_dcs', arLang.LarMessageCustomHeadersSpecialType_gsm_dcs ],
		[ 'gsm_voicemail', arLang.LarMessageCustomHeadersSpecialType_gsm_voicemail ],
		[ 'max_length_sip_data', arLang.LarMessageCustomHeadersSpecialType_max_length_sip_data ],
		[ 'max_length_sip_packet', arLang.LarMessageCustomHeadersSpecialType_max_length_sip_packet ]
	];
	arLogSensorType = [
		[ 'debug', arLang.LarLogSensorType_debug ],
		[ 'info', arLang.LarLogSensorType_info ],
		[ 'notice', arLang.LarLogSensorType_notice ],
		[ 'warning', arLang.LarLogSensorType_warning ],
		[ 'error', arLang.LarLogSensorType_error ],
		[ 'critical', arLang.LarLogSensorType_critical ],
		[ 'alert', arLang.LarLogSensorType_alert ],
		[ 'emergency', arLang.LarLogSensorType_emergency ]
	];
	arSs7State = [
		[ 'call_setup', arLang.LarSs7State_call_setup ],
		[ 'in_call', arLang.LarSs7State_in_call ],
		[ 'completed', arLang.LarSs7State_completed ],
		[ 'rejected', arLang.LarSs7State_rejected ],
		[ 'canceled', arLang.LarSs7State_canceled ]
	];
}

function fillDataArrays() {
	if(window.enableTestSipUser) {
		arCdrGroupBy.push(
			[_CdrGroupBy_sipUsers, arLang.LcdrGroupBy_sipUsers, 'sip_user_id', 'sip_user_name']);
	}
	arCdrGroupBy.push(
		[_CdrGroupBy_sipResponse, arLang.LcdrGroupBy_sipResponse, 'lastSIPresponse'],
		[_CdrGroupBy_sipResponse_bye_code, arLang.LcdrGroupBy_sipResponse_bye_code, ['lastSIPresponse', 'bye']]
	);
	if(window.existsCdrReason) {
		arCdrGroupBy.push(
			[_CdrGroupBy_reasonSip, arLang.LcdrGroupBy_reasonSip, 'reason_sip'],
			[_CdrGroupBy_reasonQ850, arLang.LcdrGroupBy_reasonQ850, 'reason_q850']
		);
	}
	arCdrGroupBy.push(
		[_CdrGroupBy_codecs, arLang.LcdrGroupBy_codecs, 'x_payload', 'x_codec'],
		[_CdrGroupBy_sipIP, arLang.LcdrGroupBy_sipIP, 'sipip', 'sip_ip']
	);
	if(window.enableGroupCdrByIpGroups) {
		arCdrGroupBy.push(
			[_CdrGroupBy_ipGroup, arLang.LcdrGroupBy_ipGroup, 'cb_ip_groups_id', 'cb_ip_groups_descr']);
	}
	arCdrGroupBy.push(
		[_CdrGroupBy_ua, arLang.LcdrGroupBy_ua, 'ua_id', 'ua']
	);
	if(window.existsCdrCountryCode) {
		arCdrGroupBy.push(
			[_CdrGroupBy_country_number, arLang.LcdrGroupBy_country_number, 'country_code', 'country', 'number'],
			[_CdrGroupBy_country_caller, arLang.LcdrGroupBy_country_caller, 'country_code', 'country', 'caller'],
			[_CdrGroupBy_country_called, arLang.LcdrGroupBy_country_called, 'country_code', 'country', 'called'],
			[_CdrGroupBy_country_sipip, arLang.LcdrGroupBy_country_sip, 'country_code', 'country', 'sipip'],
			[_CdrGroupBy_country_sipcallerip, arLang.LcdrGroupBy_sipcallerip, 'country_code', 'country', 'sipcallerip'],
			[_CdrGroupBy_country_sipcalledip, arLang.LcdrGroupBy_sipcalledip, 'country_code', 'country', 'sipcalledip']);
	}
	arMessageGroupBy.push(
		[_MessageGroupBy_sipResponse, arLang.LmessageGroupBy_sipResponse, 'lastSIPresponse'],
		[_MessageGroupBy_sipIP, arLang.LmessageGroupBy_sipIP, 'sipip', 'sip_ip'],
		[_MessageGroupBy_ipGroup, arLang.LmessageGroupBy_ipGroup, 'cb_ip_groups_id', 'cb_ip_groups_descr']
	);
	if(window.existsCdrCountryCode) {
		arMessageGroupBy.push(
			[_MessageGroupBy_country_number, arLang.LmessageGroupBy_country_number, 'country_code', 'country', 'number'],
			[_MessageGroupBy_country_caller, arLang.LmessageGroupBy_country_caller, 'country_code', 'country', 'caller'],
			[_MessageGroupBy_country_called, arLang.LmessageGroupBy_country_called, 'country_code', 'country', 'called'],
			[_MessageGroupBy_country_sipip, arLang.LmessageGroupBy_country_sip, 'country_code', 'country', 'sipip'],
			[_MessageGroupBy_country_sipcallerip, arLang.LmessageGroupBy_sipcallerip, 'country_code', 'country', 'sipcallerip'],
			[_MessageGroupBy_country_sipcalledip, arLang.LmessageGroupBy_sipcalledip, 'country_code', 'country', 'sipcalledip']);
	}
	var lastNameSeries = null;
	for(var i = 0; i < arCdrChart_chartSeriesTypes.length; i++) {
		if(arCdrChart_chartSeriesTypes[i][1]) {
			lastNameSeries = arCdrChart_chartSeriesTypes[i][1];
		}
		arCdrChart_chartSeriesTypes[i].splice(3, 0, lastNameSeries + (arCdrChart_chartSeriesTypes[i][2] ? ' - ' + arCdrChart_chartSeriesTypes[i][2] : ''));
	}
	lastNameSeries = null;
	for(var i = 0; i < arMessagesChart_chartSeriesTypes.length; i++) {
		if(arMessagesChart_chartSeriesTypes[i][1]) {
			lastNameSeries = arMessagesChart_chartSeriesTypes[i][1];
		}
		arMessagesChart_chartSeriesTypes[i].splice(3, 0, lastNameSeries + (arMessagesChart_chartSeriesTypes[i][2] ? ' - ' + arMessagesChart_chartSeriesTypes[i][2] : ''));
	}
	lastNameSeries = null;
	for(var i = 0; i < arSipMsgChart_chartSeriesTypes.length; i++) {
		if(arSipMsgChart_chartSeriesTypes[i][1]) {
			lastNameSeries = arSipMsgChart_chartSeriesTypes[i][1];
		}
		arSipMsgChart_chartSeriesTypes[i].splice(3, 0, lastNameSeries + (arSipMsgChart_chartSeriesTypes[i][2] ? ' - ' + arSipMsgChart_chartSeriesTypes[i][2] : ''));
	}
}

function getTCHS_names() {
	var names = {};
	for(var i = 0; i < arCdrChart_chartSeriesTypes.length; i++) {
		if(!Ext.isDefined(names[arCdrChart_chartSeriesTypes[i][0]])) {
			names[arCdrChart_chartSeriesTypes[i][0]] = arCdrChart_chartSeriesTypes[i][3];
		}
	}
	for(var i = 0; i < arMessagesChart_chartSeriesTypes.length; i++) {
		if(!Ext.isDefined(names[arMessagesChart_chartSeriesTypes[i][0]])) {
			names[arMessagesChart_chartSeriesTypes[i][0]] = arMessagesChart_chartSeriesTypes[i][3];
		}
	}
	return(names);
}
