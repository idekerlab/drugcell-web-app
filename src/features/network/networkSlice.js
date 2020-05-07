import { createSlice } from '@reduxjs/toolkit';

export const networkSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [
      { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
      { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
      { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
   ]
  },
  reducers: {
    setElements: (state, action) => {
      state.value = action.payload;
    },
    addElements: (state,action) => {
      state.value = state.value.concat(action.payload);
    }
  },
});

export const { setElements, addElements } = networkSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectElements = state => state.counter.value;

export default networkSlice.reducer;
