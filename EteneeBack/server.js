var express = require('express');
var app = express();

var data = require ('./data/data.json');
var fm = require ('./data/fm.json');

var port = process.env.PORT || 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	res.json(data);
});

app.get('/fm/', function(req, res) {
	res.json(fm);
});

app.listen(3001);
console.log('Listening on port ' + port);
