'use strict';
const config = require('./EdgeConfig');
const crypto = require('crypto');
let Password = require('./models/Password');
const fs = require('fs');

console.log('Veromo - Node Sandbox');
const trim = (function () {
    function escapeRegex(string) {
        return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
    }
    return function trim(str, characters, flags) {
        flags = flags || "g";
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }

        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }

        characters = escapeRegex(characters);

        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    };
}());

function encrypt (message, method, secret, hmac) {
    const iv = crypto.randomBytes(16).toString('hex').substr(0,16);    //use this in production
//    const iv = secret.substr(0,16);    //using this for testing purposes (to have the same encryption IV in PHP and Node encryptors)
    const encryptor = crypto.createCipheriv(method, secret, iv);
    const encrypted = new Buffer(iv).toString('base64') + encryptor.update(message, 'utf8', 'base64') + encryptor.final('base64');
    hmac.value = crypto.createHmac('md5', secret).update(encrypted).digest('hex');
    return encrypted;
};

function decrypt (encrypted, method, secret, hmac) {
    if (crypto.createHmac('md5', secret).update(encrypted).digest('hex') === hmac.value) {
        const iv = new Buffer(encrypted.substr(0, 24), 'base64').toString();
        const decryptor = crypto.createDecipheriv(method, secret, iv);
        return decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
    }
};

const message = 'M65E0B7FB2A091'; //config.edge_username;
const method = 'AES-256-CBC';
const secret = config.secret; //must be 32 char length
const hmac = {};

// fs.readFile('passwd.dev', function(err ,data) {
//   if(err) {
//     return console.log(err);
//   }
//   const res = data.toString();
//   console.log("Reading... " + res);
//   return res;
// });

// console.log("Reading... " + res);
const encrypted = encrypt(message, method, secret, hmac);
const decrypted = decrypt(encrypted, method, secret, hmac);

// console.log("Going to write into existing file");
console.log("Going to save to MongoDB....");
let edgePassword = new Password({
  password: encrypted,
  plainTxt: decrypted
});

edgePassword.save(function(err) {
  if(err) throw err;
  console.log('Password saved successfully....');
})
edgePassword.terminate();
// fs.writeFile('passwd.dev', encrypted,  function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("Data written successfully!");
// });

// console.log("Use HTTP header 'x-hmac: " + hmac.value + "' for validating against MitM-attacks.");
// console.log("Encrypted: " + trim( encrypted, '=' ) );
// console.log("Decrypted: " + decrypted);
//
// console.log("Dev: ", config.name);
// console.log("edgeUser: ", config.edge_username);
// console.log("edgeServer: ", config.edge_host1);
// console.log("edgePort: ", config.edge_port);
