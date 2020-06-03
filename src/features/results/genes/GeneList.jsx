import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import OpenInCytoscapeButton from '../../../components/OpenInCytoscapeButton'
import OpenOriginalNetworkButton from '../../../components/OpenOriginalNetworkButton'
import ResetZoomButton from '../../../components/ResetZoomButton'

import { getPathwaysFromNetwork } from '../../../api/ndex'
import { importNetwork } from '../../../api/cyrest'

import {
  selectElements,
} from '../network/networkSlice';

import {
  selectGenes
} from './geneSlice';

import {
  selectSelectedPathways, selectAvailablePathways
} from '../pathwaySlice';

import {
  selectSelectedDrug
} from '../drugSlice';

import {
  getGenes
} from '../../../api/drugcell'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    'min-height': 0,
    height: '100%',

    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    'flex-flow': 'column',
  },
  genetypography : {
    'flex-grow': 0
  },
  icons: {
    display: 'flex',
    'flex-grow': 0
  },
  genepaper: {
    'flex-grow': '1',
    'height': '100%'
  }
}));

export function GeneList() {

  const classes = useStyles();

  const genes = useSelector(selectGenes);

  const elements = useSelector(selectElements);

  const selectedPathways = useSelector(selectSelectedPathways);

  const availablePathways = useSelector(selectAvailablePathways);

  const selectedDrugUUID = useSelector(selectSelectedDrug);

  const importToCytoscape = () => {

    let queryStrings = [];

    elements.filter(element => element.data['nodetype'] == 'Term').forEach(element => queryStrings.push(element.data['shared-name']));

    const pathwayIDs = selectedPathways.map(pathwayName => availablePathways[pathwayName]['shared-name']);

    Promise.all(pathwayIDs.map(pathwayId => getGenes(selectedDrugUUID, pathwayId))).then(responses =>
      Promise.all(responses.map(res => res.json()))
    ).then(jsonResponses => {

      let allGenes = [];
      jsonResponses.forEach(elements => {

        allGenes = allGenes.concat(elements);
      });

      getPathwaysFromNetwork(selectedDrugUUID, queryStrings.concat(allGenes))
        .then(response => {
          response.json().then(json =>
            importNetwork(1234, json));
        });
    });
  }

  const copyGenesToClipboard = () => {
    const geneText = genes.join('\n');
    var dummy = document.createElement("textarea");

    document.body.appendChild(dummy);

    dummy.value = geneText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    console.log('copied');
  }

  const searchInIQuery = () => {
    const iQueryUrl = 'http://iquery.ndexbio.org/?genes=' + genes.join(",");
    window.open(iQueryUrl, '_blank');
  }

  return (
    <div className={classes.root}>
      
      <Typography variant="h6" classname={classes.genetypography}>
        Genes ({genes.length})
      </Typography>
      <div className={classes.icons}>
        <OpenOriginalNetworkButton  />
        <OpenInCytoscapeButton handleImportNetwork={importToCytoscape} />
        <Tooltip title="Copy" placement="bottom">
          <IconButton
            color="primary"
          
            aria-label="Copy"
            onClick={copyGenesToClipboard}
          >
            <Icon className='' />
          </IconButton>
        </Tooltip>
       <ResetZoomButton />
       
       
      </div>
      
      <Paper style={{ overflow: 'auto', height: 'calc(100vh - 190px)'}}>
        <List component='nav' aria-label='gene list' dense='true' overflow='auto'>
          {genes.sort((a, b) => a.localeCompare(b)).map(gene => {
            return (
              <ListItem button >
                <ListItemText primary={gene} />
              </ListItem>);
          })}
        </List>
      </Paper>
      
    </div>
  );
}