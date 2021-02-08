function rgbToHex(rgb, g, b) {
	if(!Ext.isArray(rgb)) {
		rgb = [ rgb, g, b];
	}
	return((rgb[0] * 256 * 256 + rgb[1] * 256 + rgb[2]).toString(16).lpad(6,'0'));
}

function hexToRgb(hexString) {
	if(hexString.charAt(0) == "#") {
		hexString = hexString.substring(1, 7);
	}
	return([
		parseInt(hexString.substring(0,2),16),
		parseInt(hexString.substring(2,4),16),
		parseInt(hexString.substring(4,6),16)
	]);
}

function hsvToRgb(hsv, s, v) {
	var h;
	if(Ext.isArray(hsv)) {
		h = hsv[0];
		s = hsv[1];
		v = hsv[2];
	} else {
		h = hsv;
	}
	s /= 100;
	v /= 100;
	var hi = Math.floor(h/60) % 6;
	var f = (h / 60) - hi;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	var rgb = [0, 0, 0];
	switch(hi) {
		case 0: rgb = [v,t,p]; break;
		case 1: rgb = [q,v,p]; break;
		case 2: rgb = [p,v,t]; break;
		case 3: rgb = [p,q,v]; break;
		case 4: rgb = [t,p,v]; break;
		case 5: rgb = [v,p,q]; break;
	}
	return([
		Math.min(255, Math.round(rgb[0]*256)),
		Math.min(255, Math.round(rgb[1]*256)),
		Math.min(255, Math.round(rgb[2]*256))
	]);
}

function rgbToHsv(rgb, g, b) {
	var r;
	if(Ext.isArray(rgb)) {
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
	} else {
		r = rgb;
	}
	r /= 255;
	g /= 255;
	b /= 255;
	var min = Math.min(Math.min(r, g), b);
        var max = Math.max(Math.max(r, g), b);
        var delta = max - min;
	var value = max;
	var hue;
	if (max == min) {
		hue = 0;
	} else if (max == r) {
		hue = (60 * ((g-b) / (max-min))) % 360;
	} else if (max == g) {
		hue = 60 * ((b-r) / (max-min)) + 120;
	} else if (max == b) {
		hue = 60 * ((r-g) / (max-min)) + 240;
	}
	if (hue < 0) {
		hue += 360;
	}
	var saturation;
	if (max == 0) {
		saturation = 0;
	} else {
		saturation = 1 - (min/max);
	}
	return([
		Math.round(hue),
		Math.round(saturation * 100),
		Math.round(value * 100)
	]);
}

function invertRgbColor(rgb, g, b) {
	var r;
	if(Ext.isArray(rgb)) {
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
	} else {
		r = rgb;
	}
	return [ 255 - r, 255 - g, 255 - b ];
}

function lightColor(rgb, indexSaturation, indexValue) {
	indexSaturation = indexSaturation || 2;
	indexValue = indexValue || 1.5;
	var inputString = false;
	var gridChar = false;
	if(Ext.isString(rgb)) {
		inputString = true;
		if(rgb.charAt(0) == '#') {
			gridChar = true;
		}
		rgb = hexToRgb(rgb);
	}
	var hsv = rgbToHsv(rgb);
	hsv[1] = hsv[1] / indexSaturation;
	hsv[2] = Math.min(100, hsv[2] * indexValue);
	rgb = hsvToRgb(hsv);
	return(inputString ? (gridChar ? '#' : '') + rgbToHex(rgb) : rgb);
}

function aliasColorToHexRgb(value) {
	var aliasColorValues = {
		black:     '#000000',
		red:       '#FF0000',
		green:     '#008000',
		blue:      '#0000FF',
		cyan:      '#00FFFF',
		magenta:   '#FF00FF',
		yellow:    '#FFFF00',
		orange:    '#FFA500',
		chocolate: '#D2691E',
		bloodred:  '#660000',
		grey:      '#808080'
	};
	if(Ext.isDefined(aliasColorValues[value])) {
		value = aliasColorValues[value];
	}
	return(value);
}

function colorThemeShift(h, s, v) {
	if(!Ext.isDefined(h)) {
		h = uc_colorThemeShift_h;
	}
	if(!Ext.isDefined(s)) {
		s = uc_colorThemeShift_s;
	}
	if(!Ext.isDefined(v)) {
		v = uc_colorThemeShift_v;
	}
	ajaxSafeRequest({
		url: 'php/model/utilities.php',
		params: {
			task: 'colorThemeShiftHsv',
			params: Ext.encode({
				h: h,
				s: s,
				v: v
			})
		},
		success: function(result) {
			Ext.get('ExtAllBaseTheme').dom.innerText = result.extAllBaseTheme;
			applyColorThemeShift(h, s, v);
		}
	});
}

function applyColorThemeShift(h, s, v) {
	for(var i in window) {
		if(i.match && i.match(/^__color/) && !i.match(/_orig$/) &&
		   Ext.isString(window[i]) && window[i].charAt(0) =='#') {
			if(!Ext.isDefined(window[i + '_orig'])) {
				window[i + '_orig'] = window[i];
			}
			window[i] = applyColorThemeShift_color(window[i + '_orig'], h, s, v);
		}
	}
	var appHeader = Ext.get('app-header');
	if(appHeader) {
		var headerGradientFrom = applyColorThemeShift_color('#e1e1e1', h, s, v);
		var headerGradientTo = applyColorThemeShift_color('#b0b0b0', h, s, v);
		appHeader.setStyle({
			'background-image': Ext.isGecko ? 
						'-moz-linear-gradient(top, ' + headerGradientTo + ', ' + headerGradientFrom + ')' :
						'-webkit-linear-gradient(top, ' + headerGradientTo + ', ' + headerGradientFrom + ')'
		});
	}
	setNextCssColorRules(h, s, v);
}

function setNextCssColorRules(h, s, v) {
	addRuleToStyleSheet(
		'.panel-background-color', 
		'background-color: ' + applyColorThemeShift_color('#EAEAEA', h, s, v),
		undefined, undefined, true, true);
	addRuleToStyleSheet(
		'.frame_window-background-color', 
		'background-color: ' + applyColorThemeShift_color('#E8E8E8', h, s, v),
		undefined, undefined, true, true);
	addRuleToStyleSheet(
		'.panel-border-background-color', 
		'background-color: ' + applyColorThemeShift_color('#D0D0D0', h, s, v),
		undefined, undefined, true, true);
}

function applyColorThemeShift_color(color, h, s, v) {
	if(!Ext.isDefined(h) && Ext.isDefined(window.uc_colorThemeShift_h)) {
		h = uc_colorThemeShift_h;
	}
	if(!Ext.isDefined(s) && Ext.isDefined(window.uc_colorThemeShift_s)) {
		s = uc_colorThemeShift_s;
	}
	if(!Ext.isDefined(v) && Ext.isDefined(window.uc_colorThemeShift_v)) {
		v = uc_colorThemeShift_v;
	}
	if(Ext.isDefined(h) || Ext.isDefined(s) || Ext.isDefined(v)) {
		var colorHsv = rgbToHsv(hexToRgb(color));
		return('#' + rgbToHex(hsvToRgb(h, colorHsv[1] + s, colorHsv[2] + v)));
	} else {
		return(color);
	}
}

function isHexColor(color) {
	if(color.charAt(0) == "#") {
		color = color.substring(1);
	}
	return(color.match(/^[0-9a-f]{6}$/i));
}
