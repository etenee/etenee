var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')
const async = require('async')

let dates = ['2014-02-11', '2017-02-11', '2016-02-11', '2016-12-21', '2016-06-14', '2015-08-16'];

let list = [];

let i = 0;

let randomIndex = null;
let randomDate = null;

/*while (i < 5) {
    randomIndex = Math.floor((Math.random() * 6) + 0);
    console.log(dates[randomIndex]);
    i = i+1;
}*/

/*async.series([
    function(callback) {
        db.all('SELECT * from passedCourses ORDER BY RANDOM() LIMIT 100;', function(err, complete) {
            //console.log(err);
            list.push(complete);
            callback();
            //console.log(complete);
        });
    },
    function(callback) {
        list.forEach(function(course) {
            randomIndex = Math.floor((Math.random() * 3) + 0);
            randomDate = dates[randomIndex]
            //db.run('UPDATE passedCourses SET date = "'+randomDate+';');
            console.log(randomDate + course.courseId + course.studentId);
        });
        callback();
    }
]);*/

    

/*const changeDates = function() {
    list.forEach(function(course) {
        let randomIndex = Math.floor((Math.random() * 3) + 0);
        let randomDate = dates[randomIndex]
        db.run('UPDATE passedCourses SET date = "'+randomDate+';');
    });
}*/

/*pickCourses(list, function() {
    list.forEach(function(course) {
        let randomIndex = Math.floor((Math.random() * 3) + 0);
        let randomDate = dates[randomIndex]
        db.run('UPDATE passedCourses SET date = "'+randomDate+';');
    });
});*/
