import { createSlice } from '@reduxjs/toolkit';

import {
  getPathways,
} from './pathwaySlice';

import {
  getDrugs as getDrugsAPI } from '../../api/drugcell'

export const drugSlice = createSlice({
  name: 'drugs',
  initialState: {
    availableDrugs: {},
    selectedDrug: undefined
  },
  reducers: {
    setAvailableDrugs: (state, action) => {
      state.availableDrugs = action.payload;
     
    },
    setSelectedDrug: (state, action) => {
      state.selectedDrug = action.payload;
    }
  },
});

export const { setAvailableDrugs: setAvailableDrugs,
              setSelectedDrug: setSelectedDrug } = drugSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getDrugs = () => dispatch => {   
  getDrugsAPI()
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status + ' (' + JSON.stringify(response.headers) + ')' );
       }
       return response.json();
   })
   .then(json => {
    dispatch(setAvailableDrugs(json));
   })
   .catch( error => {
       console.log(error);
   });
};

export const selectDrug = drugUUID => dispatch => {

  console.log('selected drug uuid: ' + drugUUID);
  dispatch(setSelectedDrug(drugUUID));
  dispatch(getPathways(drugUUID));
};

export const selectAvailableDrugs = state => state.drugs.availableDrugs;
export const selectSelectedDrug = state => state.drugs.selectedDrug;

export default drugSlice.reducer;