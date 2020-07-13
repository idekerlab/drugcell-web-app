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

let cyInstance = undefined;

export function Network() {

  const elements = useSelector(selectElements);
  const drugUUID = useSelector(selectSelectedDrug);

  useEffect(() => {
    //console.log('Use effect.');
    // Event handler can be set only when Cytoscape.js instance is available.
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    cyInstance.removeListener('select');
    cyInstance.removeListener('tap');

    let timeout;
    cyInstance.on('select', function (event) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        try {
          let pathwayIds = [];
          cyInstance.$(':selected').forEach(element => {
            if (element.isNode()) {
              const pathwayId = element.data('shared-name');
              pathwayId != null && pathwayIds.push(pathwayId);
            }
          });
          //console.log('network select');
          dispatch(setGenesFromURLs({ uuid: drugUUID, selectedPathways: pathwayIds }))
        } catch (e) {
          console.warn(e)
        }
      }, 100);
    });

    cyInstance.on('tap', function (event) {
      try {
        if (event.target === cyInstance) {
          console.log('tap on not-node');
          dispatch(setGenesFromURLs({ uuid: drugUUID, selectedPathways: [] }))
        }
        else if (event.target.isNode()) {

        }
      } catch (e) {
        console.warn(e)
      }
    });
    return () => {
      console.log('Network viewer unmounted')
    }
  })

  const DRUG_COLOR = '#1B9E77';
  const PATHWAY_COLOR = '#D95F02';
  const CELL_RESPONSE_COLOR = '#7570B3';

  const style = [
    {
      'selector': 'node',
      'style': {
        'display': 'element',
        'label': 'data(label)',
        'text-max-width': 60,
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'top',
        'background-color': PATHWAY_COLOR
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
      'selector': '#drug',
      'style': {
        'shape': 'rectangle',
        'display': 'element',
        'text-halign': 'center',
        'text-valign': 'top',
        'background-color': DRUG_COLOR
      }
    },
    {
      'selector': '#response',
      'style': {
        'display': 'element',
        'text-halign': 'right',
        'text-valign': 'center',
        'background-color': CELL_RESPONSE_COLOR,
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
        'taxi-direction': 'horizontal',
        'taxi-turn': '100%'
      }
    },
    {
      'selector': 'node:selected',
      'style': {
        'background-color': 'blue'
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
        vertical-align='middle' className='hint'>
        <Typography variant='h6'>
          Select a Drug and Pathways
      </Typography>   </div>
      : <div className='network'>
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
            cyInstance = cy;
            const boundingBox = cy.nodes().boundingBox({ includeLabels: false });
            console.log("do a thing: " + JSON.stringify(boundingBox));
            cy.$('#drug').position({ y: boundingBox.y1 });
          }} />
        <div class='reset'>
          <ResetZoomButton onClick={fitNetwork} />
        </div>
      </div>
  );
}
