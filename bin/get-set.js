#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require("http");

console.log('hello clarice.');

const serverURL = process.argv[2] ? process.argv[2] : undefined;

const setUUID = process.argv[3] ? process.argv[3] : undefined;

const targetRootDir = process.argv[4] ? process.argv[4]  : undefined;

if (!serverURL) {
    throw 'No server specified';
}

if (!setUUID) {
  throw 'No server specified';
}

if (!targetRootDir) {
    throw 'No target directory specified';
}

const setURL = serverURL + '/v2/networkset/' + setUUID

http.get(setURL, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const setFile = targetRootDir + 'drug-cell-network-set.json';
    fs.writeFileSync(setFile, data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

