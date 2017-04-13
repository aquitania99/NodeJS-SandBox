'use strict'
const config = require('../config/edge');
const crypto = require('crypto');
const hmac = {};

function encrypt (message) {
  console.log(config.password.method, message, config.edge.secret);
    const iv = crypto.randomBytes(16).toString('hex').substr(0,16);    //use this in production
//    const iv = secret.substr(0,16);    //using this for testing purposes (to have the same encryption IV in PHP and Node encryptors)
    const encryptor = crypto.createCipheriv( config.password.method, config.edge.secret, iv);
    const encrypted = new Buffer(iv).toString('base64') + encryptor.update( message, 'utf8', 'base64') + encryptor.final('base64');
    hmac.value = crypto.createHmac('sha256',  config.edge.secret).update(encrypted).digest('hex');
    console.log("HMAC... ",hmac.value);
    return encrypted;
};

module.exports = encrypt;
