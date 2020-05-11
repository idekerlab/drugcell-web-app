#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require("http");

console.log('hello clarice.');

const serverURL = process.argv[2] ? process.argv[2] : undefined;

const setFile = process.argv[3] ? process.argv[3] : undefined;

const targetRootDir = process.argv[4] ? process.argv[4] : undefined;

if (!serverURL) {
  throw 'No server specified';
}

if (!setFile) {
  throw 'No server specified';
}

if (!targetRootDir) {
  throw 'No target directory specified';
}

const data = fs.readFileSync(setFile);

function downloadNetwork(networks, serverURL, targetRootDir) {
  const networkUUID = networks.shift();
  const networkURL = serverURL + '/v2/network/' + networkUUID + '?download=true';
  http.get(networkURL, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const networkFile = targetRootDir + networkUUID + '.cx';
      console.log('writing network: ' + networkFile); 
      fs.writeFileSync(networkFile, data);
      downloadNetwork(networks, serverURL, targetRootDir);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

const networks = JSON.parse(data).networks;
downloadNetwork(networks, serverURL, targetRootDir);
