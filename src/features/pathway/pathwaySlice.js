import { createSlice } from '@reduxjs/toolkit';
import { getPathways as getPathwaysAPI } from '../../api/drugcell'

import {
  setElementsFromURLs
} from '../results/network/networkSlice';

export const pathwaySlice = createSlice({
  name: 'pathways',
  initialState: {
    availablePathways: {},
    selectedPathways: []
  },
  reducers: {
    setAvailablePathways: (state, action) => {
      const rankedPathways = Object.entries(action.payload).reduce(
        (acc, [key, value], index) => {
          value.rank = index + 1;
          acc[key] = value;
          return acc;
        }, {})
      state.availablePathways = rankedPathways;
    },
    setSelectedPathways: (state, action) => {
      state.selectedPathways = action.payload;
    }
  },
});

export const { setAvailablePathways: setAvailablePathways,
  setSelectedPathways: setSelectedPathways,
  setSelectedPathwaysByRank: setSelectedPathwaysByRank } = pathwaySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(importPathwaysFromURL(url))`. 
export const getPathways = drugUUID => dispatch => {

  console.log('Drug load: ' + drugUUID);
  getPathwaysAPI(drugUUID)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status + ' (' + JSON.stringify(response.headers) + ')');
      }
      return response.json();
    })
    .then(json => {

      dispatch(setAvailablePathways(json.index));
      const numberToSelect = 5;
      const pathways = json.index;
      const selectedPathways = Object.keys(pathways).sort((a, b) => pathways[b].rlipp - pathways[a].rlipp).slice(0, numberToSelect);
      dispatch(setSelectedPathways(selectedPathways));

      const uuids = selectedPathways.map((key) => pathways[key]['shared-name']);

      dispatch(setElementsFromURLs({ uuid: drugUUID, selectedPathways: uuids }));

    })
    .catch(error => {
      console.log(error);
    });


};

export const selectAvailablePathways = state => state.pathways.availablePathways;
export const selectSelectedPathways = state => state.pathways.selectedPathways;

export default pathwaySlice.reducer;