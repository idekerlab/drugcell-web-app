import { createSlice } from '@reduxjs/toolkit';
import { selectSelectedPathways } from '../pathwaySlice';

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
    }
  },
});

export const { setElements, addElements } = networkSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(importFromURL(xyz))`. 
export const setElementsFromURLs = ( args ) => dispatch => { 
  console.log('setElementsFromURLs args: ' + JSON.stringify(args));
  Promise.all(args.selectedPathways.map(u=>fetch( 'http://localhost/data/paths/' + args.uuid + '/' + u +'.json' ))).then(responses =>
    Promise.all(responses.map(res => res.json()))
  ).then(jsonResponses => {
    let allElements = [];
    jsonResponses.forEach(elements => {
      allElements = allElements.concat(elements.shortestPath);
    });
    dispatch(setElements(allElements));
  });

  /*
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
  */
  
};

export const selectElements = state => state.network.elements;
export const selectPathways = state => state.network.pathways;

export default networkSlice.reducer;