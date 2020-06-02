import { createSlice } from '@reduxjs/toolkit';

import { getGenes} from '../../../api/drugcell'

export const geneSlice = createSlice({
  name: 'genes',
  initialState: {
    genes: [ ]
  },
  reducers: {
    setGenes: (state, action) => {
      state.genes = action.payload;
    }
  },
});

export const { setGenes: setGenes } = geneSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(setGenesFromURLs(xyz))`. 
export const setGenesFromURLs = (args) => dispatch => {
  console.log('setGenesFromURLs args: ' + JSON.stringify(args));
  Promise.all(args.selectedPathways.map(pathwayId => getGenes( args.uuid , pathwayId))).then(responses =>
    Promise.all(responses.map(res => res.json()))
  ).then(jsonResponses => {
  
    let allGenes = [];
    jsonResponses.forEach(elements => {
      allGenes = allGenes.concat(elements.map( element => element.includes('.') 
      ? element.substring(0, element.indexOf('.')) : element));
    });
    
    dispatch(setGenes(allGenes.filter((value, index, self) => self.indexOf(value) === index)));
  });
};

export const selectGenes = state => state.genes.genes;

export default geneSlice.reducer;