var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var pageFormat = 'A4';
var bodyStyleZoom = 0;
var pageOrientation = 'portrait';

for (i = 0; i < system.args.length; i++) {
	var sval = system.args[i].indexOf("=");
	if (sval < 0) {
		continue;
	}
	var value = system.args[i].substring(sval + 1, system.args[i].length);
	if (system.args[i].indexOf("--zoom=") >= 0) {
		bodyStyleZoom = value;
	} else if (system.args[i].indexOf('--orientation=') >= 0) {
		pageOrientation = value;
	} else if (system.args[i].indexOf("--pageformat=") >= 0) {
		pageFormat = value;
	}
}

page.content = fs.read('/dev/stdin');

page.onError = function (msg, trace) {
	fs.write('/dev/stderr', 'ERROR: ' + msg + '\n', 'w');
	trace.forEach(function(item) {
		fs.write('/dev/stderr', 'trace: ' + item.file + ' : ' + item.line + '\n', 'w');
	});
	phantom.exit(2);
};
    
page.paperSize = { 
	format: pageFormat, 
	orientation: pageOrientation,
	margin: '1cm' 
};

page.evaluate(function() { if(window.setPrintPageSize) window.setPrintPageSize(); });
window.setTimeout(function () {
	if(bodyStyleZoom) {
		page.evaluate(function(zoom) { document.body.style.zoom = zoom; }, bodyStyleZoom);
	}
	page.render('/dev/stdout', { format: 'pdf' });
	phantom.exit();
}, 250);
