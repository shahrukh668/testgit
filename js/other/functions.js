function debug_log(param) {
	if(window.debug && console && console.log && Ext.isFunction(console.log))
		console.log(param);
	return(param);
}

function debug_backtrace() {
	if(window.debug && console && console.log && Ext.isFunction(console.log)) {
		try {
			x = null;
			x.foo();
		}
		catch(e) {
			console.log(e.stack);
		}
	}
}

function showDebugData(data) {
	if(window.debug && console && console.log && Ext.isFunction(console.log)) {
		for(var i = 0; i < data.length; i++) {
			switch(data[i].type) {
			case 'log':
			case 'info':
			case 'warning':
			case 'error':
				var consoleFceName = data[i].type;
				switch(data[i].type) {
				case 'warning':
					consoleFceName = 'warn';
				}
				if(data[i].param2 || data[i].param3) {
					console[consoleFceName](data[i].param2 || data[i].param3, data[i].data);
				} else {
					console[consoleFceName](data[i].data);
				}
				break;
			case 'table':
				if(data[i].param2 || data[i].param3) {
					console.log(data[i].param2 || data[i].param3);
				}
				console.table(data[i].data);
				break;
			case 'group':
				if(data[i].param2) {
					console.groupCollapsed(data[i].data);
				} else {
					console.group(data[i].data);
				}
				break;
			case 'group_end':
				console.groupEnd();
				break;
			}
		}
	}
}

function getDebugLogForLoadId(loadId) {
	if(window.debug) {
		ajaxSafeRequest({
			url: 'php/model/utilities.php',
			params: {
				task: 'getDebugLogForLoadId',
				params: Ext.encode({
					load_id: loadId
				})
			}
		});
	}
}

function alert_stack() {
	try {
		x = null;
		x.foo();
	}
	catch(e) {
		alert(e.stack);
	}
}

function getDataArrayIndex(data, findItem, findIndex) {
	if(!Ext.isDefined(findIndex))
		findIndex=0;
	for(var i=0;i<data.length;i++)
		if((Ext.isArray(data[i])||Ext.isObject(data[i])) &&  Ext.isDefined(data[i][findIndex])&&
		   data[i][findIndex]==findItem)
			return(i);
	return(null);
}

function getRecordItem(field, recordStruct) {
	if(recordStruct)
		var indexData = getDataArrayIndex(recordStruct, field, 'name');
		if(indexData!==null) {
			return(recordStruct[indexData]);
		}
	return(null);
}

function getDataArrayItem(data, findItem, findIndex, rsltIndex) {
	if(!Ext.isDefined(findIndex))
		findIndex=0;
	if(!Ext.isDefined(rsltIndex))
		rsltIndex=1;
	for(var i=0;i<data.length;i++)
		if((Ext.isArray(data[i])||Ext.isObject(data[i])) &&  Ext.isDefined(data[i][findIndex])&&
		   data[i][findIndex]==findItem &&  Ext.isDefined(data[i][rsltIndex]))
		return(data[i][rsltIndex]);
	return(null);
}

function dateTimeStringToDate(dateTimeString) {
	var regRslt = /([0-9]{1,4})-([0-1]?[0-9])-([0-3]?[0-9])[T ]?([0-2]?[0-9])?:?([0-5]?[0-9])?:?([0-5]?[0-9])?/.exec(dateTimeString);
	var dateTime = regRslt&&regRslt.length>=3 ?
		new Date(regRslt[1],regRslt[2]-1,regRslt[3],regRslt[4]||0,regRslt[5]||0,regRslt[6]||0) :
		null;
	if(dateTime && dateTimeString.match(/^([0-9]{1,4})-([0-1]?[0-9])-([0-3]?[0-9])$/)) {
		dateTime.timeDefined = false;
	}
	return(dateTime);
}

function timeStringToTime(timeString) {
	var regRslt = /([0-2]?[0-9]):?([0-5]?[0-9])?:?([0-5]?[0-9])?/.exec(timeString);
	return regRslt&&regRslt.length>=1 ?
		new Date(0,0,0,regRslt[1],regRslt[2]||0,regRslt[3]||0) :
		null;
}

function date(dateTime, enableNull) {
	if((!Ext.isDefined(dateTime) || dateTime===null) && !enableNull)
		dateTime = new Date;
	else if(Ext.isNumber(dateTime))
		dateTime = new Date(dateTime*1000);
	else if(Ext.isString(dateTime))
		dateTime = dateTimeStringToDate(dateTime);
	return dateTime ?
		new Date(dateTime.getFullYear(),dateTime.getMonth(),dateTime.getDate()) :
		null;
}

function date_next(dateTime) {
	var _date = date(dateTime);
	return(date((_date.getTime() + 36*60*60*1000) / 1000));
}

function date_prev(dateTime) {
	var _date = date(dateTime);
	return(date((_date.getTime() - 12*60*60*1000) / 1000));
}

function time(time) {
	if(Ext.isNumber(time))
		time = new Date(time*1000);
	else if(Ext.isString(time))
		time = timeStringToTime(time);
	else if(Ext.isDate(time))
		time=new Date(0,0,0,time.getHours(),time.getMinutes(),time.getSeconds())
	return time;
}

function time_sec(_time) {
	if(!_time) {
		return(null);
	}
	_time=time(_time);
	return _time.getHours()*3600+_time.getMinutes()*60+_time.getSeconds();
}

function dateTime(dateTime, enableNull) {
	if((!Ext.isDefined(dateTime) || dateTime===null) && !enableNull)
		dateTime = new Date;
	if(Ext.isNumber(dateTime))
		dateTime = new Date(dateTime*1000);
	else if(Ext.isString(dateTime))
		dateTime = dateTimeStringToDate(dateTime);
	return dateTime;
}

function dateTimeM(inputDateTime, enableNull) {
	inputDateTime = dateTime(inputDateTime, enableNull);
	return new Date(parseInt(inputDateTime.getTime() / (60*1000)) * 60*1000);
}

function completeDateTime(date, time) {
	return(new Date(date ? date.getFullYear() : 0,
			date ? date.getMonth() : 0,
			date ? date.getDate() : 0,
			time ? time.getHours() : 0,
			time ? time.getMinutes() : 0,
			time ? time.getSeconds() : 0));
}

function incHour(dateTime, inc) {
	dateTime.setTime(dateTime.getTime() + inc * 60 * 60 * 1000);
	return(dateTime);
}

function decHour(dateTime, dec) {
	dateTime.setTime(dateTime.getTime() - dec * 60 * 60 * 1000);
	return(dateTime);
}

function incDay(dateTime, inc) {
	for(var i = 0; i < Math.abs(inc); i++) {
		dateTime = _incDay(dateTime, inc > 0);
	}
	return(dateTime);
}

function decDay(dateTime, dec) {
	return(incDay(dateTime, -dec));
}

function _incDay(dateTime, inc) {
	var _date = date(dateTime);
	var _time = time(dateTime);
	if(inc) {
		_date = date_next(_date);
	} else {
		_date = date_prev(_date);
	}
	return(completeDateTime(_date, _time));
}



function incMonth(dateTime, inc) {
	var day = dateTime.getDate();
	for(var i = 0; i < Math.abs(inc); i++) {
		dateTime = _incMonth(dateTime, inc > 0, day);
	}
	return(dateTime);
}

function decMonth(dateTime, dec) {
	return(incMonth(dateTime, -dec));
}

function _incMonth(dateTime, inc, day) {
	if(!day) {
		day = dateTime.getDate();
	}
	month = dateTime.getMonth() + 1;
	var nextMonth = inc ? 
			 (month == 12 ? 1 : month + 1) :
			 (month == 1 ? 12 : month - 1);
	var timestamp_nextMonth = 0;
	while(true) {
		dateTime = incDay(dateTime, inc ? 1 : -1);
		if(dateTime.getMonth() + 1 == nextMonth) {
			timestamp_nextMonth = dateTime.getTime() / 1000;
			if(inc ? 
			    (dateTime.getDate() >= day) : 
			    (dateTime.getDate() <= day)) {
				break;
			}
		} else if(timestamp_nextMonth) {
			dateTime.setTime(timestamp_nextMonth * 1000);
			break;
		}
	}
	return(dateTime);
}

function formatTime(timeS) {
	if(!Ext.isDefined(timeS)) {
		return('');
	}
	return(Ext.Date.format(new Date(new Date(0,0,0,0,0,0).getTime() + timeS*1000), __format_Time));
}

function formatTimeHMSfromS(timeS, roundS, fix) {
	var rslt = '';
	var hours = parseInt(timeS / 3600);
	if(fix || hours) {
		if(fix && hours < 10) {
			rslt += '0';
		}
		rslt += hours + (fix ? '' : 'h');
	}
	var minutes = parseInt(timeS / 60) % 60;
	if(fix || minutes) {
		if(rslt) {
			rslt += ':';
		}
		if(fix && minutes < 10) {
			rslt += '0';
		}
		rslt += minutes + (fix ? '' : 'm');
	}
	var seconds = timeS % 60;
	if(fix || seconds) {
		if(rslt) {
			rslt += ':';
		}
		if(fix && seconds < 10) {
			rslt += '0';
		}
		rslt += (fix ?
			  formatNumber(seconds, roundS || 0) :
			  roundNumber(seconds, roundS || 0)) + (fix ? '' : 's');
	}
	return(rslt || '0');
}

function cmpDate(date1, date2) {
	if(Ext.isEmpty(date1) && Ext.isEmpty(date2)) {
		return(false);
	} else if(date1 && date1.getTime && date2 && date2.getTime) {
		return(date1.getTime() - date2.getTime());
	} else {
		return(true);
	}
}

function eqDate(date1, date2, strict) {
	return(!cmpDate(date1, date2) &&
	       (!strict || date1.timeDefined == date2.timeDefined));
}

function roundNumber(num,dec) {
	if(!Ext.isDefined(dec)) {
		dec=0;
	}
	return(Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec));
}

function roundNumberLeft(num,left) {
	return(roundNumber(num, -(Math.round(Math.log(num)/Math.LN10 + 1) - left)));
}

function trimTimeFormatString(time, time2) {
	return(Ext.Date.format(time, 
			       !time_sec(time) && (!time2 || !time_sec(time2)) ? 
				  __format_Date :
			       !time.getSeconds() && (!time2 || !time2.getSeconds()) ? 
				  __format_DateTimeM : 
				  __format_DateTime));
}

function formatNumber(num, dec, decPoint, thousandSeparator) {
	if(!Ext.isNumber(num))
		num = Number(num);
	negative = false;
	if(num < 0) {
		num = -num;
		negative = true;
	}
	var snum = String(num.toFixed(Ext.isDefined(dec)?dec:0));
	if(decPoint||thousandSeparator) {
		var lengthDec = 0;
		for(lengthDec = 0; lengthDec < snum.length&&snum.charAt(lengthDec) != '.'; lengthDec++);
			snumRslt='';
		dec = false;
		for(var i = 0; i < snum.length; i++) {
			var mchar = snum.charAt(i);
			if(mchar == '.') {
				snumRslt += decPoint ? decPoint : '.';
				dec = true;
			} else {
				snumRslt += mchar;
				if(thousandSeparator && !dec && i < lengthDec - 1 && (lengthDec % 3 - i - 1) % 3 == 0) {
					snumRslt += thousandSeparator;
				}
			}
		}
	} else {
		snumRslt = snum;
	}
	return (negative ? '-' : '') + snumRslt;
}

