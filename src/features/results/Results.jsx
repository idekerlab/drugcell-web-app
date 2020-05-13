import React, { useEffect } from 'react';
import { Network } from './network/Network'
import { useSelector, useDispatch } from 'react-redux';

import {
  importDrugsFromURL,
  selectAvailableDrugs,
  setSelectedDrug
} from './drugSlice';

import {
  importPathwaysFromURL,
  selectAvailablePathways,
} from './pathwaySlice';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function Results() {

  const drugs = useSelector(selectAvailableDrugs);
  const pathways = useSelector(selectAvailablePathways);

  const dispatch = useDispatch();

  useEffect(() => dispatch(importDrugsFromURL('http://localhost/data/drug-index.json')), []);

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={drugs}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => { dispatch(setSelectedDrug(value)) }}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      <Autocomplete
        multiple
        id="pathways"
        options={pathways}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        onChange={(event, value) => { console.log(value) }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
        )}
      />
      <Network />

    </div>
  );
}
