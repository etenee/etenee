var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')

var all = require('.././data/all.json');
var mass = require('.././data/massData.json');
var combinedList = {};
combinedList.students = all.students.concat(mass.students);

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS students;');
  db.run('CREATE TABLE if not exists students (studentId integer PRIMARY KEY NOT NULL, firstName varchar(30), lastName varchar(30), totalCredits integer, otherCredits integer, instructorId integer, instructorName varchar(30), instructorNameBrev varchar(5), email TEXT, curriculum varchar(30));');
});

/*for (let student of all.students) {
  db.run('INSERT INTO students VALUES (' + student.id', "' + student.firstName + '", "' + student.lastName +'", ' + student.totalCredits + ', ' + student.otherCredits + ');');
}*/

for (let student of combinedList.students) {
  db.serialize(function() {
    let instructorName = null;
    let instructorNameBrev = null;
    db.get('select firstName, lastName from users where userId = '+student.instructorId+';',function(err, row) {
      instructorName = row.firstName + ' ' + row.lastName;
      instructorNameBrev = row.firstName[0] + row.lastName[0];
      email = student.firstName + student.lastName + '@gmail.com';
      console.log(instructorName);
      db.run('INSERT OR REPLACE INTO students VALUES ('+student.id+', "'+student.firstName+'", "'+student.lastName+'", '+student.totalCredits+', '+student.otherCredits+', '+student.instructorId+',"'+instructorName+'", "'+instructorNameBrev+'", "'+email+'", "'+student.curriculum.ops+'");');
    });
  });
};

//console.log(combinedList);