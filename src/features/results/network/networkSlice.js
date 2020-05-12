import { createSlice } from '@reduxjs/toolkit';

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    pathways: {},
    elements: [
   ]
  },
  reducers: {
    setElements: (state, action) => {
      state.elements = action.payload;
    },
    addElements: (state,action) => {
      state.elements = state.elements.concat(action.payload);
    }
  },
});

export const { setElements, addElements } = networkSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(importFromURL(xyz))`. 
export const importFromURL = url => dispatch => {

  console.log('URL load: ' + url);   
  fetch(url, {mode: 'no-cors'})
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status + ' (' + JSON.stringify(response.headers) + ')' );
       }
       return response.json();
   })
   .then(json => {
    
    dispatch(addElements(json));
       
   })
   .catch( error => {
       console.log(error);
   });
  
  
};

export const selectElements = state => state.network.elements;
export const selectPathways = state => state.network.pathways;

export default networkSlice.reducer;