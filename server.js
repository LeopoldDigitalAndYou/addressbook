"use strict";

const apiPath = '/server/api/addressbook';

var express = require('express'),
		bodyParser = require('body-parser'),
		http = require('http'),
		api = require('./routes/api');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3002);
app.use(function (req, res, next) {
	req.headers['content-type'] = 'application/json';
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

// JSON API
app.get(apiPath, api.query);
app.get(apiPath + '/search/', api.badRequest);
app.get(apiPath + '/search/:name', api.searchByName);
app.get(apiPath + '/:id', api.get);
app.get(apiPath + '/:id/birthday', api.getBirthday);
app.post(apiPath, api.add);
app.put(apiPath + '/:id', api.update);
app.delete(apiPath + '/:id', api.delete);

server.listen(app.get('port'), function () {
	console.log('Express server listening on http://localhost:%d' + apiPath, app.get('port'));
});
