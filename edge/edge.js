'use strict';
const config = require('../config/edge');
const encrypt = require('../helpers/encrypt');
let res = {};

const message = config.edge.user;
console.log('Veromo - Node Sandbox');

let value = new encrypt(message);

console.log(value);
