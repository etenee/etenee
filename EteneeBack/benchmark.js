const siege = require('siege');
siege('node server.js')
  .wait(1000)
  .on(3001)
  .for(10000).times
  .get('/studentsdb')
  .get('/curriculums')
  .attack()
