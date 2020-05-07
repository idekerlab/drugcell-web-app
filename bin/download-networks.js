#!/usr/bin/env node



const fs = require('fs');
const path = require('path');
const http = require("http");

console.log('hello clarice.');

const setURL = process.argv[2] ? process.argv[2] : undefined;
const targetRootDir = process.argv[3] 
    ? process.argv[3] 
    : undefined;

if (!setURL) {
    throw 'No file specified';
}


if (!targetRootDir) {
    throw 'No target directory specified';
}

http.get(setURL, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const networks = JSON.parse(data).networks;
    networks.forEach(network => {
        console.log('UUID: ' + network);

        
    });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

