import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useSelector} from 'react-redux';
import {
  selectAvailablePathways,
  selectSelectedPathways
} from './pathwaySlice';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function createData(rlipp, pathwayName) {
    return { rlipp, pathwayName };
  }
  
  const rows = [
    createData(23, 'Frozen yoghurt'),
    createData(22, 'Ice cream sandwich'),
    createData(21, 'Eclair'),
  ];

export function PathwayTable() {
  const classes = useStyles();
  const pathways = useSelector(selectAvailablePathways);
  const selectedPathways = useSelector(selectSelectedPathways);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small" >
        <TableHead>
          <TableRow>
            <TableCell align="right">RLIPP</TableCell>
            <TableCell >Pathway</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { selectedPathways.map((row) => (
            <TableRow key={pathways[row].name}>
              <TableCell component="th" scope="row" align="right">
                {pathways[row].rlipp.toFixed(2)}
              </TableCell>
              <TableCell ><a href={"http://amigo.geneontology.org/amigo/term/" +pathways[row]['shared-name'] } target="_blank" style={{ textDecoration: 'none' }}>{pathways[row].name.replaceAll('_',' ')}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}