var stathat = require('stathat');
var request = require('request');


setInterval(function() {
	iMetricalFetch(function(error, feeds) {
		var f0 = feeds.feeds[0];
		var scope = f0.name;
		var t = f0.obs[0].t;
		var v = f0.obs[0].v[0];
		// console.log(scope, t, v);
		stathat.trackEZValue("daniel.lauzon@gmail.com", "iMetrical-"+scope, v, function(status, json) {
			// console.log("status: " + status);
			// console.log("json:   " + json);
			console.log(scope, t, v, "status: " + status);
		});
	});
}, 1000);

function iMetricalFetch(cb) {
	// var host = 'http://cantor.imetrical.com';
	var host = 'http://dl.imetrical.com:8888';
	var uri = host + '/iMetrical/feedsJSON.php';
	request.get({
		uri: uri,
		json: true
	}, function(error, response, body) {
		cb(error, body);
	});
}