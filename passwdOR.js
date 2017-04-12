'use strict';
const config = require('./EdgeConfig');
const crypto = require('crypto');
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

//const encryptWithTSValidation = function (message, method, secret, hmac) {
//    const messageTS = new Date().toISOString().substr(0,19) + message;
//    return encrypt(messageTS, method, secret, hmac);
//}
//
//const decryptWithTSValidation = function (encrypted, method, secret, hmac, intervalThreshold) {
//    const decrypted = decrypt(encrypted, method, secret, hmac);
//    const now = new Date();
//    const year = parseInt(decrypted.substr(0,4)), month = parseInt(decrypted.substr(5,2)) - 1,
//    day = parseInt(decrypted.substr(8,2)), hour = parseInt(decrypted.substr(11,2)),
//    minute = parseInt(decrypted.substr(14,2)), second = parseInt(decrypted.substr(17,2));
//    const msgDate = new Date(Date.UTC(year, month, day, hour, minute, second))
//    if (Math.round((now - msgDate) / 1000) <= intervalThreshold) {
//        return decrypted.substr(19);
//    }
//}

const message = config.edge_username;
const method = 'AES-256-CBC';
const secret = config.secret; //must be 32 char length
const hmac = {};

const encrypted = encrypt(message, method, secret, hmac);
const decrypted = decrypt(encrypted, method, secret, hmac);
//const encrypted = encryptWithTSValidation(message, method, secret, hmac);
//const decrypted = decryptWithTSValidation(encrypted, method, secret, hmac, 60*60*12); //60*60m*12=12h

console.log("Use HTTP header 'x-hmac: " + hmac.value + "' for validating against MitM-attacks.");
console.log("Encrypted: " + trim( encrypted, '=' ) );
console.log("Decrypted: " + decrypted);

console.log("Dev: ", config.name);
console.log("edgeUser: ", config.edge_username);
console.log("edgeServer: ", config.edge_host1);
console.log("edgePort: ", config.edge_port);
