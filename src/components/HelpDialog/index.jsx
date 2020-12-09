import React from 'react';

import { makeStyles } from '@material-ui/core/styles';


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button'

import VNN from './Contents/VNN'
import RLIPP from './Contents/RLIPP'
import AUC from './Contents/AUC'

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
          {props.children}
        </DialogContentText>
      </DialogContent>
      <Button onClick={handleClose} className={classes.closeButton}>Close</Button>
    </Dialog>
  );
}

export default HelpDialog;

