import { createSlice } from '@reduxjs/toolkit';

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
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const importPathwaysFromURL = url => dispatch => {

  console.log('URL load: ' + url);   
  fetch(url, {mode: 'no-cors'})
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