function formatFilesize(fileSize, 
			unitSuffix, disableHtml, decDiv,
			decPoint, thousandSeparator, zero) {
	var units = [ 'B', 'kB', 'MB', 'GB', 'TB', 'PB' ];
	var limitValue = 1024;
	if(!fileSize) {
		fileSize = zero || '';
		var unit = '';
	} else {
		var indexUnits = 0;
		while(fileSize >= limitValue && indexUnits < units.length - 1) {
			fileSize /= (decDiv ? 1000 : 1024);
			++indexUnits;
		}
		var dec = 0;
		if(indexUnits) {
			if(fileSize < 10) {
				dec = 2;
			} else if(fileSize < 100) {
				dec = 1;
			}
		}
		dec = trimDec(fileSize, dec);
		thousandSeparator = Ext.isDefined(thousandSeparator) ? 
					thousandSeparator : 
					(disableHtml ? ' ' : '&thinsp;');
		fileSize = formatNumber(fileSize, dec, decPoint, thousandSeparator);
		var unit = units[indexUnits];
	}
	return(
		fileSize + 
		(disableHtml ?
			(fileSize === '' ? '' : ' ' + unit + (unitSuffix||'')) :
			'<span style="margin-left: 3px; width: 15px; display: inline-block; text-align: left;">' + 
				unit + (unitSuffix||'') +
			'</span>'));
}

function formatTraffic(traffic, direction,
		       unitSuffix, disableHtml, decDiv, bitsConvert,
		       decPoint, thousandSeparator, zero) {
	var units = bitsConvert ?
			[ 'b', 'kb', 'Mb', 'Gb', 'Tb', 'Pb' ] :
			[ 'B', 'kB', 'MB', 'GB', 'TB', 'PB' ];
	if(bitsConvert) {
		traffic *= 8;
	}
	var limitValue = 1024;
	if(!traffic) {
		traffic = zero || '';
		var unit = '';
	} else {
		var indexUnits = 0;
		while(traffic >= limitValue && indexUnits < units.length - 1) {
			traffic /= (decDiv ? 1000 : 1024);
			++indexUnits;
		}
		var dec = 0;
		if(indexUnits) {
			if(traffic < 10) {
				dec = 2;
			} else if(traffic < 100) {
				dec = 1;
			}
		}
		dec = trimDec(traffic, dec);
		thousandSeparator = Ext.isDefined(thousandSeparator) ? 
					thousandSeparator : 
					(disableHtml ? ' ' : '&thinsp;');
		traffic = formatNumber(traffic, dec, decPoint, thousandSeparator);
		var unit = units[indexUnits];
	}
	return(
		traffic + 
		(disableHtml ?
			(traffic === '' ? '' : ' ' + unit + (unitSuffix||'')) :
			'<span style="margin-left: 3px; width: 15px; display: inline-block; text-align: left;">' + 
				unit + (unitSuffix||'') +
			'</span>') +
		(direction ? 
			'<span style="margin-left: 3px; width: 19px; display: inline-block">' + 
				(traffic ?
					'<img src="images/icon/tr_' + (direction == 'in' ? 'download' : 'upload') + '.png">' : 
					'') + 
			'</span>' :
			''));
}

function formatPackets(packets, direction,
		       unitSuffix, disableHtml,
		       decPoint, thousandSeparator, zero) {
	var units = [ 'p', 'kp', 'Mp', 'Gp', 'Tp', 'Pp' ]
	limitValue = 1000*1000;
	if(!packets) {
		packets = zero || '';
		var unit = '';
	} else {
		var indexUnits = 0;
		while(packets >= limitValue && indexUnits < units.length - 1) {
			packets /= 1000;
			++indexUnits;
		}
		thousandSeparator = Ext.isDefined(thousandSeparator) ? 
					thousandSeparator : 
					(disableHtml ? ' ' : '&thinsp;');
		packets = formatNumber(packets, 0, decPoint, thousandSeparator);
		var unit = units[indexUnits];
	}
	return(
		packets + 
		(disableHtml ?
			(packets === '' ? '' : ' ' + unit + (unitSuffix||'')) :
			'<span style="margin-left: 3px; width: 15px; display: inline-block; text-align: left;">' + 
				unit + (unitSuffix||'') +
			'</span>'));
}

function trimDec(number, dec) {
	while(dec) {
		if(Math.round(number * Math.pow(10, dec -1)) * 10 == 
			Math.round(number * Math.pow(10, dec))) {
			--dec;
		} else {
			break;
		}
	}
	return(dec);
}

String.prototype.removeTags = function() {
	return(this.replace(/<.*?>/g,''));
}

String.prototype.replaceall = function(find, repl, flags) {
	if(!this||!this.indexOf||!this.replace)
		return(null);
	var rslt = this.toString();
	while(rslt.indexOf(find) >= 0)
		rslt=rslt.replace(find,repl,flags||'');
	return(rslt);
}

String.prototype.lpad = function(length, charPad) {
	var padStr = this;
	while(padStr.length<length) {
		padStr=(charPad||' ')+padStr;
	}
	return(String(padStr));
}

String.prototype.trunc = function(length, suffix) { 
	return(this.substr(0, length) + (this.length > length ? (suffix||'...') : ''));
}

String.prototype.trimch = function(trimChar) { 
	var trimStr = this;
	while(trimStr.length && 
	      (Ext.isArray(trimChar) ? 
			trimChar.isIn(trimStr[0]) :
			trimStr[0] == trimChar)) {
		trimStr = trimStr.substr(1);
	}
	while(trimStr.length && 
	      (Ext.isArray(trimChar) ? 
			trimChar.isIn(trimStr[trimStr.length - 1]) :
			trimStr[trimStr.length - 1] == trimChar)) {
		trimStr = trimStr.substr(0, trimStr.length - 1);
	}
	return(String(trimStr));
}

String.prototype.eexplode = function(separators, trim, checkFunction, checkFunctionScope) { 
	var split;
	if(Ext.isArray(separators)) {
		split = [ this ];
		for(var i = 0; i < separators.length; i++) {
			var split_new = [];
			for(var j = 0; j < split.length; j++) {
				split_new = split_new.concat(split[j].split(separators[i]));
			}
			split = split_new;
		}
	} else {
		split = this.split(separators);
	}
	var split_new = [];
	for(var i = 0; i < split.length; i++) {
		var item = split[i];
		if(trim) {
			item = item.trim();
			if(item === '') {
				continue;
			}
		}
		if(checkFunction) {
			item = checkFunction.call(checkFunctionScope, item);
			if(item === '' || item === null) {
				continue;
			}
		}
		split_new.push(item);
	}
	return(split_new);
}

Array.prototype.isIn = function(item, enableTypeConvert) {
	if(Ext.isArray(item)) {
		for(var i=0;i<item.length;i++) {
			if(this.isIn(item[i])) {
				return(true);
			}
		}
		return(false);
	} else {
		if(enableTypeConvert) {
			for(var i = 0; i < this.length; i++) {
				if(this[i] == item) {
					return(true);
				}
			}
			return(false);
		} else {
			return(this.indexOf(item)>=0);
		}
	}
}

String.prototype.isIn = function(item, separator) {
	if(this.split) {
		var array = this.split(separator || ',');
		if(array && array.length) {
			return(array.isIn(item, true));
		}
	}
	return(false);
}

Ext.Component.prototype.enableIf = function(enable) {
	if(enable)
		this.enable();
	else
		this.disable();
}

Ext.Component.prototype.showIf = function(show) {
	if(show)
		this.show();
	else
		this.hide();
}

Ext.Component.prototype.deferShowIf = function(show, deferTime, deferFunction) {
	if(this._timeoutId_deferShowIf) {
		clearInterval(this._timeoutId_deferShowIf);
	}
	var me = this;
	this._timeoutId_deferShowIf = setTimeout(function() {
			if(show ? !me.isVisible() : me.isVisible()) {
				me.showIf(show);
				if(deferFunction) {
					deferFunction();
				}
			}
		}, deferTime || 100);
}

Ext.Component.prototype.allowBlankIf = function(allowBlank) {
	this.allowBlank = allowBlank;
	if(allowBlank && this.clearInvalid) {
		this.clearInvalid();
	}
}

Ext.Component.prototype.getItem = function(item,findViaProp,viaCascade,withMenu) {
	if(viaCascade) {
		var rsltItem = null;
		this.cascade(
			function(testItem) {
				if(!rsltItem) {
					if(testItem[findViaProp||'name']==item)
						rsltItem = testItem;
					else if((withMenu || viaCascade=='withMenu')&&testItem.menu)
						rsltItem = getItem(item,testItem.menu,findViaProp,viaCascade,withMenu);
				}
			});
	} else {
		var rsltItem = this.find(findViaProp||'name',item);
		if(rsltItem && rsltItem.length)
			rsltItem = rsltItem[0];
		else
			rsltItem = null;
	}
	return rsltItem;
}

Ext.Component.prototype.getItems = function(item,findViaProp,viaCascade,withMenu) {
	if(viaCascade) {
		var rsltItems = [];
		this.cascade(
			function(testItem) {
				if(testItem[findViaProp||'name']==item)
					rsltItems.push(testItem);
				else if((withMenu || viaCascade=='withMenu')&&testItem.menu) {
					var subRslt = getItem(item,testItem.menu,findViaProp,viaCascade,withMenu);
					if(subRslt && subRslt.length) {
						rsltItems = rsltItems.concat(subRslt);
					}
				}
			});
	} else {
		var rsltItems = this.find(findViaProp||'name',item);
	}
	return rsltItems;
}

Ext.Component.prototype.findFormPanel = function() {
	var owner = this.ownerCt;
	while(owner) {
		if(owner instanceof Ext.FormPanel) {
			return(owner);
		}
		owner = owner.ownerCt;
	}
	return(null);
}

Ext.Component.prototype.findWindow = function() {
	var owner = this.ownerCt;
	while(owner) {
		if(owner instanceof Ext.Window) {
			return(owner);
		}
		owner = owner.ownerCt;
	}
	return(null);
}

function findForm(field)
 { var owner = field.ownerCt;
   while(owner)
    { if(owner instanceof cForm)
       return(owner);
      owner=owner.ownerCt;
    }
   return(null);
 }

function onGridStoreException(proxy, response, operation) {
	if(proxy._request && proxy._request._aborted) {
		return;
	}
	if(response && response.responseText) {
		var responseData = Ext.decode(response.responseText);
		if(responseData && !responseData.success && responseData.error) {
			if(responseData.error.type=='no_session') {
				reLogin( {
					fce: function(params) {
						this.load(params)
					},
					scope: this,
					params: response.request && response.request.options &&
						[ response.request.options.params ]
				} );
			} else if(responseData.error.type=='kill_session') {
				window.kill_session = true;
				window.onbeforeunload_disable = true;
				window.location = "./";
			} else if(Ext.isString(responseData.error)) {
				Ext.Msg.alert(findLangSd('grid', 'serverSideError'),
					      responseData.error);
			}
		}
	} else {
		if(response.timedout) {
			if(proxy._request && proxy._request.timestampId && 
			   user_can_show_sql_query()) {
				ajaxSafeRequest({
					scope: this,
					url: 'php/model/utilities.php',
					params: {
						task: 'getQueryMysqlTask',
						params: Ext.encode({
							timestampId: proxy._request.timestampId
						})
					},
					success: function(result) {
						if(result.query) {
							Ext.Msg.longalert(findLangSd('grid', 'storeTimeoutHeader'),
									  findLangSd('grid', 'storeTimeoutText').template([Math.round(((new Date).getTime() - proxy._request.timestampId)/1000)]) + 
									  '<br><br>' + 
									  (Ext.isString(result.query) ?
									    result.query.replaceall('\n', '<br>') :
									    'NA'),
									  null, null, true);
						} else {
							Ext.Msg.longalert(findLangSd('grid', 'storeTimeoutHeader'),
									  findLangSd('grid', 'storeTimeoutWithoutQueryText').template([Math.round(((new Date).getTime() - proxy._request.timestampId)/1000)]));
						}
					}
				});
			} else {
				Ext.Msg.alert(findLangSd('grid', 'storeTimeoutHeader'),
					      findLangSd('grid', 'storeTimeoutSimpleText'));
			}
		} else {
			Ext.Msg.alert(findLangSd('grid', 'serverSideError'),
				      response && response.statusText || findLangSd('grid', 'errorIsNotSpecified'));
		}
		abortLoadResponse(response);
	}
}

