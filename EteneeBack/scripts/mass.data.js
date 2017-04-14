var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('.././models/database.db')

let firstnames = null;
let surnames = null;
let massList = [];

db.all('SELECT name FROM firstnames ORDER BY RANDOM() LIMIT 1000;',
function(err, row) {
    //console.log(row);
},
function(err, complete) {
    firstnames = complete;
    db.all('SELECT name FROM surnames ORDER BY RANDOM() LIMIT 1000;',
    function(err, row) {
        //console.log(row);
    },
    function(err, complete) {
        surnames = complete;
        for (index in surnames) {
            massList.push({firstname: firstnames[index].name});
            massList.push({surname: surnames[index].name});
            console.log(massList[index]);
        }
    });
});