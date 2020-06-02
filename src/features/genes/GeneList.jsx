import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import { getPathwaysFromNetwork } from '../../api/ndex'
import { importNetwork } from '../../api/cyrest'

import {
  selectElements,
} from '../results/network/networkSlice';

import {
  selectGenes
} from './geneSlice';

import {
  selectSelectedPathways, selectAvailablePathways
} from './../results/pathwaySlice';

import {
  selectSelectedDrug
} from '../results/drugSlice';

import {
  getGenes
} from './../../api/drugcell'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,

    height: 400,

    backgroundColor: theme.palette.background.paper,
  },
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

    const pathwayIDs = selectedPathways.map( pathwayName => availablePathways[pathwayName]['shared-name']);

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
    //dummy.style.display = 'none'
    document.body.appendChild(dummy);
    
    dummy.value = geneText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    console.log('copied');
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Genes
          </Typography>
      <Paper style={{ maxHeight: '100%', overflow: 'auto' }}>

        <List component='nav' aria-label='gene list' dense='true' maxHeight='300' overflow='auto'>
          {genes.sort((a, b) => a.localeCompare(b)).map(gene => {
            return (
              <ListItem button >
                <ListItemText primary={gene} />
              </ListItem>);
          })}
        </List>
      </Paper>
      <Typography variant="h6">
        Total: {genes.length}
      </Typography>
      <Button onClick={importToCytoscape} color="primary">Import to Cytoscape</Button>
      <Button onClick={copyGenesToClipboard} color="primary">Copy Genes to Clipboard</Button>
    </div>
  );
}