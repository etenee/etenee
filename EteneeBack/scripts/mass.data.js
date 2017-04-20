var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('.././models/database.db');
const async = require('async');
let fs = require('fs');

let firstnames = null;
let surnames = null;
let massList = [];
let curriculumList = null;

const iterate = function(surNames, firstNames) {
    console.log('iterating');
    for (index in surNames) {
        //console.log(complete);
        let randomId = Math.floor((Math.random() * 30000) + 10000);
        let randomQueryNum = Math.floor((Math.random() * 10) + 1);
        let randomIndex = Math.floor((Math.random() * 3) + 0);
        let otherCred =  Math.floor((Math.random() * 20) + 0);
        //console.log(randomId);
        massList.push({firstName: firstNames[index].name, lastName: surNames[index].name, id: randomId,
            curriculum: {ops: curriculumList[randomIndex].curriculumName},
            instructorId: 5,
            otherCredits: otherCred
        });
        //console.log(massList[index]);
        //console.log(massList[index]);
        //massList.push({lastName: surNames[index].name});
        //console.log(massList[index]);
    }
    //callback();
}

const makePassedCourses = function () {
    //let passedCourses = null;
    console.log('passing');
    //console.log(list);
    db.serialize(function() {
        massList.forEach(function(student) {
            db.all('SELECT * FROM '+student.curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                student.passedCourses = complete;
                //console.log(student);
            });
        });
    });
    //callback();
}

const addCredits = function () {
    /*for (student of list) {
        let totalCreds = 0;
        console.log(student);
        for (course of student.passedCourses) {
            totalCreds = totalCreds + course.credits;
        }
        student.totalCredits = totalCreds;
    }*/
    console.log(massList);
    //callback();
}

const makeCourses = function () {
    //let passedCourses = null;
    console.log('passing');
    //console.log(list);
    db.serialize(function() {
        massList.forEach(function(student) {
            db.all('SELECT * FROM '+student.curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                student.courses = complete;
                //console.log(student);
            });
        });
    });
    //callback();
}
const prepare = function() {
    db.serialize(function() {
        db.all('SELECT * FROM curriculumGroup;',
            function(err, complete) {
            //console.log(complete);
            //console.log(massList[index]);
            curriculumList = complete;
            console.log('first');
            }
        );
        db.all('SELECT name FROM firstnames ORDER BY RANDOM() LIMIT 200;',
        function(err, complete) {
            console.log('second');
            firstnames = complete;
        });
        db.all('SELECT name FROM surnames ORDER BY RANDOM() LIMIT 200;',
        function(err, complete) {
            console.log('third');
            surnames = complete;
            iterate(surnames, firstnames);
        });
    });
};

async.series([
    function(callback) {
        db.serialize(function() {
            db.all('SELECT * FROM curriculumGroup;',
                function(err, complete) {
                //console.log(complete);
                //console.log(massList[index]);
                curriculumList = complete;
                console.log('first');
                }
            );
            db.all('SELECT name FROM firstnames ORDER BY RANDOM() LIMIT 200;',
            function(err, complete) {
                console.log('second');
                firstnames = complete;
            });
            db.all('SELECT name FROM surnames ORDER BY RANDOM() LIMIT 200;',
            function(err, complete) {
                console.log('third');
                surnames = complete;
                iterate(surnames, firstnames);
                callback();
            });
            
    });
    },
    function(callback) {
        async.forEachOf(massList, function(object, key, call){
            db.all('SELECT * FROM '+massList[key].curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                massList[key].passedCourses = complete;
                console.log(complete);
                call();
            });
        },
        function() {
            console.log('courses passed');
            callback();
        });
        
    },
    function(callback) {
        async.forEachOf(massList, function(object, key, call){
            db.all('SELECT * FROM '+massList[key].curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                massList[key].courses = complete;
                //console.log('unpassing courses');
                call();
            });
        },
        function() {
            console.log('courses unpassed');
            callback();
        });
    },
    function(callback) {
        async.forEachOf(massList, function(object, key, call){
            //console.log('set to zero');
            massList[key].totalCredits = 0;
            massList[key].passedCourses.forEach(function(course) {
                massList[key].totalCredits = massList[key].totalCredits + course.credits;
                //console.log('add credits');
            });
            call();
        },
        function() {
            console.log('credits added');
            //console.log(massList);
            callback();
        });
    },
    function(callback) {
        let json = JSON.stringify(massList);
        //fs.writeFile('massData.json', json);
        console.log('made json');
    }
]);



/*db.all('SELECT name FROM firstnames ORDER BY RANDOM() LIMIT 200;',
function(err, row) {
    //console.log(row);
},
function(err, complete) {
    firstnames = complete;
    db.all('SELECT name FROM surnames ORDER BY RANDOM() LIMIT 200;',
    function(err, row) {
        //console.log(row);
    },
    function(err, complete) {
        surnames = complete;
        for (index in surnames) {
            //console.log(complete);
            let randomId = Math.floor((Math.random() * 30000) + 10000);
            let randomQueryNum = Math.floor((Math.random() * 10) + 1);
            let randomIndex = Math.floor((Math.random() * 3) + 0);
            //console.log(randomId);
            massList.push({firstName: firstnames[index].name, lastName: surnames[index].name, id: randomId,
                curriculum: {ops: curriculumList[randomIndex].curriculumName}
            });
            //console.log(massList[index]);
            console.log(massList[index]);
            //massList.push({lastName: surnames[index].name});
            //console.log(massList[index]);
        }
    });
});*/