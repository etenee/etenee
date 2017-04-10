//import express
var express = require('express');
var app = express();


//import prototype dummy data
var data = require ('./data/data.json');
var fm = require ('./data/fmTrue.json');
var all = require ('./data/all.json');
var bachelorCurriculum = require ('./data/curriculumLuk14.json');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./models/database.db')
const async = require('async');
const Promise = require('bluebird');
const sqliteToJson = require('sqlite-to-json');
const sqliteJSON = require('sqlite-json');
const jsonExporter = sqliteJSON(db);
const exporter = new sqliteToJson({
  client: new sqlite3.Database('./models/database.db')
});

const populate = require('./custom_modules/populate.js');
//var database = require('./models/database.db');

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

app.get('/curriculums', function(req, res) {
  const list = [];
  db.each('SELECT * from curriculumGroup',
  function(err, row) {
    list.push(row);
  },
  function (err, complete) {
    if (err) {
      console.log(err);
    }
    populate(list, function(response) {
      if (response) {
        res.json(response);
        console.log('curriculums sent');
      };
    })
  });
});

/*app.get('/test', function (req, res) {
  let list = [1, 2, 4];
  let promisq = new Promise(function(resolve, reject) {
    value = 0;
    for (i of list) {
      value++
    }
    resolve(value);
  });
  promisq.then(function(success) {
    console.log(success);
    res.json(success);
  });
});*/

//server will listen to port 3001
app.listen(3001);
console.log('Listening on port ' + port);
