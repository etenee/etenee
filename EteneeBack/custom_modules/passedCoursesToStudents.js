var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./models/database.db')
const Promise = require('bluebird');
const async = require('async');

const passedCourses = function(list, call) {
  const studentsList = list;
  //iterate over every student
  async.forEachOf(studentsList.students, function(object, key, callback){
    if (studentsList.students[key].passedCourses === undefined) {
      studentsList.students[key].passedCourses = [];
    }
    //find passedcourses from student
    db.each('SELECT * FROM passedCourses WHERE studentId = '+studentsList.students[key].studentId,
      function(err, row) {
        console.log(row.courseId, row.date);
        let id = row.courseId;
        let date = row.date;
        //this line is a temporary solution. Push course code as a key and date of approval
        //straight into student object. React table eats this data directly
        studentsList.students[key][id] = date;
        //console.log(studentsList.students[key].studentId);
        //studentsList.students[key].passedCourses.push(row);
        studentsList.students[key].passedCourses.push(row);//push into passed courses
      },
      function() {
        callback();
      });
    },
    function(done) {
      //console.log(studentsList.students);
      //execute callback function, studentsList as an arguent
      call(studentsList);
    });
  }

  module.exports = passedCourses;
