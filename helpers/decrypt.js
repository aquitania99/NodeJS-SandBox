'use strict'
const config = require('../config/edge');
const crypto = require('crypto');
const hmac = {};

function decrypt (encrypted) {
    if (crypto.createHmac('sha256', config.edge.secret).update(encrypted).digest('hex') === hmac.value) {
        const iv = new Buffer(encrypted.substr(0, 24), 'base64').toString();
        const decryptor = crypto.createDecipheriv(config.password.method, config.edge.secret, iv);
        return decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
    }
};

module.exports = decrypt;
