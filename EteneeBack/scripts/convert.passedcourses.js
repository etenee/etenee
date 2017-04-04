var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')

var all = require('.././data/all.json');

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS passedCourses');
  db.run('CREATE TABLE if not exists passedCourses (courseId varchar(20) PRIMARY KEY NOT NULL, FOREIGN KEY(studentId) REFERENCES students(studentId))');
});

/*for (let student of all.students) {
  db.run('INSERT INTO students VALUES (' + student.id', "' + student.firstName + '", "' + student.lastName +'", ' + student.totalCredits + ', ' + student.otherCredits + ');');
}*/

for (let student of all.students) {
  //
};
