// grab the things we need
// const mongoose = require('../../config/mongo');
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

// make this available to our users in our Node applications
const Password =  mongoose.model('passwords', passwordsSchema);
const latestPwd = Password.find({}).sort({createdOn: -1}).limit(1);

const close = mongoose.connection.close();
module.exports = Password;
