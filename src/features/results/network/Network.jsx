import React, { useEffect } from 'react';

import ResetZoomButton from '../../../components/ResetZoomButton'

import { useSelector, useDispatch } from 'react-redux';
import {
  selectElements,
} from './networkSlice';

import {
  setGenesFromURLs
} from '../genes/geneSlice'

import {
  selectSelectedDrug
} from '../../drugs/drugSlice'

import './style.css';
import Cytoscape from 'cytoscape'
import Dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';
import { Typography } from '@material-ui/core';
Cytoscape.use(Dagre);


export function Network() {

  
  let cyInstance = undefined;
  //useEffect(() => console.log('mounted'), []);

  const elements = useSelector(selectElements);
  const drugUUID = useSelector(selectSelectedDrug);


  const style = [
    {
      'selector': 'node',
      'style': {
        'display': 'element',
        'label': 'data(label)',
        'text-max-width': 60,
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'top'
      }
    },
    {
      'selector': 'node[gene-count]',
      'style': {
        'text-halign': 'left',
        'text-valign': 'center',
        'text-margin-x': '-8px'
      }
    },
    {
      'selector': '#5883',
      'style': {
        'display': 'element',
        'text-halign': 'right',
        'text-valign': 'center',
        'background-color': 'red',
        'text-margin-x': '8px'
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
        //'curve-style': 'taxi',
        //'taxi-direction': 'vertical',
        //'taxi-turn': '50%'
      }
    },
    {
      'selector': 'edge[edgetype="response"]',
      'style': {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'taxi',
        'taxi-direction': 'vertical',
        'taxi-turn': '100%'
      }
    }
  ];

  const dispatch = useDispatch();

  const fitNetwork = () => {
    console.log('fit network: ' + cyInstance !== undefined)
    cyInstance && cyInstance.fit();
  }

  return (
    elements.length == 0
      ? <div
        vertical-align='middle' class='hint'>
        <Typography variant='h6'>
          Select a Drug and Pathways
      </Typography>   </div>
      : <div class='network'>
        <CytoscapeComponent elements={JSON.parse(JSON.stringify(elements))}
          style={{ width: '100%', height: 'calc(100vh - 70px)' }} layout={{
            name: 'dagre',
            rankDir: 'LR',
            rankSep: 60,
            ranker: 'longest-path',
            nodeDimensionsIncludeLabels: true,
            nodeSep: 75,
            transform: (node, position) => {
              return position;
            }
          }} stylesheet={style}
          cy={cy => {
            console.log('setting cy instance');
            cyInstance = cy;
            cyInstance.on('select', function (event) {
              try {
                let pathwayIds = [];
                cy.$(':selected').forEach(element => {
                  if (element.isNode()) {
                    const pathwayId = element.data('shared-name');
                    pathwayId != null && pathwayIds.push(pathwayId);
                  }
                });
                console.log('network select');
                dispatch(setGenesFromURLs({ uuid: drugUUID, selectedPathways: pathwayIds }))
              } catch (e) {
                console.warn(e)
              }
            });

            cyInstance.on('tap', function (event) {
              try {
                if (event.target === cyInstance) {
                  console.log('tap on not-node');
                  dispatch(setGenesFromURLs({ uuid: drugUUID, selectedPathways: [] }))
                }
                else if (event.target.isNode()) {
                  let pathwayIds = [];
                  const pathwayId = event.target.data('shared-name');
                  pathwayId != null && pathwayIds.push(pathwayId);
                  console.log('tap on node');
                  dispatch(setGenesFromURLs({ uuid: drugUUID, selectedPathways: pathwayIds }))
                } 
              } catch (e) {
                console.warn(e)
              }
            })

          }} />
          <div class='reset'>
            <ResetZoomButton onClick={fitNetwork}  />
            </div>
      </div>
  );
}
