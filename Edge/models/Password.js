// grab the things we need
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/sandbox');

const db = mongoose.connection;

db.on('error', function(err){
console.log('connection error', err);
});

db.once('open', function(){
console.log('Connection to DB successful');
});

const Schema = mongoose.Schema;

// create a schema
const passwordSchema = new Schema({
  password: { type: String, required: true },
  plainTxt: String,
  created_at: Date
});

passwordSchema.methods.terminate = function() {
  mongoose.connection.close();
}

// the schema is useless so far
// we need to create a model using it
const Password = mongoose.model('Password', passwordSchema);

// make this available to our users in our Node applications
module.exports = Password;
