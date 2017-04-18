'use strict';
// Trying Promise
const Password = require('./models/password');
const Encrypt = require('../helpers/encrypt');
const Decrypt = require('../helpers/decrypt');
const Trim = require('../helpers/trim');

let test = Encrypt("papafrita");
let lalala = test.toString();
console.log('Getting Results? ',test.toString());
console.log("Is it a string?? ", lalala );
console.log(typeof lalala);

let deTest = Decrypt(lalala);
console.log("Decrypting?... ",deTest);

console.log(typeof Password.getPassword);
