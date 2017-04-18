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
const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude';

  return this.name;
};

userSchema.methods.terminate = function() {
  mongoose.connection.close();
}

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
