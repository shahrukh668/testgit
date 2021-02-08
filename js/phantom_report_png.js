var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var width = system.args.length > 1 ? system.args[1] : 0;
page.content = fs.read('/dev/stdin');

page.onError = function (msg, trace) {
	fs.write('/dev/stderr', 'ERROR: ' + msg + '\n', 'w');
	trace.forEach(function(item) {
		fs.write('/dev/stderr', 'trace: ' + item.file + ' : ' + item.line + '\n', 'w');
	});
	phantom.exit(2);
};
    
window.setTimeout(function () {
	if(width) {
		page.viewportSize = { width: width, height: 1 };
	}
	page.render('/dev/stdout', { format: 'png' });
	phantom.exit();
}, 250);