function getStringStoreException(proxy, response, operation) {
	if(proxy._request && proxy._request._aborted) {
		return("");
	}
	if(response && response.responseText) {
		var responseData = Ext.decode(response.responseText);
		if(responseData && !responseData.success && responseData.error) {
			return(findLangSd('grid', 'serverSideError') + ' - ' + 
			       responseData.error);
		}
	} else {
		if(response.timedout) {
			return(findLangSd('grid', 'storeTimeoutHeader') + ' - ' + 
			       findLangSd('grid', 'storeTimeoutSimpleText'));
		} else {
			return(findLangSd('grid', 'serverSideError') + ' - ' +
			       (response && response.statusText || findLangSd('grid', 'errorIsNotSpecified')));
		}
		abortLoadResponse(response);
	}
}

function abortLoadStore(store) {
	if(store && store.proxy && 
	   store.proxy._request && store.proxy._request.xhr) {
		if(store.proxy._request.xhr.abort) {
			store.proxy._request._aborted = true;
			store.proxy._request.xhr.abort();
		}
		if(store.proxy._request.timestampId) {
			abortLoad(store.proxy._request.timestampId);
		}
	}
}

function abortLoadResponse(response) {
	if(response.request && response.request.timestampId) {
		abortLoad(response.request.timestampId);
	}
}

function abortRequest(request, timestampId) {
	if(!request || request._aborted) {
		return;
	}
	if(request.timestampId) {
		timestampId = request.timestampId;
	}
	request._aborted = true;
	if(request.xhr && request.xhr.abort) {
		request.xhr.abort();
	}
	if(timestampId) {
		abortLoad(timestampId);
	}
}

function loadStoreIsAborted(store) {
	return(store.proxy && store.proxy._request && store.proxy._request._aborted);
}

function loadStoreIsTimedout(store) {
	return(store.proxy && store.proxy._request && store.proxy._request.timedout);
}

function loadStoreIsCancel(store) {
	 return(loadStoreIsAborted(store) || loadStoreIsTimedout(store));
}

function abortLoad(timestampId) {
	if(timestampId) {
		ajaxSafeRequest({
			scope: this,
			url: 'php/model/utilities.php',
			params: {
				task: 'killMysqlTask',
				params: Ext.encode({
					timestampId: timestampId
				})
			}
		});
	}
}

function showQuery(timestampId) {
	if(timestampId.proxy) {
		timestampId = timestampId.proxy._request.timestampId;
	}
	if(timestampId) {
		ajaxSafeRequest({
			scope: this,
			url: 'php/model/utilities.php',
			params: {
				task: 'getQueryMysqlTask',
				params: Ext.encode({
					timestampId: timestampId
				})
			},
			success: function(result) {
				if(result.query) {
					Ext.Msg.longalert(
						'sql query' + (result.thread ? ' - thread ' + result.thread : ''),
						Ext.isString(result.query) ?
						 result.query.replaceall('\n', '<br>') :
						 'NA',
						null, null, true);
				} else {
					Ext.Msg.alert('', 'no active SQL query');
				}
			}
		});
	}
}

function onAjaxRequestException(response, reloginTask, isLoader) {
	if(response && response.responseText) {
		var responseData = Ext.decode(response.responseText, isLoader);
		if(responseData && !responseData.success &&
		   responseData.error && 
		   (responseData.error.type=='no_session' ||
		    responseData.error.type=='kill_session')) {
			if(responseData.error.type=='no_session') {
				reLogin(reloginTask);
			} else {
				window.kill_session = true;
				window.onbeforeunload_disable = true;
				window.location = "./";
			}
		} else if(isDataEmpty(responseData) && 
			  !reloginTask.disableCheckAccessDenied &&
			  response.responseText == 'access denied') {
			reloginTask.disableCheckAccessDenied = true;
			ajaxSafeRequest({
				url: 'php/model/utilities.php',
				params: {
					task: 'checkSession'
				}},
				reloginTask);
		} else {
			return(true);
		}
	}
	return(false);
}

function repairJsonResult(jsonResult, noDebug) {
	if(jsonResult&&Ext.isString(jsonResult)) {
		var start = 0;
		while(start<jsonResult.length) {
			if(Ext.isIE ?
				jsonResult.charAt(start)=='{'||
				start<jsonResult.length-1&&jsonResult.charAt(start)=='['&&
					(jsonResult.charAt(start+1)=='{'||jsonResult.charAt(start+1)=='[') :
				jsonResult[start]=='{'||
				start<jsonResult.length-1&&jsonResult[start]=='['&&
					(jsonResult[start+1]=='{'||jsonResult[start+1]=='[')) {
				break;
			}
			++start;
		}
		if(start>0) {
			if(window.debug && !noDebug) {
				var extraLeft = jsonResult.substr(0,start);
				if(extraLeft.trim()) {
					debug_log('JSON extra result left: '+extraLeft);
				}
				if(extraLeft.match(/Fatal error/) &&
				   extraLeft.match(/key\.php/) &&
				   (extraLeft.match(/The encoded file/) ||
				    extraLeft.match(/The license file/))) {
					 window.onbeforeunload_disable = true;
					 window.location = "./";
				}
			}
			jsonResult=jsonResult.substr(start);
		}
		var length = jsonResult.length;
		while(length) {
			if(Ext.isIE ?
				jsonResult.charAt(length-1)=='}'||
				length>1&&jsonResult.charAt(length-1)==']'&&
					(jsonResult.charAt(length-2)=='}'||jsonResult.charAt(length-2)==']') :
				jsonResult[length-1]=='}'||
				length>1&&jsonResult[length-1]==']'&&
					(jsonResult[length-2]=='}'||jsonResult[length-2]==']')) {
				break;
			}
			--length;
		}
		if(length<jsonResult.length) {
			if(window.debug && !noDebug) {
				var extraRight = jsonResult.substr(length);
				if(extraRight.trim()) {
					debug_log('JSON extra result right: '+extraRight);
				}
			}
			jsonResult=jsonResult.substr(0,length);
		}
	}
	return(jsonResult);
}

function timeSecondFloor(inputTime) {
	return(new Date(parseInt(inputTime.getTime() / 1000) * 1000));
}

function timeSecondCeil(inputTime) {
	return(new Date(parseInt(inputTime.getTime() / 1000) * 1000 +
			(inputTime.getTime() % 1000 ? 1000 : 0)));
}

function timeMinuteFloor(inputTime) {
	return(new Date(parseInt(inputTime.getTime() / (60*1000)) * (60*1000)));
}

function timeMinuteCeil(inputTime) {
	return(new Date(parseInt(inputTime.getTime() / (60*1000)) * (60*1000) +
			(inputTime.getTime() % (60*1000) ? 60*1000 : 0)));
}

function cloneObject(object, dest, maxDepth, currentDepth) {
	if(currentDepth > 100) {
		return(undefined);
	}
	if(maxDepth === 0) {
		return(undefined);
	}
	if(Ext.isObject(object) || Ext.isArray(object)) {
		var clone = dest || (Ext.isObject(object) ? {} : []);
		for(var item in object) {
			clone[item] = item == 'scope' || item == '_scope' ?
				       object[item] :
				      Ext.isFunction(object[item]) ?
				       object[item] :
				       cloneObject(object[item], null, maxDepth ? maxDepth - 1 : undefined, (currentDepth || 0) + 1);
		}
		return(clone);
	} else {
		return(object);
	}
}

function cloneArray(array, dest) {
	if(Ext.isArray(array)) {
		var clone = dest || []
		for(var item in array) {
			if(item*1 == item) {
				clone.push(Ext.isFunction(array[item]) ?
					    array[item] :
					    cloneObject(array[item]));
			} else {
				clone[item] = Ext.isFunction(array[item]) ?
					       array[item] :
					       cloneObject(array[item]);
			}
		}
		return(clone);
	} else {
		return(array);
	}
}

function cloneDate(date) {
	if(Ext.isDate(date)) {
		var cloneDate = new Date(date.getTime());
		if(Ext.isDefined(date.timeDefined)) {
			cloneDate.timeDefined = date.timeDefined;
		}
		return(cloneDate);
	} else {
		return(date);
	}
}

function clone(src) {
	if(Ext.isObject(src)) {
		return(cloneObject(src));
	} else if(Ext.isArray(src)) {
		return(cloneArray(src));
	} else if(Ext.isDate(src)) {
		return(cloneDate(src));
	} else {
		return(src);
	}
}

function compareObjects(object1, object2, maxDepth) {
	if(maxDepth === 0) {
		return(undefined);
	}
	if(Ext.isObject(object1)) {
		if(!Ext.isObject(object2)) {
			return(false);
		}
		for(var i in object1) {
			if(Ext.isDefined(object1[i]) && !Ext.isDefined(object2[i])) {
				return(false);
			}
			if(!compareObjects(object1[i], object2[i], maxDepth ? maxDepth - 1 : undefined)) {
				return(false);
			}
		}
		for(var i in object2) {
			if(Ext.isDefined(object2[i]) && !Ext.isDefined(object1[i])) {
				return(false);
			}
		}
	} else if(Ext.isArray(object1)) {
		if(!Ext.isArray(object2)) {
			return(false);
		}
		if(object2.length != object1.length) {
			return(false);
		}
		for(var i = 0; i < object1.length; i++) {
			if(Ext.isDefined(object1[i]) && !Ext.isDefined(object2[i])) {
				return(false);
			}
			if(!compareObjects(object1[i], object2[i], maxDepth ? maxDepth - 1 : undefined)) {
				return(false);
			}
		}
	} else if(object1 != object2) {
		return(false);
	}
	return(true);
}

