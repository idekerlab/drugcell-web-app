import React, { useEffect } from 'react';
import { Network } from './network/Network'
import { useSelector, useDispatch } from 'react-redux';

import {
  importDrugsFromURL,
  selectAvailableDrugs,
  selectSelectedDrug,
  selectDrug
} from './drugSlice';

import {
  importPathwaysFromURL,
  selectAvailablePathways,
  setSelectedPathways,
} from './pathwaySlice';

import {
  setElementsFromURLs
} from './network/networkSlice';

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
  const selectedDrug = useSelector(selectSelectedDrug);
  const pathwayArray = Object.values(pathways);

  const dispatch = useDispatch();

  useEffect(() => dispatch(importDrugsFromURL('http://localhost/data/drug-index.json')), []);

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={drugs}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => { 
          dispatch(selectDrug(value)); 
          dispatch(setSelectedPathways([]));
          dispatch(setElementsFromURLs( {uuid : undefined, selectedPathways: []}));
        }}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      <Autocomplete
        multiple
        id="pathways"
        options={ pathwayArray }
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        onChange={(event, value) => { 
          dispatch(setSelectedPathways(value));
          const pathwayIds = value.map( value => value['shared-name'].replace(':','_'));
          console.log('pathwayIds: ' + JSON.stringify(pathwayIds));
          console.log('selected drug: ' + selectedDrug.uuid);
          dispatch(setElementsFromURLs( {uuid : selectedDrug.uuid, selectedPathways: pathwayIds}));
        }}
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
