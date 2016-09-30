"use strict";

require('colors');

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	http        = require('http'),
	path        = require('path'),
	serveStatic = require('serve-static'),
    api 		= require('./routes/api');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3002);
app.use(serveStatic(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/', function (req, res) {
	res.render('index');
});

// JSON API
//FIXME: app


server.listen(app.get('port'), function() {
	console.log('✔︎︎ Express server listening on http://localhost:%d/' + 'server/api/movie-list' .green, app.get('port'));
});
