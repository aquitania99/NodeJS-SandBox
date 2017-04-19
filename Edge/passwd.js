'use strict';
const Password = require('./models/password');
const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');

console.log('Veromo Password - Node Sandbox');

const message = 'M65E0B7FB2A091'; //config.edge_username;

// console.log("Reading... " + res);
const encrypted = encrypt(message);
const decrypted = decrypt(encrypted);

// console.log("Going to write into existing file");
console.log("Saving " + decrypted + " to MongoDB....");
let EdgePassword = new Password({
  password: encrypted,
  plainTxt: decrypted
});

EdgePassword.save(function(err) {
  if(err) throw err;
  console.log('Password saved successfully....');
});

console.log('Testing stuff...',EdgePassword.getPassword);

EdgePassword.close;
// console.log("Dev: ", config.name);
// console.log("edgeUser: ", config.edge_username);
// console.log("edgeServer: ", config.edge_host1);
// console.log("edgePort: ", config.edge_port);
