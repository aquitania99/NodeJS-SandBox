'use strict';
const mysql = require('../config/mysql');
const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');

const message = 'M65E0B7FB2A091'; //config.edge_username;

let utcDate = (new Date()).toISOString().split(/[T\.]/).slice(0,2).join(' ');
let result = {};
function getPassword(err,res) {
    mysql.query('SELECT password FROM password order by id desc', function(err,rows){
        if(err) throw err;
        // result = rows[0].password;
        // return result;
        console.log('Reading data from DB :\n', rows);
    });
}

function setPassword(passwd) {
    const encrypted = encrypt(message);
    const decrypted = decrypt(encrypted);

    const EdgePassword = {
      password: encrypted,
      passwdPlain: decrypted,
      createdOn: utcDate
    };

    mysql.query('INSERT INTO password SET ?', EdgePassword, function(err, res) {
        if(err) throw err;
        console.log('Last insert ID: ', res.insertId);
        return res;
    });

}
//
// module.exports = getPassword();
// module.exports = setPassword;

exports.getPassword=()=>{
  return new Promise((resolve, reject) => {
      let result = mysql.query('SELECT password FROM password order by id desc', function(err,rows){
                if(err) {
                  reject(err);
                }
                // result = rows[0].password;
                // return result;
                console.log('Reading data from DB :\n', rows);
                });
      console.log("Testing Promise with MySQL....", result);
      resolve(result);
  });
};

mysql.end();
