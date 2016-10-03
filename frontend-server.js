"use strict";

var express = require('express'),
		bodyParser = require('body-parser'),
		http = require('http'),
		path        = require('path'),
		serveStatic = require('serve-static');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 9000);

app.use(serveStatic(path.join(__dirname, 'app')));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	next();
});

app.get('/', function (req, res) {
	res.render('index');
});

server.listen(app.get('port'), function () {
	console.log('Express server listening on http://localhost:%d', app.get('port'));
});
