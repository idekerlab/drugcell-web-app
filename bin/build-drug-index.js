#!/usr/bin/env node

const fs = require('fs');
const { 
    execFileSync,
  } = require('child_process');
const path = require('path');
const cytoscape = require('cytoscape');
const cx2js = require('cytoscape-cx2js');

build_paths_exec = path.resolve('./bin/build-paths.js')


const sourceRootDir = process.argv[2] ? path.resolve(process.argv[2]) : undefined;
const targetRootDir = process.argv[3] 
    ? path.resolve(process.argv[3]) 
    : undefined;

if (!sourceRootDir) {
    throw 'No source directory specified';
}

if (!targetRootDir) {
    throw 'No target directory specified';
}

const pathsDirectory = sourceRootDir + '/paths';

console.log(pathsDirectory);

fs.readdir(pathsDirectory, function(err, items) {
    const drugIndexFile = sourceRootDir + '/drug-index.json';
    fs.writeFileSync(drugIndexFile, '[');
    items.forEach( (file, i, array) => {
       const pathIndex =  pathsDirectory + '/' + file + '/index.json';
        //console.log(pathIndex);
        const content = JSON.parse(fs.readFileSync(pathIndex));
        const entry = {
            'name': content.name,
            'uuid': file
        }
        fs.appendFileSync(drugIndexFile, JSON.stringify(entry));
        if (i < array.length - 1) {
            fs.appendFileSync(drugIndexFile, ',')
        }
        
    });
    fs.appendFileSync(drugIndexFile, ']');
});

