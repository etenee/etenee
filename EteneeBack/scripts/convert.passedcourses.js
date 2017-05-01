var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')
var moment = require('moment');

var all = require('.././data/all.json');
var mass = require('.././data/massData.json');
var combinedList = {};
combinedList.students = all.students.concat(mass.students);
let dates = ['2014-02-11', '2017-02-11', '2016-02-11', '2016-12-21', '2016-06-14', '2015-08-16', '2017-05-1'];
let randomIndex = null;
let randomDate = null;

//randomIndex = Math.floor((Math.random() * 6) + 0);
    //console.log(dates[randomIndex]);

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS passedCourses');
  //db.run('CREATE TABLE if not exists passedCourses (courseId varchar(20) PRIMARY KEY NOT NULL, FOREIGN KEY(studentId) REFERENCES students(studentId))');
  db.run('CREATE TABLE if not exists passedCourses (courseId varchar(20), date TEXT, studentId integer, name TEXT);');
});

/*for (let student of all.students) {
  db.run('INSERT INTO students VALUES (' + student.id', "' + student.firstName + '", "' + student.lastName +'", ' + student.totalCredits + ', ' + student.otherCredits + ');');
}*/

//console.log(Date('11-06-1989'));

for (let student of combinedList.students) {
  for (let course of student.passedCourses) {
    //var superDate = new Date(course.date);
    //var superDate = moment().format('YYYY-MM-DD');
    var id = student.id;
    randomIndex = Math.floor((Math.random() * 7) + 0);
    var superDate = dates[randomIndex];
    //var finalDate = Date.toDateString(superDate);
    //console.log(student.id + typeof(student.id));
    console.log('course code: ' + course.courseId);
    console.log('course date: ' + superDate);
    console.log('course student id: ' + student.id);
    db.run('INSERT INTO passedCourses VALUES("'+course.courseId+'","'+superDate+'",'+student.id+', "'+course.name+'");');
    //db.run('INSERT OR REPLACE INTO passedCourses VALUES ('+course.code+');');
  }
};