//params: prevInterval, prevIntervalHourTolerance, actTime, forChart, intervalOffset
function getTimeInterval(typeTimeInterval, params) {
	var dateFrom = null;
	var dateTo = null;
	var applicableIntervalOffset = false;
	if(!params) {
		params = {};
	}
	if(!params.actTime) {
		params.actTime = new Date;
	}
	var actTimeIntOff = new Date(params.actTime.getTime());
	if (params.intervalOffset) {
		actTimeIntOff.setTime(params.actTime.getTime() - params.intervalOffset * 1000 * 60);
	} else {
		params.intervalOffset = 0;
	}
	switch(typeTimeInterval) {
	case 'last_15m':
		dateFrom = new Date(params.actTime.getTime() - 15*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'last_hour':
	case 'last_60m':
		dateFrom = new Date(params.actTime.getTime() - 60*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'current_hour':
		dateFrom = new Date(parseInt(params.actTime.getTime() / (60*60*1000)) *60*60*1000);
		if(params.forChart) {
			dateTo = new Date(dateFrom.getTime() + 60*60*1000);
			applicableIntervalOffset = true;
		}
		break;
	case 'last_2h':
		dateFrom = new Date(params.actTime.getTime() - 2*60*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'last_3h':
		dateFrom = new Date(params.actTime.getTime() - 3*60*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'last_8h':
		dateFrom = new Date(params.actTime.getTime() - 8*60*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'last_24h':
		dateFrom = new Date(params.actTime.getTime() - 24*60*60*1000);
		if(params.forChart) {
			dateTo = params.actTime;
			applicableIntervalOffset = true;
		}
		break;
	case 'last_2d':
		dateFrom = date(new Date(params.actTime.getTime() - 2*24*60*60*1000));
		break;
	case 'last_3d':
		dateFrom = date(new Date(params.actTime.getTime() - 3*24*60*60*1000));
		break;
	case 'last_7d':
	case 'last_week':
		dateFrom = date(new Date(params.actTime.getTime() - 7*24*60*60*1000));
		break;
	case 'last_8d':
		dateFrom = date(new Date(params.actTime.getTime() - 8*24*60*60*1000));
		break;
	case 'last_week_time':
		dateFrom = new Date(params.actTime.getTime() - 7*24*60*60*1000);
		break;
	case 'last_30d':
	case 'last_month':
		dateFrom = date(new Date(params.actTime.getTime() - 30*24*60*60*1000));
		break;
	case 'last_month_time':
		dateFrom = new Date(params.actTime.getTime() - 30*24*60*60*1000);
		break;
	case 'last_60d':
		dateFrom = date(new Date(params.actTime.getTime() - 60*24*60*60*1000));
		break;
	case 'last_90d':
		dateFrom = date(new Date(params.actTime.getTime() - 90*24*60*60*1000));
		break;
	case 'this_hour':
		dateFrom = new Date(
			params.actTime.getFullYear(), params.params.actTime.getMonth(), params.actTime.getDate(),
			params.actTime.getHours());
		break;
	case 'today':
		dateFrom = date(params.actTime);
		break;
	case 'yesterday':
		dateFrom = date(new Date(date(params.actTime).getTime() - 12*60*60*1000));
		dateTo = dateFrom;
		dateTo.timeDefined = false;
		break;
	case 'this_week_m':
	case 'this_week_s':
		dateFrom = date(params.actTime);
		while(dateFrom.getDay() != (typeTimeInterval == 'this_week_m' ? 1 : 0 )) {
			dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
		}
		if(params.prevInterval) {
			if(!Ext.isDefined(params.prevIntervalHourTolerance) ||
			   (params.actTime.getTime() - dateFrom.getTime()) / (1000*60*60) < params.prevIntervalHourTolerance) {
				dateTo = dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				for(var i = 0; i < 6; i++) {
					dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				}
			}
		}
		break;
	case 'this_month':
		dateFrom = new Date(
			params.actTime.getFullYear(), params.actTime.getMonth(), 1);
		if(params.prevInterval) {
			if(!Ext.isDefined(params.prevIntervalHourTolerance) ||
			   (params.actTime.getTime() - dateFrom.getTime()) / (1000*60*60) < params.prevIntervalHourTolerance) {
				dateTo = dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				while(dateFrom.getDate() > 1) {
					dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				}
			}
		}
		break;
	case 'prev_month':
		dateFrom = new Date(
			params.actTime.getFullYear(), params.actTime.getMonth(), 1);
		dateFrom = decMonth(dateFrom, 1);
		if(params.prevInterval) {
			if(!Ext.isDefined(params.prevIntervalHourTolerance) ||
			   (params.actTime.getTime() - dateFrom.getTime()) / (1000*60*60) < params.prevIntervalHourTolerance) {
				dateTo = dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				while(dateFrom.getDate() > 1) {
					dateFrom = date(new Date(dateFrom.getTime() - 12*60*60*1000));
				}
			}
		} else {
			dateTo = decDay(incMonth(dateFrom, 1), 1);
		}
		break;
	case 'last_year':
		dateFrom = date(new Date(params.actTime.getTime() - 365*24*60*60*1000));
		break;
	case 'last_year_time':
		dateFrom = new Date(params.actTime.getTime() - 365*24*60*60*1000);
		break;
	}
	if(params.intervalOffset && applicableIntervalOffset) {
		if(dateFrom) {
			dateFrom.setTime(dateFrom.getTime() - params.intervalOffset * 60*1000);
		}
		if(dateTo) {
			dateTo.setTime(dateTo.getTime() - params.intervalOffset * 60*1000);
		}
	}
	return([dateFrom, dateTo, {
		applicableIntervalOffset: applicableIntervalOffset
	}]);
}

function getStdMenuTimeFrom(scope, handler, menu, config) {
	if(!menu) {
		menu = [];
		menu.push({
			text: lang.last + ' 60 ' + lang.minutes,
			_typeTimeFrom: 'last_60m'
		},{
			text: lang.currentHour,
			_typeTimeFrom: 'current_hour'
		},{
			text: lang.last + ' 2 ' + lang.hours,
			_typeTimeFrom: 'last_2h'
		},{
			text: lang.last + ' 3 ' + lang.hours,
			_typeTimeFrom: 'last_3h'
		},{
			text: lang.last + ' 24 ' + lang.hours,
			_typeTimeFrom: 'last_24h'
		},{
			text: lang.today,
			_typeTimeFrom: 'today'
		},{
			text: lang.yesterday,
			_typeTimeFrom: 'yesterday'
		},{
			text: lang.last + ' ' + 2 + ' ' + lang.days,
			_typeTimeFrom: 'last_2d'
		},{
			text: lang.last + ' ' + 3 + ' ' + lang.days,
			_typeTimeFrom: 'last_3d'
		},{
			text: lang.last + ' ' + lang.week,
			_typeTimeFrom: 'last_week'
		},{
			text: lang.last + ' ' + lang.month,
			_typeTimeFrom: 'last_month'
		});
	}
	if(config && config.last_days_minutes) {
		menu.push({ 
			xtype: 'menuseparator'
		});
		function evLastDays(field) {
			if(config.evLast) {
				var days = field.getValue();
				var minutes = Ext.getCmp(field.getEl().up('.x-menu-item-cmp').id).findC('_id', 'last_minutes').getValue();
				config.evLast.call(scope, days, minutes);
			}
		}
		function evLastMinutes(field) {
			if(config.evLast) {
				var days = Ext.getCmp(field.getEl().up('.x-menu-item-cmp').id).findC('_id', 'last_days').getValue();
				var minutes = field.getValue();
				config.evLast.call(scope, days, minutes);
			}
		}
		menu.push({
			xtype: 'container',
			layout: 'hbox',
			items: [
				{xtype: 'displayfield', value: 'Last ', fieldCls: 'x-menu-item-text'},
				{xtype: 'container',
				 layout: 'vbox',
				 items: [
					{xtype: 'container',
					 layout: 'hbox',
					 items: [
						{xtype: 'numberfield', width: 50,
						 _id: 'last_days',
						 minValue: 0, maxValue: 365,
						 fieldStyle: {'text-align': 'right'},
						 listeners: {
							spindown: function(field) {
								var value = field.getValue();
								if(value == 1 || value === null) {
									Ext.defer(function() {
											field.setValue(null);
										}, 1);
								}
							},
							select: function(field) {
								if(!field._disableChangeEvent) {
									evLastDays(field);
								}
							},
							change: function(field) {
								if(!field._disableChangeEvent) {
									evLastDays(field);
								}
							},
							scope: this
						 },
						 tooltip: lang.days},
						{xtype: 'displayfield', value: lang.days, fieldCls: 'x-menu-item-text'}
					 ],
					 style: {
						marginBottom: 1
					 }},
					{xtype: 'container',
					 layout: 'hbox',
					 items: [
						{xtype: 'numberfield', width: 50,
						 _id: 'last_minutes',
						 minValue: 0, maxValue: 24*60,
						 fieldStyle: {'text-align': 'right'},
						 listeners: {
							spindown: function(field) {
								var value = field.getValue();
								if(value == 1 || value === null) {
									Ext.defer(function() {
											field.setValue(null);
										}, 1);
								}
							},
							select: function(field) {
								if(!field._disableChangeEvent) {
									evLastMinutes(field);
								}
							},
							change: function(field) {
								if(!field._disableChangeEvent) {
									evLastMinutes(field);
								}
							},
							scope: this
						 },
						 tooltip: lang.minutes},
						{xtype: 'displayfield', value: lang.minutes, fieldCls: 'x-menu-item-text'}
					 ]}
				]}
			]
		});
	}
	var rsltMenu = {
		items: menu,
		defaults: {
			scope: scope,
			handler: handler
		}
	};
	if(config && config.last_days_minutes && config.getInitLastValues) {
		rsltMenu.listeners = {
			beforeshow: function(menu) {
				var dm = config.getInitLastValues.call(scope);
				var lastDaysField = menu.findC('_id', 'last_days');
				if(lastDaysField) {
					lastDaysField._disableChangeEvent = true;
					lastDaysField.setValue(dm.days || '');
					delete lastDaysField._disableChangeEvent;
				}
				var lastMinutesField = menu.findC('_id', 'last_minutes');
				if(lastMinutesField) {
					lastMinutesField._disableChangeEvent = true;
					lastMinutesField.setValue(dm.minutes || '');
					delete lastMinutesField._disableChangeEvent;
				}
			},
			scope: this
		}
	}
	return(rsltMenu);
}

function getScrollerWidth() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";
	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);
	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) {
		w2 = outer.clientWidth;
	}
	document.body.removeChild(outer);
	return(w1 - w2);
}

function addBackgroundColorRuleToStyleSheet(color, nextClass, ruleSuffix) {
	var color = color && color[0] == '#' ? color.substr(1) : color;
	var ruleName = 'background_color_' + color + (ruleSuffix ? '_' + ruleSuffix : '') +
		       (nextClass == 'important' ? '_important' : '');
	addRuleToStyleSheet('.' + ruleName +
			    (nextClass && nextClass != 'important' ? ' .' + nextClass : ''),
			    'background-color: ' + color +
			    (nextClass == 'important' ? '!important' : ''));
	return(ruleName);
}

function addRuleToStyleSheet(ruleName, ruleBody, styleSheetTitle, cmpOnlyRuleName, replaceRule, disableToLowerCase) {
	if(!Ext.isDefined(styleSheetTitle)) {
		styleSheetTitle = 'other';
	}
	if(!Ext.isDefined(cmpOnlyRuleName)) {
		cmpOnlyRuleName = true;
	}
	var styleSheet = getStyleSheet(styleSheetTitle);
	if(styleSheet) {
		ruleName = ruleName.toLowerCase();
		var rule = ruleName + 
			   (ruleBody ? ' { ' + (disableToLowerCase ? ruleBody : ruleBody.toLowerCase()) + ' }' : null);
		if(Ext.isIE) {
			var ruleNameA = ruleName.split(',');
			for(var i = 0; i < ruleNameA.length; i++) {
				var existRule = false;
				ruleNameA[i] = ruleNameA[i].trim();
				for(var j = 0; j < styleSheet.rules.length; j++) {
					if(styleSheet.rules[j].selectorText == ruleNameA[i] &&
					   (cmpOnlyRuleName ||
					    styleSheet.rules[j].style.cssText == ruleBody)) {
						existRule = true;
						break;
					}
				}
				if(!existRule) {
					styleSheet.addRule(ruleNameA[i], ruleBody);
				}
			}
		} else {
			for(var i = 0; i < styleSheet.cssRules.length; i++) {
				if(cmpOnlyRuleName?
				    styleSheet.cssRules[i].cssText.substr(0,ruleName.length) == ruleName:
				    styleSheet.cssRules[i].cssText == rule) {
					if(replaceRule) {
						styleSheet.deleteRule(i);
					} else {
						return;
					}
				}
			}
			if(ruleBody) {
				styleSheet.insertRule(rule, styleSheet.cssRules.length);
			}
		}
	}
}

function getStyleSheet(styleSheetTitle) {
	for(var i = 0; i < document.styleSheets.length; i++) {
		if(document.styleSheets[i].title == styleSheetTitle) {
			return(document.styleSheets[i]);
		}
	}
}

function getLinkUrlWithTaskParams(url, task, params, newWind) {
	var urlParams = getUrlWithTaskParams(url, task, params);
	return(newWind ?
		'<a href="#" onClick="window.open(\'' + urlParams+ '\');">' :
		'<a href="' + urlParams+ '">');
}

function getUrlWithTaskParams(url, task, params) {
	return(url + '?' +
	       'task=' + task +
	       (params ? '&params=' + encodeURIComponent(Ext.encode(params)) : ''));
}

function isDataEmpty(object) {
	if(!Ext.isDefined(object) || object === null) {
		return(true);
	}
	var empty = true;
	for(var i in object) {
		if(!Ext.isFunction(object[i])) {
			empty = false;
			break;
		}
	}
	return(empty);
}

function isDataSet(object, itemFilter, testNotEmpty) {
	for(var i in object) {
		if(Ext.isObject(object[i])) {
			if(isDataSet(object[i], itemFilter, testNotEmpty)) {
				return(true);
			}
		} else {
			if((!itemFilter || !Ext.isString(i) ||
			    itemFilter == i.substr(0, itemFilter.length))&&
			   (testNotEmpty ? !Ext.isEmpty(object[i]) : object[i])) {
				return(true);
			}
		}
	}
	return(false);
}

function recurseCascadeApplyIf(object, dataApply1, itemApply2, dataApply2, fceCond) {
	if(Ext.isArray(object)) {
		for(var i = 0; i < object.length; i++) {
			recurseCascadeApplyIf(object[i], dataApply1, itemApply2, dataApply2, fceCond);
		}
	} else if(Ext.isObject(object)) {
		if(!fceCond || fceCond(object)) {
			cascadeApplyIf(object, dataApply1, itemApply2, dataApply2);
		}
		if(object.items) {
			recurseCascadeApplyIf(object.items, dataApply1, itemApply2, dataApply2, fceCond);
		}
	}
}
		      
function cascadeApplyIf(object, dataApply1, itemApply2, dataApply2) {
	if(!Ext.isDefined(object)) {
		object = {};
	}
	if(!Ext.isObject(object)) {
		return(object);
	}
	if(dataApply1) {
		Ext.applyIf(object, dataApply1);
	}
	if(itemApply2 && object[itemApply2] && dataApply2) {
		Ext.applyIf(object[itemApply2], dataApply2);
	}
}

function ip_is_valid(ip, enableIP_0) {
	if(Ext.isString(ip) && ip.length && ip[0] == '[' && ip[ip.length - 1] == ']') {
		ip = ip.substr(1, ip.length - 2);
	}
	return((VM_IPV6 ?
		 __ip64_regex.test(ip) :
		 __ip4_regex.test(ip)) ||
	       (enableIP_0 && __ip4_regex_enable_0.test(ip)));
}

function ip_is_v6(ip) {
	return(ip && ip.match && ip.match(':'));
}

function ip_mask_text(ip, mask) {
	if (!ip_is_valid(ip, true)) {
		return('BAD IP');
	}
	return(ip + 
	       (!Ext.isEmpty(mask) && mask != (ip_is_v6(ip) ? 128 : 32) ? '/' + mask : ''));
}

function ip_to_id(ip) {
	return(ip.replaceall('.', '_').replaceall(':', '_'));
}

function fix_id(id) {
	return(Ext.isString(id) ?
		ip_to_id(id) : 
		id);
}

function skip_separators(str, separators) {
	var skip_offset = 0;
	while(skip_offset < str.length && separators.indexOf(str[skip_offset]) >= 0) {
		++skip_offset;
	}
	return([str.substr(skip_offset),
		skip_offset]);
}

function skip_ip(ip_str) {
	var ip_str_offset = 0;
	while(ip_str_offset < ip_str.length && ip_str[ip_str_offset] == ' ' || ip_str[ip_str_offset] == '\t') {
		++ip_str_offset;
	}
	if(VM_IPV6) {
		var ipv6_sep_pos = ip_str.substr(ip_str_offset).indexOf(':');
		if(ipv6_sep_pos >= 0 && ipv6_sep_pos <= (ip_str[ip_str_offset] == '[' ? 5 : 4)) {
			if(ip_str[ip_str_offset] == '[') {
				++ip_str_offset;
			}
			var ip_str_length = 0;
			while(ip_str_offset + ip_str_length < ip_str.length && "0123456789abcdefABCDEF:".indexOf(ip_str[ip_str_offset + ip_str_length]) >= 0) {
				++ip_str_length;
			}
			if(ip_str_length > 0 &&
			   ip_is_valid(ip_str.substr(ip_str_offset, ip_str_length))) {
				return([ip_str.substr(ip_str_offset, ip_str_length),
					ip_str.substr(ip_str_offset + ip_str_length + (ip_str[ip_str_offset + ip_str_length] == ']' ? 1 : 0)),
					ip_str_offset,
					ip_str_offset + ip_str_length + (ip_str[ip_str_offset + ip_str_length] == ']' ? 1 : 0)]);
			}
		}
	}
	var ip_str_length = 0;
	while(ip_str_offset + ip_str_length < ip_str.length && "0123456789.".indexOf(ip_str[ip_str_offset + ip_str_length]) >= 0) {
		++ip_str_length;
	}
	if(ip_str_length > 0 &&
	   ip_is_valid(ip_str.substr(ip_str_offset, ip_str_length))) {
		return([ip_str.substr(ip_str_offset, ip_str_length),
			ip_str.substr(ip_str_offset + ip_str_length),
			ip_str_offset,
			ip_str_offset + ip_str_length]);
	}
	return(false);
}

function htmlEncode(value) {
	if(Ext.isString(value) && value.length > 0) {
		if(value[0] == '[' || value[0] == '{') {
			return(value);
		}
		var testHtml = [ '<div', '<span', '<table', '<img', '<a', '<br>' ];
		var isHtml = false;
		for(var i = 0; i < testHtml.length; i++) {
			if(value.match(testHtml[i])) {
				isHtml = true;
				break;
			}
		}
		if(!isHtml) {
			return(value.replaceall('&', '__amp;')
				    .replaceall('<', '&lt;')
				    .replaceall('>', '&gt;')
				    .replaceall('"', '&quot;')
				    .replaceall("'", '&#039;')
				    .replaceall('__amp;', '&amp;'));
		}
	}
	return(value);
}

function htmlEncodeObject(object) {
	var rslt = {};
	for(var i in object) {
		rslt[i] = htmlEncode(object[i]);
	}
	return(rslt);
}

String.prototype.stripTags = function() {
	return(this.replace(/<[^>]+>/ig,''));
}

function ajaxSafeRequest(baseParams, reloginTask) {
	var endProcess = false;
	var mask = false;
	if(baseParams.maskEl) {
		if(baseParams.maskEl.maskLoad) {
			if(baseParams.deferMask) {
				Ext.defer(function() {
						if(!endProcess) {
							baseParams.maskEl.maskLoad(null, baseParams.longOperation, baseParams.maskMsg);
							mask = true;
						}
					},
					250);
			} else {
				baseParams.maskEl.maskLoad(null, baseParams.longOperation, baseParams.maskMsg);
				mask = true;
			}
		} else if(baseParams.maskEl.mask) {
			if(baseParams.maskMsg) {
				baseParams.maskEl.mask(baseParams.maskMsg);
			} else {
				baseParams.maskEl.mask();
			}
			mask = true;
		}
	}
	var timestampId = null;
	if(baseParams && baseParams.params && Ext.isObject(baseParams.params)) {
		if(baseParams.timeout && !baseParams.params.timeout) {
			baseParams.params.timeout = baseParams.timeout / 1000;
		}
		if(baseParams.timestampId) {
			timestampId = baseParams.timestampId;
			baseParams.params.timestampId = baseParams.timestampId;
		}
		if(isEnableClientTimezone()) {
			baseParams.params.clientTimezone = getClientTimezone();
			baseParams.params.clientOsTimezone = getClientOsTimezone();
		}
	}
	if(baseParams && baseParams.check_active_request) {
		Ext.applyIf(baseParams.check_active_request, {
			timestamp_id: timestampId,
			interval_ms: 5000
		});
		if(baseParams.check_active_request.element && baseParams.check_active_request.element.id) {
			baseParams.check_active_request.element_id = baseParams.check_active_request.element.id;
		}
	}
	var ajaxRequestParams = Ext.apply({}, baseParams);
	Ext.applyIf(ajaxRequestParams, {
		method: 'POST'
	});
	if(baseParams && baseParams.check_active_request && 
	   baseParams.check_active_request.element && baseParams.check_active_request.element.startActiveRequest &&
	   baseParams.check_active_request.timestamp_id) {
		baseParams.params.check_active_request = true;
	}
	Ext.apply(ajaxRequestParams, {
		success: function(response, options) {
			if(baseParams && baseParams.check_active_request && 
			   baseParams.check_active_request.element && baseParams.check_active_request.timestamp_id) {
				baseParams.check_active_request.element.killActiveRequest(baseParams.check_active_request);
			}
			endProcess = true;
			if(baseParams.maskEl && mask) {
				baseParams.maskEl.unmask();
			}
			if(!onAjaxRequestException(
				response, 
				reloginTask || {
					fce: ajaxSafeRequest,
					scope: baseParams.scope,
					params: [ baseParams ] },
				baseParams.isLoader)) {
				return;
			}
			var result = Ext.decode(response.responseText, baseParams.isLoader);
			if(result.success || baseParams.isLoader && !result.error && response.responseText) {
				if(baseParams.success) {
					baseParams.success.call(baseParams.scope, result, response, options);
				}
			} else {
				if(baseParams.error) {
					baseParams.error.call(baseParams.scope, result, response, options);
				} else if(baseParams.errorFailure) {
					baseParams.errorFailure.call(baseParams.scope, response, options);
				} else {
					alertAjaxError(response);
				}
				if(baseParams.error2) {
					baseParams.error2.call(baseParams.scope, result, response, options);
				}
				if(baseParams.errorFailure2) {
					baseParams.errorFailure2.call(baseParams.scope, response, options);
				}
			}
		},
		failure: function(response) {
			if(baseParams && baseParams.check_active_request && 
			   baseParams.check_active_request.element && baseParams.check_active_request.timestamp_id) {
				baseParams.check_active_request.element.killActiveRequest(baseParams.check_active_request);
			}
			if(baseParams && baseParams.params &&
			   baseParams.params.task == 'getDebugLogForLoadId') {
				return;
			}
			endProcess = true;
			if(baseParams.maskEl && mask) {
				baseParams.maskEl.unmask();
			}
			if(baseParams.failure) {
				baseParams.failure.call(baseParams.scope, response);
			} else if(baseParams.errorFailure) {
				baseParams.errorFailure.call(baseParams.scope, response);
			} else {
				alertAjaxFailure(response)
			}
			if(baseParams.failure2) {
				baseParams.failure2.call(baseParams.scope, response);
			}
			if(baseParams.errorFailure2) {
				baseParams.errorFailure2.call(baseParams.scope, response);
			}
		}
	});
	Ext.applyIf(ajaxRequestParams, {
		timeout: Ext.Ajax.timeout
	});
	var request = Ext.Ajax.request(ajaxRequestParams);
	if(baseParams && baseParams.check_active_request && 
	   baseParams.check_active_request.element && baseParams.check_active_request.element.startActiveRequest &&
	   baseParams.check_active_request.timestamp_id) {
		baseParams.check_active_request.request = request;
		baseParams.check_active_request.element.startActiveRequest(baseParams.check_active_request);
	}
	if(timestampId) {
		request.timestampId = timestampId;
	}
	return(request);
}

function alertAjaxSuccess(successInfo) {
	if(successInfo && successInfo.replaceall) {
		successInfo = successInfo.replaceall('\n', '<br>');
	}
	Ext.Msg.alert(
		lang.alertAjaxSuccessHeader,
		successInfo);
}

function alertAjaxError(response, prefix, retryConfig) {
	var result = null;
	if(response && response.responseText) {
		result = Ext.decode(response.responseText);
		if(isDataEmpty(result)) {
			result = { msg: response.responseText };
		}
	}
	_alertAjaxError(result, prefix, retryConfig);
}

function _alertAjaxError(result, prefix, retryConfig) {
	var msg = getStringAjaxError(result, prefix);
	if(msg && msg.replaceall) {
		msg = msg.replaceall('\n', '<br>');
	}
	if(retryConfig) {
		Ext.Msg.confirm(
			lang.alertAjaxErrorHeader,
			msg + '<br><br>' + retryConfig.text,
			function(rslt) {
				if(rslt == 'yes') {
					retryConfig.yes.call(retryConfig.scope)
				} else if(retryConfig.no) {
					retryConfig.no.call(retryConfig.scope)
				}
			});
	} else {
		if(Ext.Msg.longalert) {
			Ext.Msg.longalert(lang.alertAjaxErrorHeader, msg);
		} else {
			Ext.Msg.alert(lang.alertAjaxErrorHeader, msg);
		}
	}
}

function getStringAjaxError(result, prefix, stdReplaceLF) {
	var error = (prefix || '') +
		    (result &&
		     (result.error && result.error.descr ||
		      result.error ||
		      result.errors && result.errors.reason ||
		      result.msg) ||
		     lang.alertAjaxErrorMsgUnknown);
	var matchErrorForeignKey = error.match(/Cannot delete or update a parent row: a foreign key constraint fails \(([^,]*)/);
	if(matchErrorForeignKey && matchErrorForeignKey.length == 2) {
		error = lang.failedDeleteRecord_FK.template([matchErrorForeignKey[1]]);
	}
	if(stdReplaceLF && error && error.replaceall) {
		error = error.replaceall('\n', '<br>');
	}
	return(error);
}

function alertAjaxFailure(response) {
	var msg = getStringAjaxFailure(response);
	if(msg && msg.replaceall) {
		msg = msg.replaceall('\n', '<br>');
	}
	if(Ext.Msg.longalert) {
		Ext.Msg.longalert(lang.alertAjaxFailureHeader, msg);
	} else {
		Ext.Msg.alert(lang.alertAjaxFailureHeader, msg);
	}
}

function getStringAjaxFailure(response) {
	getDebugLogForLoadId('fatal_error');
	return(requestIsAborted(response) ?
		findLangSd('grid', 'requestAborted') :
	       requestIsTimedout(response) ?
		findLangSd('grid', 'requestTimeout') :
		(findLangSd('grid', 'serverSideError') + ' - ' + 
		 (response && response.statusText || findLangSd('grid', 'errorIsNotSpecified'))));
}

function requestIsAborted(response) {
	return(response && response.request && response.request._aborted);
}

function requestIsTimedout(response) {
	return(response && response.timedout);
}

function getStringAjaxFailure_errorIsNotSpecified() {
	return(findLangSd('grid', 'serverSideError') + ' - ' + findLangSd('grid', 'errorIsNotSpecified'));
}

function alertSubmitFailure(action) {
	if(action && action.result) {
		var msg = action.result &&
			  (action.result.error && action.result.error.descr ||
			   action.result.error ||
			   action.result.errors && action.result.errors.reason ||
			   action.result.msg) ||
			  lang.alertAjaxErrorMsgUnknown;
		if(msg && msg.replaceall) {
			msg = msg.replaceall('\n', '<br>');
		}
		Ext.Msg.longalert(lang.errorText, msg);
	}
}

function downloadPrepareFileHash(prepareFile, okTimeSec, inline) {
	if(okTimeSec) {
		prepareFile.okTimeSec = okTimeSec;
	}
	if(inline) {
		prepareFile.inline = inline;
	}
	formPostSafe(
		'php/model/utilities.php', 
		'POST', 
		{
			task: 'safeDownloadFileHash',
			params: Ext.encode(prepareFile)
		});
}

function okTimeSecSet (prepareFile, okTimeSec) {
	if(okTimeSec) {
		prepareFile.okTimeSec = okTimeSec;
	}
	return(prepareFile);
}

function downloadPrepareFileHashUrl(prepareFile, okTimeSec) {
	if(prepareFile._debug) {
		delete prepareFile._debug;
	}
	if(okTimeSec) {
		prepareFile.okTimeSec = okTimeSec;
	}
	return('php/model/utilities.php' +
	       '?task=safeDownloadFileHash' +
	       '&params=' + encodeURIComponent(Ext.encode(prepareFile)));
}

function unlinkPrepareFileHash(prepareFile) {
	if(prepareFile._debug) {
		delete prepareFile._debug;
	}
	ajaxSafeRequest({
		url: 'php/model/utilities.php', 
		params: {
			task: 'safeUnlinkFileHash',
			params: Ext.encode(prepareFile)
		}
	});
}

function alertCommandNotFound(command, packageAptGet, packageYum) {
	if(!packageAptGet) 	packageAptGet = command;
	if(!packageYum)    	packageYum = packageAptGet;
	var templateData = {
		command: command,
		packageAptGet: packageAptGet,
		packageYum: packageYum
	};
	var width = Math.min(600, Ext.dom.Element.getViewportWidth() * 3 / 5);
	Ext.Msg.show({
		title: lang.alertCommandNotFoundHeader.template(templateData),
		msg: '<div style="width: ' + width + '">' +
		     lang.alertCommandNotFoundText.template(templateData) + '<br>' +
		     '</div>',
		buttons: Ext.Msg.OK,
		minWidth: width,
		width: width
	});
}

function alertCommandPermissionDenied(command) {
	var templateData = {
		command: command
	};
	var width = Math.min(600, Ext.dom.Element.getViewportWidth() * 3 / 5);
	Ext.Msg.show({
		title: lang.alertCommandPermissionDeniedHeader.template(templateData),
		msg: '<div style="width: ' + width + '">' +
		     lang.alertCommandPermissionDeniedText.template(templateData) + '<br>' +
		     '</div>',
		buttons: Ext.Msg.OK,
		minWidth: width,
		width: width
	});
}

function getAbsolutePosition(domElement, relativeViaId) {
	var l = domElement.offsetLeft; 
	var t = domElement.offsetTop;
	while(domElement = domElement.offsetParent) {
		l += domElement.offsetLeft;
		t += domElement.offsetTop;
		if(relativeViaId && domElement.id == relativeViaId) {
			break;
		}
	}
	return([l,t]);
}

function getCascadeMaxHeight(object) {
	var maxHeight = 0;
	object.cascade(function(item) {
		if(item.el && item.el.dom) {
			var height = getAbsolutePosition(item.el.dom, object.id)[1] + item.el.dom.clientHeight;
			if(height > maxHeight) {
				maxHeight = height;
			}
		}
	});
	return(maxHeight - object.el.dom.offsetTop);
}

function formPost(action, method, params, config) {
	/* původní funkční kód
	var formEl = Ext.get(document.createElement('form'));
	formEl.set({
		action: action,
		method: method
	});
	var inputEls = {};
	for(var iParam in params) {
		if(Ext.isDefined(params[iParam])) {
			inputEls[iParam] = Ext.get(document.createElement('input'));
			inputEls[iParam].set({
				name: iParam,
				type: 'hidden'
			});
			formEl.appendChild(inputEls[iParam]);
		}
	}
	Ext.getBody().appendChild(formEl);
	for(var iParam in params) {
		if(Ext.isDefined(params[iParam])) {
			inputEls[iParam].set({ value: params[iParam] });
		}
	}
	formEl.dom.submit();
	*/
	
	/*
	// config
		iframe
		||
		{	autoRslt: true,
			onRslt:
			onRsltScope:
		}
	}
	*/
	
	if(isEnableClientTimezone()) {
		params.clientTimezone = getClientTimezone();
		params.clientOsTimezone = getClientOsTimezone();
	}
	if(config === 'iframe') {
		config = {
			autoRslt: true
		};
	}
	var useIframeRslt = config && (config.autoRslt || config.onRslt);
	if(useIframeRslt) {
		var iframeId = Ext.id();
		var iFrame = document.createElement('iframe');
		Ext.fly(iFrame).set({
			id: iframeId,
			name: iframeId,
			cls: Ext.baseCSSPrefix + 'hidden-display',
			src: Ext.SSL_SECURE_URL
		});
		document.body.appendChild(iFrame);
		Ext.get(iFrame).setStyle({ border: 'none' });
		if (document.frames) {
			document.frames[iframeId].name = iframeId;
		}
	}
	var formEl = Ext.get(document.createElement('form'));
	formEl.set({
		action: action,
		method: method
	});
	var inputEls = {};
	for(var iParam in params) {
		if(Ext.isDefined(params[iParam])) {
			inputEls[iParam] = Ext.get(document.createElement('input'));
			inputEls[iParam].set({
				name: iParam,
				type: 'hidden'
			});
			formEl.appendChild(inputEls[iParam]);
		}
	}
	Ext.getBody().appendChild(formEl);
	for(var iParam in params) {
		if(Ext.isDefined(params[iParam])) {
			inputEls[iParam].set({ value: params[iParam] });
		}
	}
	if(useIframeRslt) {
		formEl.set({
			target: iframeId
		});
		var onIframeLoad = function(action, method, params, config, iFrame, recurseCounter) {
			var doc = iFrame.contentWindow.document || iFrame.contentDocument || window.frames[iFrame.id].document;
			var response = '';
			if (doc) {
				if (doc.body) {
					if (/textarea/i.test((firstChild = doc.body.firstChild || {}).tagName)) { 
						response = firstChild.value;
					} else {
						response = doc.body.innerText || doc.body.textContent;
					}
				}
			}
			if(response) {
				if(config.onRslt) {
					if(response.length && (response[0] == '{' || response[0] == '[')) {
						response = Ext.decode(response);
					}
					config.onRslt.call(config.onRsltScope, response);
				} else {
					if(response.length && (response[0] == '{' || response[0] == '[')) {
						response = Ext.decode(response);
					} else {
						response = { error: response };
					}
					if(response.error) {
						_alertAjaxError(response);
					}
				}
			} else {
				if(Ext.isOpera && !recurseCounter) {
					Ext.defer(onIframeLoad, 500, this,
						  [action, method, params, config, iFrame, (recurseCounter || 0) + 1]);
					return;
				}
			}
			Ext.removeNode(iFrame);
		}
		Ext.get(iFrame).on('load', Ext.bind(onIframeLoad, null, [action, method, params, config, iFrame]) , null, {single: true});
	}
	formEl.dom.submit();
	Ext.defer(function() {
			Ext.removeNode(formEl.dom);
			Ext.defer(function() {
					Ext.removeNode(iFrame);
				}, 30 * 60 * 1000);
		}, 10 * 1000);
}

function formPostSafe(action, method, params) {
	formPost(action, method, params, 'iframe');
}

function loadGoogleApis(onLoadFce, onLoadScope, onInvalidKeyFce, onInvalidKeyScope) {
	if(window.google && !window._google_map_failure) {
		onLoadFce.call(onLoadScope);
		return;
	}
	window._google_map_failure = false;
	window._google_map_invalid_key_fce = onInvalidKeyFce;
	window._google_map_invalid_key_scope = onInvalidKeyScope;
	onLoadGoogleApis_params = {
		onLoadFce: onLoadFce,
		onLoadScope: onLoadScope
	}
	var scriptsSrc = [
		'maps.googleapis.com/maps/api/js?callback=onLoadGoogleApis' + 
		(window._google_map_key ? '&key=' + window._google_map_key : '')
	];
	window._google_map_script = [];
	for(var i = 0; i < scriptsSrc.length; i++) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = scriptsSrc[i].match('LOCAL://') ?
			      scriptsSrc[i].substr(8) :
			      (isSsl() ? 'https://' : 'http://') + scriptsSrc[i];
		document.body.appendChild(script);
		window._google_map_script.push(script);
	}
}

function onLoadGoogleApis() {
	if(!window.InfoBubble) {
		Ext.defer(onLoadGoogleApis, 200);
	} else {
		onLoadGoogleApis_params.onLoadFce.call(onLoadGoogleApis_params.onLoadScope);
	}
}

function gm_authFailure() {
	window._google_map_failure = true;
	if(window._google_map_script) {
		for(var i = 0; i < window._google_map_script.length; i++) {
			window._google_map_script[i].parentNode.removeChild(window._google_map_script[i]);
		}
		delete window._google_map_script;
	}
	if(window._google_map_invalid_key_fce) {
		window._google_map_invalid_key_fce.call(window._google_map_invalid_key_scope);
	}
}

function loadOpenLayersApi(onLoadFce, onLoadScope) {
	if(window.OpenLayers && !window._openlayers_failure) {
		onLoadFce.call(onLoadScope);
		return;
	}
	window._openlayers_failure = false;
	loadScripts([
			'js/openlayers/OpenLayers_v2.js',
			'js/openlayers/OpenStreetMap_v2.js'
		], onLoadFce, onLoadScope);
}

function loadScripts(src, onLoadFce, onLoadScope, index) {
	index = index || 0;
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src[index];
	script.onload = function(script) { 
		if(index < src.length - 1) {
			loadScripts(src, onLoadFce, onLoadScope, index + 1);
		} else {
			onLoadFce.call(onLoadScope);
		}
	}
	document.body.appendChild(script);
}

function loadScript(src, onLoadFce, onLoadScope) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	script.onload = function(script) { 
		onLoadFce.call(onLoadScope);
	}
	document.body.appendChild(script);
}

function gpsDistance(pos1, pos2) {
	pos1 = [Math.deg2rad(pos1[0]), Math.deg2rad(pos1[1])];
	pos2 = [Math.deg2rad(pos2[0]), Math.deg2rad(pos2[1])];
	return Math.acos(
		Math.cos(pos1[0]) * Math.cos(pos1[1]) * Math.cos(pos2[0]) * Math.cos(pos2[1]) +
		Math.cos(pos1[0]) * Math.sin(pos1[1]) * Math.cos(pos2[0]) * Math.sin(pos2[1]) +
		Math.sin(pos1[0])*Math.sin(pos2[0])) * 6372.795;
}

function gpsCenter(pos1, pos2) {
	pos1 = [Math.deg2rad(pos1[0]), Math.deg2rad(pos1[1])];
	pos2 = [Math.deg2rad(pos2[0]), Math.deg2rad(pos2[1])];
	var  dLng = pos2[1] - pos1[1];
	var bx = Math.cos(pos2[0]) * Math.cos(dLng);
	var by = Math.cos(pos2[0]) * Math.sin(dLng);
	var rsltLat = Math.atan2(
			Math.sin(pos1[0]) + Math.sin(pos2[0]), 
			Math.sqrt((Math.cos(pos1[0]) + bx) * (Math.cos(pos1[0]) + bx) + by * by));
	var rsltLng = pos1[1] + Math.atan2(by, Math.cos(pos1[0]) + bx);
	return([Math.rad2deg(rsltLat), Math.rad2deg(rsltLng)]);
}

function gpsSimpleCenter(pos1, pos2) {
	for(var i = 0; i < 2; i++) {
		if(Ext.isString(pos1[i])) pos1[i] *= 1;
		if(Ext.isString(pos2[i])) pos2[i] *= 1;
	}
	var rsltLat = (pos1[0] + pos2[0]) / 2;;
	var rsltLng = ((pos1[1] < 0 ? 360 - pos1[1] : pos1[1]) + 
		       (pos2[1] < 0 ? 360 - pos2[1] : pos2[1])) / 2;
	if(rsltLng > 180) {
		rsltLng -= 180;
	}
	return([rsltLat, rsltLng]);
}

function isSsl() {
	return(window.location.protocol && window.location.protocol.match &&
	       window.location.protocol.match(/https/i));
}

function treeToArray(tree, separator) {
	var array = {};
	return(_treeToArray(tree, array, separator));
}
 
function _treeToArray(tree, array, separator, prefix) {
	for(var i in tree) {
		if(Ext.isObject(tree[i])) {
			_treeToArray(tree[i], array, separator, (prefix ? prefix + separator : '') + i);
		} else {
			array[(prefix ? prefix + separator : '') + i] = tree[i];
		}
	}
	return(array);
}

function arrayToTree(array, separator) {
	var tree = {};
	for(var i in array) {
		var is = i.split(separator);
		var node = tree;
		for(var j = 0; j < is.length; j++) {
			if(j < is.length - 1) {
				if(!Ext.isDefined(node[is[j]])) {
					node[is[j]] = {};
				}
				node = node[is[j]];
			} else {
				node[is[j]] = array[i];
			}
		}
	}
	return(tree);
}

function objectToTreeStoreData(object) {
	var treeStoreData = [];
	for(var i in object) {
		if(!Ext.isFunction(object[i])) {
			if(Ext.isArray(object[i]) || Ext.isObject(object[i])) {
				treeStoreData.push({
					field: i,
					children: objectToTreeStoreData(object[i])
				});
			} else {
				treeStoreData.push({
					field: i,
					value: object[i],
					leaf: true
				});
			}
		}
	}
	return(treeStoreData);
}

function setAppData() {
	if(window.setLang && !window.lang)
					setLang();
	if(window.setArrays) 		setArrays();
	if(window.fillDataArrays) 	fillDataArrays();
	if(window.setVTypes) 		setVTypes();
	if(window.setMeasure) 		setMeasure();
}

function getWikiObject(config) {
	if(!__wikiUrl) {
		return(null);
	}
	return({
		type: 'wiki',
		width: 40,
		height: config && config.height || 17,
		renderTpl: [
			'<img id="{id}-toolEl" src="images/wiki.png" class="{baseCls}-wiki" role="presentation" ' + 
			'style="width: 40; height: ' + (config && config.height || 17) + ';' + 
				(config && config.marginTop ? 'margin-top: ' + config.marginTop + ';' : '') + '"' +
			'/>' +
			'<img id="{id}-toolEl_anim" src="images/wiki.gif" ' + 
			'style="position: absolute; left: 2; ' + 
				'top: ' + (2 + (config && config.marginTop || 0)) + ' ; width: 36; height: 13;'+ '" ' +
			'onclick="Ext.getCmp(\'{id}\').click(window.event);"' +
			'/>'
		],
		handler: function () {
			window.open(__wikiUrl + config.id);
		},
		click: function(e) {
			var me = this;
			var owner = me.owner || me.ownerCt;
			Ext.callback(me.handler, me.scope || me, [e, null, owner, me]);
		}
		/* force start animation after show - supressed
		,listeners: {
			afterrender: function(obj) {
				Ext.get(obj.id + '-toolEl_anim').dom.src = Ext.get(obj.id + '-toolEl_anim').dom.src;
			}
		}
		*/
	});
}

function setWikiInTab(tabPanel, newPanel, oldPanel) {
	if(!__wikiUrl) {
		return;
	}
	var countSet = 0;
	if(newPanel && newPanel.wikiId) {
		newPanel._title = newPanel.title;
		newPanel.setTitle(
			'<table callpadding=0 callspacing=0 style="border: none; border-collapse: collapse; padding: 0; margin: 0;"><tr>' + 
				'<td style="height: 12; font-size: 11; font-weight: bold;">' + 
					newPanel._title + 
				'</td>' + 
				'<td style="height: 13; padding-left: 6;">' + 
					'<img src="images/wiki_small_13.png" ' + 
						'style="display: inline; height:13;" '  +
						'onclick="window.open(\'' + __wikiUrl + newPanel.wikiId + '\');">' +
				'</td>' +
			'</tr></table>');
		var indexTab = tabPanel.items.indexOf(newPanel);
		if(indexTab >= 0 && tabPanel.tabBar) {
			tabPanel.tabBar.items.get(indexTab).btnWrap.setStyle({'padding-right': 0});
		}
		++countSet;
	}
	if(oldPanel && oldPanel.wikiId && oldPanel._title) {
		oldPanel.setTitle(oldPanel._title);
		var indexTab = tabPanel.items.indexOf(oldPanel);
		if(indexTab >= 0 && tabPanel.tabBar) {
			tabPanel.tabBar.items.get(indexTab).btnWrap.setStyle({'padding-right': 6});
		}
		++countSet;
	}
	if(countSet && tabPanel.tabBar) {
		Ext.defer(tabPanel.tabBar.updateLayout, 10, tabPanel.tabBar);
	}
}

function getDataCdrCustomHeaders() {
	if(window.dataCdrCustomHeaders) {
		return(Ext.decode(window.dataCdrCustomHeaders));
	}
	return(null);
}

function getDataMessageCustomHeaders() {
	if(window.dataMessageCustomHeaders) {
		return(Ext.decode(window.dataMessageCustomHeaders));
	}
	return(null);
}

function getDataSipMsgCustomHeaders() {
	if(window.dataSipMsgCustomHeaders) {
		return(Ext.decode(window.dataSipMsgCustomHeaders));
	}
	return(null);
}

function getComboboxDataCustomHeaders(dataCustomHeaders) {
	if(dataCustomHeaders) {
		var rslt = [];
		for(var i = 0; i < dataCustomHeaders.length; i++) {
			if(dataCustomHeaders[i]._column_unique &&
			   !dataCustomHeaders[i].special_type && dataCustomHeaders[i].header_field) {
				rslt.push([
					dataCustomHeaders[i]._column_unique,
					dataCustomHeaders[i].name
				]);
			}
		}
		return(rslt.length ? rslt : null);
	}
	return(null);
}

function getNameCustomHeader(dataCustomHeaders, column_unique) {
	if(dataCustomHeaders) {
		for(var i = 0; i < dataCustomHeaders.length; i++) {
			if(dataCustomHeaders[i]._column_unique == column_unique) {
				return(dataCustomHeaders[i].name);
			}
		}
	}
	return(null);
}

function getDataCdrSelectColumns(config) {
	var cdrColumns = [];
	for(var i = 0; i < rsCDR.length; i++) {
		if(rsCDR[i].descr) {
			var column = {
				field: rsCDR[i].field || rsCDR[i].name,
				descr: rsCDR[i].descr
			};
			if(rsCDR[i].join_table) {
				Ext.apply(column, {
					join_table: rsCDR[i].join_table,
					join_field: rsCDR[i].join_field
				});
			}
			cdrColumns.push(column);
		}
	}
	var customHeaders = getDataCdrCustomHeaders();
	if(customHeaders) {
		for(var i = 0; i < customHeaders.length; i++) {
			if(customHeaders[i].type == 'fixed' ||
			   customHeaders[i].type == 'dynamic' && customHeaders[i].state == 'active') {
				cdrColumns.push({
					field: 'ID',
					descr: customHeaders[i].name,
					join_table: customHeaders[i]._table,
					join_field: customHeaders[i]._column,
					join_field_u: customHeaders[i]._column_unique
				});
			}
		}
	}
	if(config && config.alert_rtp_columns) {
		var _alert_rtp_columns = [];
		_alert_rtp_columns.push('alert_flags');
		_alert_rtp_columns.push('mos');
		if(window.existsMosXrCdr) {
			_alert_rtp_columns.push('mos_xr_avg');
			_alert_rtp_columns.push('mos_xr_min');
			_alert_rtp_columns.push('mos_xr_avg_caller');
			_alert_rtp_columns.push('mos_xr_avg_called');
			_alert_rtp_columns.push('mos_xr_min_caller');
			_alert_rtp_columns.push('mos_xr_min_called');
		}
		if(window.existsMosSilenceCdr) {
			_alert_rtp_columns.push('mos_silence_avg');
			_alert_rtp_columns.push('mos_silence_min');
			_alert_rtp_columns.push('mos_silence_avg_caller');
			_alert_rtp_columns.push('mos_silence_avg_called');
			_alert_rtp_columns.push('mos_silence_min_caller');
			_alert_rtp_columns.push('mos_silence_min_called');
		}
		if(window.existsMosLqoCdr) {
			_alert_rtp_columns.push('mos_lqo_caller');
			_alert_rtp_columns.push('mos_lqo_called');
		}
		_alert_rtp_columns.push('packets_loss');
		_alert_rtp_columns.push('packets_loss_rtcp');
		_alert_rtp_columns.push('jitter');
		_alert_rtp_columns.push('delay_count');
		if(window.existsCdrSilence) {
			_alert_rtp_columns.push('silence');
			_alert_rtp_columns.push('silence_end');
		}
		if(window.existsCdrClipping) {
			_alert_rtp_columns.push('clipping');
		}
		_alert_rtp_columns.push('one_way');
		_alert_rtp_columns.push('missing_rtp');
		for(var i = 0; i < _alert_rtp_columns.length; i++) {
			cdrColumns.push({
				type: 'alert_rtp',
				field: _alert_rtp_columns[i],
				descr: _alert_rtp_columns[i]
			});
		}
	}
	return(cdrColumns);
}

function getDscpCode(number, caller, sip) {
	var n = 0;
	switch(caller * 10 + sip) {
	case 11: n = 3; break;
	case 01: n = 2; break;
	case 10: n = 1; break;
	case 00: n = 0; break;
	}
	var dscp = (number>>(8*n))&((1<<8)-1);
	var dscpName = getDataArrayItem(arDscp, dscp);
	return((dscpName || 'N/A') + ' (' + dscp + ')');
}

function encodeURIjson(json) {
	return(encodeURIComponent(json).
		replaceall('%7B','{').
		replaceall('%7D','}').
		replaceall('%3A',':').
		replaceall('%2C',','));
}

function convSecTimeToNow(secTime) {
	var now = parseInt((new Date).getTime() / 1000);
	secTime = parseInt(secTime);
	secDiff = Math.abs(secTime - now);
	diffTime = (parseInt(secDiff / (3600*24)) ? parseInt(secDiff / (3600*24)) + 'd' : '') + 
		   ((secDiff % (3600*24)) ? (secDiff % (3600*24)) + 's' : '');
	return('now' + 
	       (diffTime ? (secTime > now ? '+' : '-') + diffTime : ''));
}

function checkValidRegularExpression(regExpString) {
	var isValid;
	try { 
	    new RegExp(regExpString);
	    isValid = true;
	}
	catch(e) {
	    isValid = false;
	}
	return(isValid);
}

function deleteElementById(id) {
	do {
		var elem = document.getElementById(id);
		if(elem) {
			elem.parentNode.removeChild(elem);
		}
	} while(elem);
}

function getConfigParameter(name) {
	if(!Ext.isDefined(window.configParameters)) {
		return(null);
	}
	if(Ext.isString(configParameters)) {
		configParameters = Ext.decode(configParameters);
	}
	var rslt = configParameters[name];
	if(Ext.isString(rslt) &&
	   (rslt[0] == '{' && rslt[rslt.length - 1] == '}' ||
	    rslt[0] == '[' && rslt[rslt.length - 1] == ']')) {
		rsltDecode = Ext.decode(rslt);
		if(rsltDecode) {
			return(rsltDecode);
		}
	}
	return(rslt);
}

function setConfigParameter(name, config) {
	if(!Ext.isDefined(window.configParameters)) {
		return;
	}
	if(Ext.isString(configParameters)) {
		configParameters = Ext.decode(configParameters);
	}
	configParameters[name] = config;
	ajaxSafeRequest({
		url: 'php/model/utilities.php',
		params: {
			task: 'setParameter',
			params: Ext.encode({
				name: name,
				config: config
			})
		}
	});
}

function getSizeHtml(html, useOffset, attr) {
	var testdiv = document.createElement('div');
	testdiv.setAttribute('id', 'test_div_size');
	testdiv.setAttribute('style', 'display: inline-block;');
	if(attr) {
		Ext.apply(testdiv.style, attr);
	}
	testdiv.innerHTML = html;
	document.body.appendChild(testdiv);
	var size = [ 
		useOffset ? testdiv.offsetWidth : testdiv.clientWidth, 
		useOffset ? testdiv.offsetHeight : testdiv.clientHeight 
	];
	document.body.removeChild(testdiv);
	return(size);
}

/*
function intToMacString(mac) {
	return(
		new Array(6).join('00')        // '000000000000'
		.match( /../g )                // [ '00', '00', '00', '00', '00', '00' ]
		.concat(mac.toString( 16 )     // "4a8926c44578"
			.match( /.{1,2}/g )    // ["4a", "89", "26", "c4", "45", "78"]
		)                              // ["00", "00", "00", "00", "00", "00", "4a", "89", "26", "c4", "45", "78"]
		.reverse()                     // ["78", "45", "c4", "26", "89", "4a", "00", "00", "00", "00", "00", "00", ]
		.slice(0, 6)                   // ["78", "45", "c4", "26", "89", "4a" ]
		.join(':'));
} */

function clipboardCopy(text) {
	window.getSelection().removeAllRanges();
	var rsltCopy = false;
	var textEl = document.createElement('div');
	textEl.innerHTML = text.replaceall('\n', '<br>');
	document.body.appendChild(textEl);
	var range = document.createRange();  
	range.selectNode(textEl);  
	window.getSelection().addRange(range);
	try {  
		rsltCopy = document.execCommand('copy');  
	} catch(err) {  
	}  
	document.body.removeChild(textEl);
	window.getSelection().removeAllRanges(); 
	return(rsltCopy);
}

function isClipboardCopySupport() {
	return(document.queryCommandSupported('copy'));
}

function isEnableClientTimezone() {
	return(window.enableChangeTimezone ||
	       window.activePanel && activePanel.changeTimezone);
}

function checkEqStore(store1, store2) {
	var fields1 = store1.model.getFields();
	var fields2 = store2.model.getFields();
	if(fields1.length != fields2.length) {
		return(false);
	}
	for(var i = 0; i < fields1.length; i++) {
		if(fields1[i].name != fields2[i].name) {
			return(false);
		}
	}
	if(store1.getCount() != store2.getCount()) {
		return(false);
	}
	for(var i = 0; i < store1.getCount(); i++) {
		var data1 = store1.getAt(i).data;
		var data2 = store2.getAt(i).data;
		for(var j = 0; j < fields1.length; j++) {
			if(data1[fields1[j].name] != data2[fields1[j].name]) {
				return(false);
			}
		}
	}
	return(true);
}

function getCsvFieldSeparator() {
	if(user && user.sqlrow &&
	   user.sqlrow.uc_csv_field_separator === 'comma' || user.sqlrow.uc_csv_field_separator === 'semicolon') {
		return(user.sqlrow.uc_csv_field_separator === 'comma' ? ',' : ';');
	}
	return(window.default_csv_field_separator || ',');
}

function getClientTimezone() {
	return(window.client_timezone ||
	       getDefaultClientOsTimezone());
}

function getClientOsTimezone() {
	return(getDefaultClientOsTimezone() ||
	       window.client_os_timezone);
}

function getDefaultClientOsTimezone() {
	var timezone = null;
	try {
		timezone = window.jstz &&
			   jstz.determine() &&
			   jstz.determine().name();
	}
	catch(e) {
		debug_log('unsupported timezone');
	}
	return(timezone);
}

function existsFlag(countryCode) {
	if(countryCode && countryCode.toLowerCase) {
		var listFlags = Ext.JSON.decode(list_flags);
		if(listFlags && listFlags.inArray) {
			return(listFlags.inArray(countryCode.toLowerCase()));
		}
	}
	return(false);
}

Ext.define('cClipboardButton', {
	extend: 'Ext.Button',
	constructor: function(config) {
		if(isClipboardCopySupport()) {
			this.callParent([config]);
			this.on('click', function() {
				clipboardCopy(this.getClipText.call(this.scope, this.getClipTextParams));
			}, this);
			return;
		}
	}
});

Ext.define('cClipboardMenuItem', {
	extend: 'Ext.menu.Item',
	constructor: function(config) {
		if(isClipboardCopySupport()) {
			this.callParent([config]);
			this.on('click', function() {
				clipboardCopy(this.getClipText.call(this.scope, this.getClipTextParams));
				if(this.parentMenu) {
					if(this.parentMenu.parentMenu) {
						this.parentMenu.parentMenu.destroy();
					} else {
						this.parentMenu.destroy();
					}
				}
			}, this);
			return;
		}
	}
});

function openAttachment(record, table) {
	var maxWidth = Ext.dom.Element.getViewportWidth() - 20;
	var width = Math.min(850, Ext.dom.Element.getViewportWidth() - 20);
	var height = Ext.dom.Element.getViewportHeight() - 50;
	var item;
	if(record.data.attachment_type.match(/pdf/i)) {
		item = {
			layout: 'fit',
			xtype: 'box',
			autoEl: {
				tag: 'iframe',
				src: getUrlWithTaskParams('php/model/utilities.php', 'getFileFromDb', {
					table: table,
					id: record.data.id,
					inline: true }),
				width: width,
				height: height,
				frameborder: 0
			}
		};
	} else if(record.data.attachment_type.match(/svg/i)) {
		item = {
			xtype: 'panel',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items: {
				xtype: 'box',
				autoLoad: getUrlWithTaskParams('php/model/utilities.php', 'getFileFromDb', {
						table: table,
						id: record.data.id,
						inline: true })
			},
			width: Math.min(1000, maxWidth),
			height: height,
			autoScroll: true,
			border: false
		};
	} else {
		item = {
			xtype: 'panel',
			html: '<table width="100%" height="100%" align="center" valign="center"><tr><td>' +
			      '<img src="'+
			      getUrlWithTaskParams('php/model/utilities.php', 'getFileFromDb', {
					table: table,
					id: record.data.id,
					inline: true })+
					'" style="width: 100%">' +
			      '</td></tr></table>',
			width: width,
			height: height,
			autoScroll: true,
			border: false,
			style: {
				padding: 4,
				'background-color': 'white'
			}
		};
	}
	var showWindow = new Ext.Window({
		title: record.data.attachment_name,
		closable: true,
		maximizable: true,
		resizable: true,
		layout: 'fit',
		items: item
	});
	showWindow.show();
}

function gSignOut() {
	loadGoogleAuth(function() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			Ext.Ajax.request({
				url: 'php/model/sql.php',
				params: {
					module: 'logout'
				},
				success: function() {
					window.onbeforeunload_disable = true;
					window.location = "./";
				},
				failure: function() {
					window.onbeforeunload_disable = true;
					window.location = "./";
				},
				timeout: 15000
			});
		});
	});
}

function gSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	debug_log('G id_token: ' + id_token);
	ajaxSafeRequest({
		url: 'php/model/sql.php',
		params: {
			module: 'glogin',
			id_token: id_token
		},
		success: function(result) {
			window.location = 'admin.php';
		}
	});
}

function gReSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	debug_log('G id_token relogin: ' + id_token);
	ajaxSafeRequest({
		url: 'php/model/sql.php',
		params: {
			module: 'glogin',
			id_token: id_token
		},
		success: function(result) {
			window.reLoginWindow.close();
			window.reLoginWindow = null;
			window.reloginForm = null;
			Ext.defer(runReloginTasks,250);
			return(true);
		}
	});
}

function loadGoogleAuth(onLoad) {
	if(window._google_auth_loaded) {
		if(onLoad) {
			onLoad();
		}
		return;
	}
	window._google_auth_on_load = onLoad;
	var scriptsSrc = [
		'https://apis.google.com/js/platform.js'
	];
	for(var i = 0; i < scriptsSrc.length; i++) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = scriptsSrc[i];
		script.onload = gOnLoad;
		script.onerror = function() {
			Ext.Msg.alert('Error', "Can't load google platform library, so Google auth will not work.");
		};
		document.body.appendChild(script);
	}
}

function gOnLoad() {
	gapi.load('auth2', function() {
		gapi.auth2.init({client_id: window.gClientId}).then(
			function() {
				window._google_auth_loaded = true;
				if(window._google_auth_on_load) {
					window._google_auth_on_load();
				}
			},
			function(gError) {
				Ext.Msg.alert('Error', "Can't init google API, so Google auth will not work. Error from Google:<br>" + gError.details);
			});
	});
}

