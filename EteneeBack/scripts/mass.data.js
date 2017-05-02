//this script creates a massive student JSON file from firstNames and surNames tables
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
            });p
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

//async series executes functions serially
async.series([
    function(callback) {
        //run all db queries in series, not asynchronically
        db.serialize(function() {
            //select all from curriculumGroup and turn into a list
            db.all('SELECT * FROM curriculumGroup;',
                function(err, complete) {
                //console.log(complete);
                //console.log(massList[index]);
                curriculumList = complete;
                console.log('first');
                }
            );
            //select 200 random names from firstNames
            db.all('SELECT name FROM firstnames ORDER BY RANDOM() LIMIT 200;',
            function(err, complete) {
                console.log('second');
                firstnames = complete;
            });
            //select 200 random names from surnames
            db.all('SELECT name FROM surnames ORDER BY RANDOM() LIMIT 200;',
            function(err, complete) {
                console.log('third');
                surnames = complete;
                iterate(surnames, firstnames);//run iterate function, declared in upper scope
                callback();//after queries, execute this so async series knows it can proceed
            });
            
    });
    },
    function(callback) {
        //for each cell in mass list, run these queries
        async.forEachOf(massList, function(object, key, call){
            db.all('SELECT * FROM '+massList[key].curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                massList[key].passedCourses = complete;
                console.log(complete);
                call();//after done, this gets executed
            });
        },
        function() {
            console.log('courses passed');
            callback();//async series knows it can proceed
        });
        
    },
    function(callback) {
        //same logic as above
        async.forEachOf(massList, function(object, key, call){
            db.all('SELECT * FROM '+massList[key].curriculum.ops+' ORDER BY RANDOM() LIMIT 4;', function(err, complete) {
                massList[key].courses = complete;
                //console.log('unpassing courses');
                call();//and again
            });
        },
        function() {
            console.log('courses unpassed');
            callback();//and again
        });
    },
    function(callback) {
        //and again
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
            callback();//proceed
        });
    },
    function(callback) {
        let json = JSON.stringify(massList);
        //fs.writeFile('massData.json', json);//uncomment this to write data into a JSON file.
        console.log('made json');
    }
]);

