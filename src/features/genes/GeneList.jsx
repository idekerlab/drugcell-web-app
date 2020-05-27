import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import {
  selectGenes
} from './geneSlice';

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

  const downloadUrl = 'http://www.ndexbio.org/v2/search/network/042a9cc5-8111-11ea-aaef-0ac135e8bacf/interconnectquery';
  const downloadProps = {"searchString":"GO:1902600","searchDepth":1,"edgeLimit":50000,"errorWhenLimitIsOver":true};
  
  const downloadEmployeeData = () => {
    
    fetch(downloadUrl, {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(downloadProps)
    })
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'network.cx';
          a.click();
        });
        //window.location.href = response.url;
    });
  }
  

  return (
    <div className={classes.root}>
     <Typography variant="h6">
            Genes
          </Typography>
    <Paper style={{maxHeight: 400, overflow: 'auto'}}>
    
    <List component='nav' aria-label='gene list' dense='true' maxHeight='300' overflow='auto'>
      { genes.sort( (a,b) => a.localeCompare(b)).map( gene => 
        {
          return (
          <ListItem button >
            <ListItemText primary={ gene }/>
          </ListItem>);
      })}
    </List>
    </Paper>
    <Typography variant="h6">
           Total { genes.length }
     </Typography>
     <button onClick={downloadEmployeeData}>Download</button>
    </div>
  );
}