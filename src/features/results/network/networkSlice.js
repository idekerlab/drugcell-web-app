import { createSlice } from '@reduxjs/toolkit';
import { setGenes } from '../../genes/geneSlice'
import { selectSelectedPathways } from '../pathwaySlice';

import { getPathway } from '../../../api/drugcell'

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
export const setElementsFromURLs = (args) => dispatch => {
  console.log('setElementsFromURLs args: ' + JSON.stringify(args));
  Promise.all(args.selectedPathways.map(pathwayId => getPathway( args.uuid , pathwayId))).then(responses =>
    Promise.all(responses.map(res => res.json()))
  ).then(jsonResponses => {
    let allElements = [];
    let allGenes = [];
    jsonResponses.forEach(elements => {
      allElements = allElements.concat(elements.shortestPath);
      elements.genes.forEach(gene => {
        gene.data.name && allGenes.push({ 'name' : gene.data.name, 'shared-name': gene.data['shared-name'] } );
      });
    });
    dispatch(setGenes(allGenes));
    dispatch(setElements(allElements));
  });
};

export const selectElements = state => state.network.elements;
export const selectPathways = state => state.network.pathways;

export default networkSlice.reducer;