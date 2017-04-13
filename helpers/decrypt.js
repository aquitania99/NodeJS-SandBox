'use strict'
const config = require('../config/edge');
const crypto = require('crypto');
const hmac = {};
// let hmac.value = "2b89730aa574fa4f5ede6942b409d471efd5378a86ba9421a0a1a578b22ec5f2";
// function decrypt (encrypted) {
//   console.log('Stuff to decrypt...', encrypted);
//     if (crypto.createHmac('sha256', config.edge.secret).update(encrypted).digest('hex') === hmac.value) {
//         const iv = new Buffer(encrypted.substr(0, 24), 'base64').toString();
//         const decryptor = crypto.createDecipheriv(config.password.method, config.edge.secret, iv);
//         decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
//         console.log(decryptor);
//         return decryptor;
//     }
// };

function decrypt (encrypted) {
    const iv = new Buffer(encrypted.substr(0, 24), 'base64').toString();
    const decryptor = crypto.createDecipheriv(config.password.method, config.edge.secret, iv);
    return decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
};

module.exports = decrypt;
