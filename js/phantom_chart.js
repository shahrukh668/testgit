var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var delay = system.args.length > 1 ? system.args[1] : 0;
page.content = fs.read('/dev/stdin');

page.onError = function (msg, trace) {
	fs.write('/dev/stderr', 'ERROR: ' + msg + '\n', 'w');
	trace.forEach(function(item) {
		fs.write('/dev/stderr', 'trace: ' + item.file + ' : ' + item.line + '\n', 'w');
	});
	phantom.exit(2);
};

var i = 0;
window.setInterval(function() {
	if(i > 40) {
		phantom.exit(1);
	}
	if(i * 250 >= delay &&
	   page.evaluate(function() { return window.chart && window.chart.getSvg(); })) {
		var svg = page.evaluate(function() { return window.chart.getSvg(); });
		if(svg) {
			console.log(svg);
			phantom.exit(0);
		}
	}
	++i;
}, 250);
