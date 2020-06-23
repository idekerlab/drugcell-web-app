import { createSlice } from '@reduxjs/toolkit';

import {
  getPathways,
} from '../pathway/pathwaySlice';

import {
  getDrugs as getDrugsAPI
} from '../../api/drugcell'

export const drugSlice = createSlice({
  name: 'drugs',
  initialState: {
    availableDrugs: {},
    selectedDrug: undefined,
    selectedDrugName: undefined
  },
  reducers: {
    setAvailableDrugs: (state, action) => {
      state.availableDrugs = action.payload;
    },
    setSelectedDrug: (state, action) => {
      state.selectedDrug = action.payload;
    },
    setSelectedDrugName: (state, action) => {
      state.selectedDrugName = action.payload;
    }
  },
});

export const { 
  setAvailableDrugs: setAvailableDrugs,
  setSelectedDrug: setSelectedDrug,
  setSelectedDrugName: setSelectedDrugName
} = drugSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getDrugs = () => dispatch => {
  getDrugsAPI()
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status + ' (' + response.statusText + ')');
      }
      return response.json();
    })
    .then(json => {
      dispatch(setAvailableDrugs(json));
      const drugUUID = '09b7ee9d-80e0-11ea-aaef-0ac135e8bacf';
      dispatch(setSelectedDrug(drugUUID));
      dispatch(setSelectedDrugName('etoposide'));
      dispatch(getPathways(drugUUID));
    })
    .catch(error => {
      console.log(error);
    });
};

export const selectDrug = drug => dispatch => {

  console.log('selected drug uuid: ' + drug.uuid);
  dispatch(setSelectedDrug(drug.uuid));
  dispatch(setSelectedDrugName(drug.name));
  dispatch(getPathways(drug.uuid));
};

export const selectAvailableDrugs = state => state.drugs.availableDrugs;
export const selectSelectedDrug = state => state.drugs.selectedDrug;
export const selectSelectedDrugName = state => state.drugs.selectedDrugName;

export default drugSlice.reducer;