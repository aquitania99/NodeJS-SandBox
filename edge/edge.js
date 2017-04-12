'use strict';
const config = require('./EdgeConfig');
// const crypto = require('crypto');
const fs = require('fs');

let res = "";

const message = config.edge_username;
const method = 'AES-256-CBC';
const secret = config.secret; //must be 32 char length
const hmac = {};

console.log('Veromo - Node Sandbox');

function decrypt (encrypted, method, secret, hmac) {
    if (crypto.createHmac('md5', secret).update(encrypted).digest('hex') === hmac.value) {
        const iv = new Buffer(encrypted.substr(0, 24), 'base64').toString();
        const decryptor = crypto.createDecipheriv(method, secret, iv);
        return decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
    }
};

fs.readFile('passwd.dev', 'utf-8', function(err ,text) {
    if(err) {
      return console.log("Reading error... " + err);
    }
    else {
      let result = text.toString();
      console.log("Reading... inside function " + result);
      return result
    }
  });

// function test() {
//   console.log("freaking " result);
// }

const host = config.edge_host1;
const port = config.edge_port;

// $context = stream_context_create( array( 'ssl' => array( 'verify_peer' => true ) ) );
//
// if( ( $this->socket = stream_socket_client( "ssl://{$this->host}:{$this->port}", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context ) ) === FALSE )
// {
//     $this->log->critical( "Could not connect to ASIC ".ucwords( $this->mailbox )." Mailbox", json_encode( [ "errorCode" => $errno, "errorMessage" => $errstr, "method" => __METHOD__ ] ) );
//
//     throw new \RuntimeException( "EDGE Client could not connect to ASIC ".ucwords( $this->mailbox )." Mailbox" );
// }
// }
// $this->log->info( "EDGE Client connected to ".ucwords( $this->mailbox )." Mailbox", json_encode( [ "server" => "ssl://{$this->host}:{$this->port}" ] ) );
//
// return $this;


console.log("Dev: ", config.name);
console.log("edgeUser: ", config.edge_username);
console.log("edgeServer: ", config.edge_host1);
console.log("edgePort: ", config.edge_port);
