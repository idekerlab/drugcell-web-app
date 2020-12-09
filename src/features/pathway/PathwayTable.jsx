import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HelpDialog from '../../components/HelpDialog'
import RLIPP from '../../components/HelpDialog/Contents/RLIPP'

import IconButton from '@material-ui/core/IconButton'

import { useSelector} from 'react-redux';
import {
  selectAvailablePathways,
  selectSelectedPathways
} from './pathwaySlice';

const useStyles = makeStyles({
  table: {
    minWidth: '100%'
  },
  tableHeaderCell: {
    display: 'flex',
    flexDirection: 'row'
  }
});

function createData(rlipp, pathwayName) {
    return { rlipp, pathwayName };
  }
  


export function PathwayTable() {
  const classes = useStyles();
  const pathways = useSelector(selectAvailablePathways);
  const selectedPathways = useSelector(selectSelectedPathways);

  const [isHelpOpen, setHelpOpen] = useState(false);

  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = () => {
   setHelpOpen(false);
  };


  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small" >
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.tableHeaderCell}>RLIPP 
            <IconButton aria-label="help" size="small" onClick={handleHelpOpen}>
              <HelpOutlineIcon fontSize="inherit" />
              </IconButton> 
            </TableCell>
            <TableCell >Pathway</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { selectedPathways.map((row) => (
            <TableRow key={pathways[row].name}>
              <TableCell component="th" scope="row" align="right" >
                {pathways[row].rlipp.toFixed(2)}
              </TableCell>
              <TableCell ><a href={"http://amigo.geneontology.org/amigo/term/" +pathways[row]['shared-name'] } target="_blank" style={{ textDecoration: 'none' }}>{pathways[row].name.replaceAll('_',' ')}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <HelpDialog open={isHelpOpen} onClose={handleHelpClose}>
     <RLIPP />
   </HelpDialog>
    </div>
  );
}