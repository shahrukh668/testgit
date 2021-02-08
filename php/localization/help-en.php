		<!-- CDR !-->
		<div id="CDR-details">
			<h2>CDR</h2>
			<p>CDR = Call Detail Record. Here are all saved calls. </p>


			<p><b>Columns:</b></p>
			<p>
			<b>ID:</b> Unique autoincrement identification of call. It is created on SQL INSERT.<br>
			<b>Datetime:</b> Start of a call.<br>
			<b>Duration:</b> Total length of a call from start to end. <br>
			<b>Codec:</b> Audio codec used in a call. <br>
			<b>Caller num/name:</b> Caller number and name from SIP header From:<br>
			<b>SIP source IP:</b> Source IP address of SIP packet.<br>
			<b>SIP agent</b> – Agent string from SIP header User-Agent:<br>
			<b>Last response</b> – Last SIP response, number and full text description.<br>
			<b>Caller/Called src RTP</b> – source IP address of incoming RTP packets from caller or called<br>
			<b>MOS</b> – <a target="_blank" href="http://en.wikipedia.org/wiki/Mean_opinion_score">Mean Opinion Score.</a> There are three MOS score. Fixed 50|Fixed 200|Adaptive 500.<br><u>Fixed 50</u>: Simulated jitterbuffer for devices with almost no jitterbuffer (max 50ms).<br><u>Fixed 200</u>: Simulated jitterbuffer for devices with 200ms fixed jitterbuffer<br><u>Adaptive 500</u>: Simulated jitterbuffer for devices with adaptive 500ms jitterbuffer<br>
			<b>Delay distribution</b> - show variable delays delimited by ':'. First number is number of delays between 50-70ms, second is between 70-90, next is 90-120, 120-150, 150-200, 200-300, 300-more. <br>
			<b>Loss distribution</b> - show loss packets distribution delimited by ':'. First number counts loss of one isolated packet. Second is two consecutive lost packets, next is 3,4,5,6,7,8,9 and 10-infinit lost packets<br>
			<b>Commands:</b> - If pcap file exists, you can download it by clicking on PCAP link. If WAV creation is possible, you can download it by clicking on WAV link. If you have flash player installed, you can play CDR by clicking on play button.<br>
			</p>
		</div>

		<!-- CDRSimple !-->
		<div id="CDRSimple-details">
			<h2>CDR</h2>
			<p>CDR = Call Detail Record. Here are all saved calls. </p>


			<p><b>Columns:</b></p>
			<p>
			<b>ID:</b> Unique autoincrement identification of call. It is created on SQL INSERT.<br>
			<b>Datetime:</b> Start of a call.<br>
			<b>Duration:</b> Total length of a call from start to end. <br>
			<b>Codec:</b> Audio codec used in a call. <br>
			<b>Caller/Called number:</b> Caller/Called number<br>
			<b>Last response</b> – Last SIP response, number and full text description.<br>
			<b>Commands:</b> - If WAV creation is possible, you can download it by clicking on WAV link. If you have flash player installed, you can play CDR by clicking on play button.<br>
			</p>
		</div>

		<!-- Users -->
		<div id="user_admin-details">
		<h2>Users</h2>
		<p>User management. Admin users can modify/create users. </p>
		</div>

		<!-- SPY -->
		<div id="SPY-details">
		<h2>SPY</h2>
		<p>Real-time monitoring of ongoing calls. This feature is still in beta and requires the latest <?PHP global $APP_NAME; echo $APP_NAME; $lapp_name = strtolower($APP_NAME); ?> enabled TCP manager port. </p>
		</div>

		<!-- Filters -->
		<div id="filters-details">
		<h2>Filters</h2>
		<p>You can define IP or Tel.number rules to enabling/disabling recording SIP, RTP and GRAPH. </p>
		</div>

		<!-- Filters -> Filter by IP -->
		<div id="filter_ip-details">
		<h2>Filter by id</h2>
		<p>Here you can define IP addresses or networks to define what to record.</p>
		</div>

		<!-- Filters -> Filter by Tel.numbers -->
		<div id="filter_num-details">
		<h2>Filter by Tel.numbers</h2>
		<p>Here you can define Tel.number prefixes to define what to record.</p>
		</div>

		<!-- Alerts & reports -->
		<div id="alerts_daily_reports-details">
		<h2>Alerts and reports</h2>
		<p>Here you can define alert rules which will send email based on watched IP ranges or tel. prefixes and variouse criteria. Email alerts section are alerts which is sended immediately after criteria matches. Daily email reports generates email once per day based on filter criteria. Report generator simply generates the same report as you can see in emails - this is where you can start to build your own rules. <br><br> <b>CRON configuration</b><br>/etc/cron.d/<?PHP echo $lapp_name ?><br><br>01 0    * * *   root    php /var/www/<?PHP echo $lapp_name?>/php/run.php reports -r <?PHP echo $lapp_name?>@example.com -s
<br><br>*/1 *   * * *   root    php /var/www/<?PHP echo $lapp_name?>/php/run.php alerts -r <?PHP echo $lapp_name?>@example.com -s </p>
		</div>

		<!-- Alerts & reports -->
		<div id="codebooks-details">
		<h2>Groups</h2>
		<p>Here you can define group of IP addresses, tel. numbers and email groups. Those groups can be assigned in variouse places.</p>
		</div>

		<!-- Alerts & reports -->
		<div id="tools-details">
		<h2>Tools</h2>
		<p>MTR is WEB interface for traceroute tool mtr. You have to install mtr in your system (apt-get install mtr | yum install mtr) </p>
		</div>



