#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cytoscape = require('cytoscape');
const cx2js = require('cytoscape-cx2js');

console.log('hello clarice.');

const fileName = process.argv[2] ? process.argv[2] : undefined;
const targetRootDir = process.argv[3] 
    ? process.argv[3] 
    : undefined;

if (!fileName) {
    throw 'No file specified';
}

if (!targetRootDir) {
    throw 'No target directory specified';
}

const content = fs.readFileSync(fileName);
const rawCX = JSON.parse(content);

var utils = new cx2js.CyNetworkUtils();

var niceCX = utils.rawCXtoNiceCX(rawCX);

var cx2Js = new cx2js.CxToJs(utils);

var attributeNameMap = {};

var elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);

var preCy = cytoscape({
    headless: true,
    elements: elements
});

preCy.nodes().removeData('genes');

Object.keys(niceCX.nodes).forEach(key => {
    //console.log("node key: " + key + " n:" + niceCX.nodes[key].n);
    const currentEle = preCy.getElementById(key);
    currentEle.data('shared-name', niceCX.nodes[key].n);
});

const rootNode = preCy.nodes('node[?isroot]');

const rootValid = rootNode.size() === 1;

//console.log('rootValid = ' + rootValid);

var dijkstraResults = preCy.elements().dijkstra(rootNode);

const targetPathways = preCy.nodes('node[nodetype="Term"][!hidden][?rlipp]');

if (!fs.existsSync(targetRootDir) || !fs.lstatSync(targetRootDir).isDirectory()){
    throw "Target root directory does not exist."
}

let networkName = undefined;

niceCX.networkAttributes.elements.forEach(
    networkElement => {
        if (networkElement.n == 'name') {
            networkName = networkElement.v;
        }
    }
);

if (!networkName) {
    throw 'Network does not have a name attribute';
}

const targetDir = targetRootDir + networkName;

fs.mkdirSync(targetDir);

//console.log('targetPathways size= ' + targetPathways.size());
const indexFileName = targetDir + '/index.json';



const index = {};

targetPathways.forEach(targetId => {
    const targetNode = preCy.getElementById(targetId.id());

    const indexEntry = {
        'name' : targetId.data('name'),
        'shared-name': targetId.data('shared-name'),
        'rlipp' : targetNode.data('rlipp')
    };
   
    index[targetNode.id()] = indexEntry;

    //console.log(JSON.stringify(targetNode.json()));
    //console.log(targetNode.data('name') + '\t' + targetNode.data('rlipp') + '\t' + targetNode.data('shared-name'));

    const path = dijkstraResults.pathTo(targetNode);
    const genes = targetNode.neighbourhood('node[nodetype="Gene"], edge[edgetype="Gene-Term"]');

    /*path.forEach(pathElement => 
        console.log(JSON.stringify(pathElement.json()))
    );
    console.log(JSON.stringify(genes.json()));
    */

    let pathwayElements = [];
    path.forEach( pathElement => {
        pathwayElements.push(pathElement.json());
    });
    genes.forEach( geneElement => {
        pathwayElements.push(geneElement.json());
    });
    fs.writeFileSync(targetDir + '/' + targetNode.data('shared-name').replace(':', '_') + '.json', JSON.stringify(pathwayElements, null, 2));



});

fs.writeFileSync(targetRootDir + 'index.json', JSON.stringify(index, null, 2));