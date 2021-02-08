var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var format = system.args.length > 1 ? system.args[1] : 'pdf';
page.content = fs.read('/dev/stdin');

page.onError = function (msg, trace) {
	fs.write('/dev/stderr', 'ERROR: ' + msg + '\n', 'w');
	trace.forEach(function(item) {
		fs.write('/dev/stderr', 'trace: ' + item.file + ' : ' + item.line + '\n', 'w');
	});
	phantom.exit(2);
};

var size = page.evaluate(function() {
	width = document.getElementsByTagName('svg')[0].getAttribute("width");
	height = document.getElementsByTagName('svg')[0].getAttribute("height");
	return {'width': width, 'height': height};
});

window.setInterval(function() {
	page.clipRect = { top: 8, left: 8, width: size.width, height: size.height };
	page.render('/dev/stdout', { format: format });
	phantom.exit();
}, 250);