function gRenderButton(login) {
	if (login == true) {
		gapi.signin2.render('gSignButton', {
			'scope': 'profile email',
			'width': 100,
			'height': 30,
			'longtitle': false,
			'theme': 'light',
			'onsuccess': gSignIn,
			'onfailure': gOnFailure
		});
	} else {
		gapi.signin2.render('gSignButton', {
			'scope': 'profile email',
			'width': 100,
			'height': 30,
			'longtitle': false,
			'theme': 'light',
			'onsuccess': gReSignIn,
			'onfailure': gOnFailure
		});
	}
	Ext.defer(gDisplayButton, 100);
}

function gDisplayButton() {
	var gSignButton = Ext.get('gSignButton');
	if(gSignButton && gSignButton.up() && gSignButton.up().dom) {
		gSignButtonContainer = Ext.getCmp(gSignButton.up().dom.id);
		if(gSignButtonContainer) {
			var gSignWindow = gSignButtonContainer.findWindow();
			if(gSignWindow) {
				gSignButtonContainer.show();
				gSignWindow.updateLayout();
				for(var i = 0; i < 5; i++) {
					Ext.defer(function() {
							gSignWindow.updateLayout();
						}, (i + 1) * 100);
				}
			}
		}
	}
}

function gOnFailure (error) {
	console.log(error);
}

function testSleep(sleep) {
	ajaxSafeRequest({
		url: 'php/model/utilities.php',
		params: {
			task: 'testSleep',
			params: Ext.encode({
				sleep: sleep
			})
		}
	});
}
