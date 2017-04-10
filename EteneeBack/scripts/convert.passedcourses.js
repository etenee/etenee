var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')
var moment = require('moment');

var all = require('.././data/all.json');

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS passedCourses');
  //db.run('CREATE TABLE if not exists passedCourses (courseId varchar(20) PRIMARY KEY NOT NULL, FOREIGN KEY(studentId) REFERENCES students(studentId))');
  db.run('CREATE TABLE if not exists passedCourses (courseId varchar(20), date TEXT, studentId integer);');
});

/*for (let student of all.students) {
  db.run('INSERT INTO students VALUES (' + student.id', "' + student.firstName + '", "' + student.lastName +'", ' + student.totalCredits + ', ' + student.otherCredits + ');');
}*/

//console.log(Date('11-06-1989'));

for (let student of all.students) {
  for (let course of student.passedCourses) {
    var superDate = new Date(course.date);
    var superDate = moment(superDate).format('YYYY-MM-DD');
    var id = student.id;
    //var finalDate = Date.toDateString(superDate);
    //console.log(student.id + typeof(student.id));
    console.log('course code: ' + course.code);
    console.log('course date: ' + superDate);
    console.log('course student id: ' + student.id);
    db.run('INSERT INTO passedCourses VALUES("'+course.code+'","'+superDate+'",'+student.id+');');
    //db.run('INSERT OR REPLACE INTO passedCourses VALUES ('+course.code+');');
  }
};
