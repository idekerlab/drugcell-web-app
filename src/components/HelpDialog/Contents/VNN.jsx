import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

import HelpVNN from '../../../assets/images/help_vnn.png';

const useStyles = makeStyles({
  helpImage: {
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const VNN = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        Visible Neural Networks (VNN)
        </Typography>
      <p>
        <img src={HelpVNN} className={classes.helpImage}></img>
      </p>
      <p>
        <Typography>
          Visible Neural Network (VNN) is an interpretable deep learning framework designed to solve biomedical problems. DrugCell models have two branches, one learns from the chemical structure of drugs and the other learns from genotypes of cell lines defined by mutations to infer cell response to drugs. The interpretability comes from the biologically meaningful structure of the genotype branch, which is the Gene Ontology (GO), a hierarchical organization of cell functions, in the current version the DrugCell model. Each pathway (subsystem) in the GO is assigned with a set of a fixed number of neurons and the connectivity between neurons are determined by the hierarchical relationship between the pathways that the neurons are representing.
        </Typography></p>
    </div>
  );
}

export default VNN;

