import { createSlice } from '@reduxjs/toolkit';

export const drugSlice = createSlice({
  name: 'drugs',
  initialState: {
    drugs: []
  },
  reducers: {
    setDrugs: (state, action) => {
      state.drugs = action.payload;
    }
  },
});

export const { setDrugs } = drugSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const importDrugsFromURL = url => dispatch => {

  console.log('URL load: ' + url);   
  fetch(url, {mode: 'no-cors'})
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status + ' (' + JSON.stringify(response.headers) + ')' );
       }
       return response.json();
   })
   .then(json => {
    
    dispatch(setDrugs(json));
       
   })
   .catch( error => {
       console.log(error);
   });
  
  
};

export const selectDrugs = state => state.drugs.drugs;

export default drugSlice.reducer;