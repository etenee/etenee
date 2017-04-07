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

app.get('/db/', function(req, res) {
  db.each('SELECT * from courses', function(err, row){
    console.log(row.id + '' + row.code + '' + row.name);
    res.json({id: row.id, code: row.code, name: row.name});
  })
});


app.get('/wholedb/', function(req, res) {
  exporter.all(function(err, all) {
    res.json(all)
  });
});

/*
for (curriculum of group) {
  //console.log(curriculum);
  let name = curriculum.curriculumName
  jsonExporter.json({table: JSON.stringify(name)}, function(err, result) {
    chart.push({name: result});
    //console.log(chart, group.length);
  });
}*/

app.get('/curriculumGroup/', function(req, res) {
  jsonExporter.json({table: 'curriculumGroup'}, function(err, data) {
    const group = JSON.parse(data);
    console.log(group);
    chart = [];
    for (curriculum of group) {
      //console.log(curriculum);
      let name = curriculum.curriculumName
      jsonExporter.json({table: JSON.stringify(name)}, function(err, result) {
        chart.push({name: result});
        //console.log(chart, group.length);
      });
    }
    res.json(chart);
  });
});

app.get('/shit', function(req, res, next) {
  let grouplist = [];
  let curriculums = [];
  async.series([
    function(result) {
      jsonExporter.json({table: 'curriculumGroup'}, function(err, data) {
        grouplist = JSON.parse(data);
      });
      console.log('list');
      result();
    },
    function(callback) {
      for (curriculum of grouplist) {
        //console.log(curriculum);
        let name = curriculum.curriculumName
        jsonExporter.json({table: JSON.stringify(name)}, function(err, result) {
          curriculums.push({name: result});
          //console.log(chart, group.length);
        });
      }
      console.log('curriculums');
      callback();
    },
    function(final) {
      console.log('final');
      res.json(curriculums);
      final();
    }
  ]);
});

app.get('/group', function(req, res) {
  let grup = [];
  let group = new Promise(function(resolve,reject) {
    let result = {};
    jsonExporter.json({table: 'curriculumGroup'}, function(err, data) {
      resolve(grup = JSON.parse(data));
    });
  });

    let table = new Promise(function(resolve, reject) {
      let chart = [];
      for (curriculum of group) {
        //console.log(curriculum);
        let name = curriculum.curriculumName
        jsonExporter.json({table: JSON.stringify(name)}, function(err, result) {
          chart.push({name: result});
          //console.log(chart, group.length);
        });
      }
      resolve(chart);
    });

  let chart = new Promise(function(resolve, reject, input) {
    let result = 'string';
    console.log(input);
  });

  group.then(function(success) {
    res.json(success);
  });
});

app.get('/test', function (req, res) {
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
});

//server will listen to port 3001
app.listen(3001);
console.log('Listening on port ' + port);
