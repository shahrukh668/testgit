var page = require('webpage').create();
var fs = require('fs');
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
	if(page.evaluate(function() { return document.getElementById('ok'); })) {
		var rslt = page.evaluate(function() { var div = document.getElementById('rslt'); return(div ? div.innerHTML : null); });
		if(rslt) {
			console.log(rslt);
			phantom.exit(0);
		}
	}
	++i;
}, 250);
