var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./models/database.db')
const Promise = require('bluebird');
const async = require('async');


const populate = function (list1, call) {
  let list = list1;
  console.log(list);
  console.log('in populate');
  async.forEachOf(list, function(object, key, callback){
    console.log('in async');
    if (list[key].courses === undefined) {
      list[key].courses = [];
    }
    db.each('SELECT * FROM '+list[key].curriculumName, function(err, row) {
      list[key].courses.push(row);
    },
  function() {
    callback();
  });
  },
  function(done) {
    call(list);
  });
};

module.exports = populate;
