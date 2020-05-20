import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setElements,
  setElementsFromURLs,
  selectElements,
} from './networkSlice';
import styles from './Network.module.css';
import Cytoscape from 'cytoscape'
import Dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';

Cytoscape.use(Dagre);

export function Network() {

  useEffect(() => console.log('mounted'), []);

  const elements = useSelector(selectElements);
  const style = [
    {
      'selector': 'node',
      'style': {
        'display': 'element',
        'label': 'data(name)',
        'text-halign': 'center',
        'text-valign': 'top'
      }
    },
    {
      'selector': 'node[gene-count]',
      'style': {
        'text-halign': 'right',
        'text-valign': 'center',
        'text-margin-x': '8px'
      }
    },
    {
      'selector': '#5883',
      'style': {
        'display': 'element',
        'text-halign': 'left',
        'text-valign': 'center',
        'background-color': 'red',
      }
    },
    {
      'selector': 'node[nodetype="Term"]',
      'style': {
        'display': 'element',
        'width': 'mapData(rlipp, 0, 278, 20, 50)',
        'height': 'mapData(rlipp, 0, 278,  20, 50)'
      }
    },
    {
      'selector': 'edge[edgetype="Child-Parent"]',
      'style': {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'taxi',
        'taxi-direction' : 'vertical'
      }
    }];
  
  const dispatch = useDispatch();

  return (
    <div>
      <CytoscapeComponent elements={JSON.parse(JSON.stringify(elements))} 
        style={{ width: '1200px', height: '400px' }} layout={{
        name: 'dagre',
        rankDir: 'LR',
        rankSep: 60,
        ranker: 'longest-path',
        nodeDimensionsIncludeLabels: false,
        nodeSep: 60,
        transform: (node, position) => {
          console.log('position: ' + position['x']);
          //position.y = position.y + position.x;
          return position;
        }
      }} stylesheet={style} />
    </div>
  );
}
