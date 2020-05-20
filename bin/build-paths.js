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

const newElements = {
    'nodes': elements.nodes,
    'edges': elements.edges.map(edge => {
        let newEdge = {
            'data': edge.data,
        }
        let oldSource = newEdge.data.source;
        newEdge.data.source = newEdge.data.target;
        newEdge.data.target = oldSource;
        return newEdge;
    })
}

var preCy = cytoscape({
    headless: true,
    elements: newElements
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

if (!fs.existsSync(targetRootDir) || !fs.lstatSync(targetRootDir).isDirectory()) {
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

const targetDir = targetRootDir + fileName.slice(fileName.lastIndexOf('/'), -3);

fs.mkdirSync(targetDir);

//console.log('targetPathways size= ' + targetPathways.size());
const indexFileName = targetDir + '/index.json';

const index = {};

targetPathways.forEach(targetId => {
    const targetNode = preCy.getElementById(targetId.id());

    const indexEntry = {
        'id': targetNode.id(),
        'name': targetId.data('name'),
        'shared-name': targetId.data('shared-name'),
        'rlipp': targetNode.data('rlipp')
    };

    index[targetId.data('name')] = indexEntry;

    //console.log(JSON.stringify(targetNode.json()));
    //console.log(targetNode.data('name') + '\t' + targetNode.data('rlipp') + '\t' + targetNode.data('shared-name'));

    const path = dijkstraResults.pathTo(targetNode);
    const genes = targetNode.neighbourhood('node[nodetype="Gene"], edge[edgetype="Gene-Term"]');

    /*path.forEach(pathElement => 
        console.log(JSON.stringify(pathElement.json()))
    );
    console.log(JSON.stringify(genes.json()));
    */

    const fieldsToKeep = [
        'id',
        'source',
        'target',
        'isroot',
        'name',
        'nodetype',
        'label',
        'rlipp',
        'shared-name',
        'edgetype',
        'is_tree_edge_u9'
    ]

    const minimizeElement = element => {

        const fieldsToDelete = Object.keys(element.data).filter(key => !fieldsToKeep.includes(key));

        //console.log('deleting fields: ' + fieldsToDelete);

        fieldsToDelete.forEach(field => {
            delete element.data[field];
        });

        if (!element.data.isroot) {
            delete element.data.isroot;
        }

        delete element.position;
        
        delete element.group;
        delete element.removed;
        delete element.selected;
        delete element.selectable;
        delete element.locked;
        delete element.grabbable;
        delete element.pannable;
        delete element.classes;
    };

    let pathwayElements = [];
    path.forEach(pathElement => {
        let elementJson = pathElement.json();
        minimizeElement(elementJson);
        console.log('shared-name: ' + targetNode.data('shared-name') + ' ' + elementJson.data['shared-name']);
        if (elementJson.data['shared-name'] == targetNode.data('shared-name')) {
            console.log('adding gene count: ' + genes.size())
            elementJson.data['gene-count'] = genes.size();
        }
        pathwayElements.push(elementJson);
    });

    let geneElements = [];
    genes.forEach(geneElement => {
        let elementJson = geneElement.json();
        minimizeElement(elementJson);
        geneElements.push(elementJson);
    });

    const pathwayEntry = {
        shortestPath : pathwayElements,
        genes : geneElements
    }

    fs.writeFileSync(targetDir + '/' + targetNode.data('shared-name').replace(':', '_') + '.json', JSON.stringify(pathwayEntry, null, 0));
});

const networkIndex = {
    'name': networkName,
    'index': index
}

fs.writeFileSync(indexFileName, JSON.stringify(networkIndex, null, 0));