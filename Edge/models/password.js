const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/sandbox');

const Schema = mongoose.Schema;

// create a schema
const passwordsSchema = new Schema({
  password: { type: String, required: true },
  plainTxt: String,
  createdOn: { type: Date, default: Date.now }
});
let passwordQuery = mongoose.model('Password', passwordsSchema).find({}).sort({createdOn:-1}).limit(1).select('password -_id');
let getPassword = passwordQuery.exec();

getPassword.then((data) => {
  return data
});

// make this available to our users in our Node applications
//const Password =  mongoose.model('passwords', passwordsSchema);
//console.log('Reading password LES OutSide... ',res);
const close = mongoose.connection.close();
module.exports = mongoose.model('Password', passwordsSchema);;
