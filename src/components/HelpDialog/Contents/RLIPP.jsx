import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import HelpRLIPP from '../../../assets/images/help_rlipp.png';

const useStyles = makeStyles({
  helpImage: {
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const RLIPP = () => {
  const classes = useStyles();

  return (
    <div>
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
    </div>
  );
}

export default RLIPP;

