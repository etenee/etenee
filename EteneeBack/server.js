let cluster = require('cluster');
//divide the app to workers (node solution for multithreading), one for each machine CPU
//this will improve speed and recovers from errors automatically
if (cluster.isMaster) {
  const os = require('os');
  console.log('Server type is ' + os.type());
  // Count the machine's CPUs
  var cpuCount = os.cpus().length;
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  //this code belongs to cluster workers
  //import express
  var express = require('express');
  var bodyParser = require('body-parser');
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
  const passedCourses = require('./custom_modules/passedCoursesToStudents');
  //var database = require('./models/database.db');

  //assign port
  var port = process.env.PORT || 3001;

  //This makes the app use CORS-header with every response
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //default endpoint responds with var data
  /*
  jos tahtoo pommittaa curlilla, tällä voi
  curl -X POST -H 'Content-Type: application/json' -d '{"studentId":"5"}' http://localhost:3001/changeCurriculum
  */
  app.post('/changeCurriculum', function(req, res) {
  	console.log(req.body.studentId);
    res.json('you sent' + req.body.studentId);
  });

  app.get('/studentsdb/', function(req, res) {
  	//res.json(all);
    db.all('SELECT * FROM students', function(err, row) {
      console.log(row);
    },
    function(err, complete) {
      //console.log('complete');
      const list = { students: complete }
      passedCourses(list, function(response) {
        if (response) {
          res.json(response);
        }
      });
    });
  });

  app.get('/students', function(req, res) {
    res.json(all);
  });

  app.get('/curriculums', function(req, res) {
    const list = [];
    db.each('SELECT * from curriculumGroup',
    function(err, row) {//this is executed with every completed database row
      list.push(row);
    },
    function (err, complete) {//this is executed when whole query in complete
      if (err) {//handle error
        console.log(err);
      }
      //run populate exported from custom modules, run function below as callback
      populate(list, function(response) {
        if (response) {
          res.json(response);
          //log which worker handled this case
          console.log('curriculums sent! -Worker %d', cluster.worker.id);
        };
      })
    });
  });

  //server will listen to port 3001
  app.listen(3001);
  console.log('Cluster worker %d has come to life, Listening on port ' + port, cluster.worker.id);
  }

cluster.on('exit', function (worker) {
  //spawn new worker if old one fails due to error
  console.log('Worker %d died, creating new Worker', worker.id);
  cluster.fork();

});
