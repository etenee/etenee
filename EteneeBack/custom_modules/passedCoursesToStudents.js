var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./models/database.db')
const Promise = require('bluebird');
const async = require('async');

const passedCourses = function(list, call) {
  const studentsList = list;
  async.forEachOf(studentsList.students, function(object, key, callback){
    if (studentsList.students[key].passedCourses === undefined) {
      studentsList.students[key].passedCourses = [];
    }
    db.each('SELECT * FROM passedCourses WHERE studentId = '+studentsList.students[key].studentId,
      function(err, row) {
        console.log(row.courseId, row.date);
        let id = row.courseId;
        let date = row.date;
        studentsList.students[key][id] = date;
        //console.log(studentsList.students[key].studentId);
        //studentsList.students[key].passedCourses.push(row);
        studentsList.students[key].passedCourses.push(row);
      },
      function() {
        callback();
      });
    },
    function(done) {
      //console.log(studentsList.students);
      call(studentsList);
    });
  }

  module.exports = passedCourses;
