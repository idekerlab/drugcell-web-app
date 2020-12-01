import React from 'react';

import { makeStyles } from '@material-ui/core/styles';


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button'

import { Typography } from '@material-ui/core';

import HelpRLIPP from '../../assets/images/help_rlipp.png';
import HelpVNN from '../../assets/images/help_vnn.png';

const useStyles = makeStyles({
  closeButton: {
    width: "fit-content",
    alignSelf: "flex-end",
    margin: '0.5em'
  },
  helpImage: {
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const HelpDialog = (props) => {
    const classes = useStyles();
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog scroll="paper" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">DrugCell Help</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            //ref={descriptionElementRef}
            tabIndex={-1}
          >
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
      
        <Typography variant="h6">
        Relative Local Improvement in Predictive Power (RLIPP)
        </Typography>
        <p>
        <img src={HelpRLIPP} className={classes.helpImage}></img>
        </p>
        <p>
        <Typography>
        Relative Local Improvement in Predictive Power (RLIPP) scores quantify the importance of each subsystem in the Gene Ontology embedded in the DrugCell model. To calculate the RLIPP score for each subsystem, we trained and compared two different L2-norm penalized linear regression models of drug response local to that subsystem. The first model is trained using the neuron values representing the state of the subsystem given different genotypes. The second model is trained using the concatenation of the neuron values of the subsystem’s children. The RLIPP score is defined as the ratio of the predictive power of the first linear model to that of the second linear model indicating the importance of the parent subsystem in learning. RLIPP &gt; 1 reflects that the neuron values of the parent subsystem are more predictive for drug drug response than the mere concatenation of the neuron values of its children. 
        </Typography>
        </p>
        <Typography variant="h6">
        Area Under the dose-response Curve (AUC)
        </Typography>
        <p>
        <Typography>
        In our study, the drug response was measured using the Area Under the dose-response Curve (AUC). The cell viability (luminescence) values were background corrected (media only), normalized to vehicle treatment (DMSO) at each concentration, and replicate values averaged. Curves were created by connecting individual response points in a piecewise linear fashion. The AUC was then calcuated and normalized such that AUC = 0 represents complete cell killing, AUC = 1 represents no effect, and AUC &gt;  1 represents a treatment granting a growth advantage to the cells. 
        </Typography>
        </p>
        </DialogContentText>
        </DialogContent>
        <Button onClick={handleClose} className={classes.closeButton}>Close</Button>
      </Dialog>
    );
  }
  
  export default HelpDialog;
  
  