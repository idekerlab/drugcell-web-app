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

fs.readdir(sourceRootDir, function(err, items) {
   items.forEach( file => {
       const filePath =  sourceRootDir + '/' + file;
        console.log(filePath);

        execFileSync(build_paths_exec, [filePath , targetRootDir]);
    });
});

