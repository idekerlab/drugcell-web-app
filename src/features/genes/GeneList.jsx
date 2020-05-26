import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';



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

  return (
    <div className={classes.root}>
      Genes
    <List component="nav" aria-label="gene list">
      { genes.map( gene => 
        {
          return (
          <ListItem button >
            <ListItemText primary={ gene }/>
          </ListItem>);
      })}
    </List>
    </div>
  );
}