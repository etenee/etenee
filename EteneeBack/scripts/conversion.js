var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')
var curriculumFm14 = require('.././data/curriculumFm14.json');
var curriculumFm15 = require('.././data/curriculumFm15.json');
var curriculumLuk14 = require('.././data/curriculumLuk14.json');
var curriculumLuk15 = require('.././data/curriculumLuk15.json');

let curriculumArray = [
  {name: "curriculumFm14",
    data: curriculumFm14},
  {name: "curriculumFm15",
    data: curriculumFm15},
  {name: "curriculumLuk14",
    data: curriculumLuk14},
  {name: "curriculumLuk15",
    data: curriculumLuk15}
  ];

  for (value of curriculumArray) {
    let curriculumName = value.name;
    let coursesArray = value.data.courses;
    db.serialize(function() {
      db.run('DROP TABLE IF EXISTS '+value.name+';');
      db.run('CREATE TABLE if not exists ' + value.name + '(credits integer, courseId varchar(20) PRIMARY KEY NOT NULL, name varchar(30))');
    });

    for (course of coursesArray) {
      //db.run('INSERT INTO '+ curriculumName +' VALUES ('course.credits ',"'course.code'","'course.name'")');
      db.run('INSERT OR REPLACE INTO ' + curriculumName + ' VALUES ('+course.credits+',"'+course.code+'","'+course.name+'");' );
    }
  };
