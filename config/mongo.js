// grab the things we need
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://localhost/sandbox');
//
// const db = mongoose.connection;
//
// db.on('error', function(err){
//   console.log('connection error', err);
// });
//
// db.once('open', function(){
//   console.log('Connection to DB successful');
// });

// make this available to our users in our Node applications
module.exports = mongoose;
