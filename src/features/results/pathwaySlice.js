import { createSlice } from '@reduxjs/toolkit';
import { getPathways } from '../../api/drugcell'

export const pathwaySlice = createSlice({
  name: 'pathways',
  initialState: {
    availablePathways: [],
    selectedPathways: []
  },
  reducers: {
    setAvailablePathways: (state, action) => {
      state.availablePathways = action.payload;
    },
    setSelectedPathways: (state, action) => {
      state.selectedPathways = action.payload;
    }
  },
});

export const { setAvailablePathways: setAvailablePathways,
              setSelectedPathways: setSelectedPathways } = pathwaySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(importPathwaysFromURL(url))`. 
export const importPathwaysFromURL = drugUUID => dispatch => {

  console.log('Drug load: ' + drugUUID);   
  getPathways(drugUUID)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status + ' (' + JSON.stringify(response.headers) + ')' );
       }
       return response.json();
   })
   .then(json => {
    
    dispatch(setAvailablePathways(json.index));
  
   })
   .catch( error => {
       console.log(error);
   });
  
  
};

export const selectAvailablePathways = state => state.pathways.availablePathways;
export const selectSelectedPathways = state => state.pathways.selectedPathways;

export default pathwaySlice.reducer;