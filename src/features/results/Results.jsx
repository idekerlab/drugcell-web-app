import React, {useEffect } from 'react';
import { Network } from './network/Network'
import { useSelector, useDispatch } from 'react-redux';

import {
  importDrugsFromURL,
  selectDrugs,
} from './drugSlice';

import Button from '@material-ui/core/Button';

export function Results() {

  const drugs = useSelector(selectDrugs);

  const dispatch = useDispatch();

  useEffect(() => dispatch(importDrugsFromURL('http://localhost/data/drug-index.json')), []);

  return (
    <div>
      <Button variant="contained" color="primary">Hell here</Button>
      <Network />
      
    </div>
  );
}
