//import express
var express = require('express');
var app = express();

//import prototype dummy data
var data = require ('./data/data.json');
var fm = require ('./data/fmTrue.json');
var all = require ('./data/all.json');
var bachelorCurriculum = require ('./data/curriculum.json');

//assign port
var port = process.env.PORT || 3001;

//This makes the app use CORS-header with every response
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//default endpoint responds with var data
app.get('/', function(req, res) {
	res.json(data);
});

//fm endpoint responds with var fm
app.get('/fm/', function(req, res) {
	res.json(fm);
});

app.get('/students/', function(req, res) {
	res.json(all);
});

app.get('/bachelorCurriculum/', function(req, res) {
	res.json(bachelorCurriculum);
});

//server will listen to port 3001
app.listen(3001);
console.log('Listening on port ' + port);
