import { createSlice } from '@reduxjs/toolkit';
import { setGenes } from '../genes/geneSlice'
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
export const setElementsFromURLs = (args) => (dispatch, getState) => {
  //console.log('setElementsFromURLs args: ' + JSON.stringify(args));
  Promise.all(args.selectedPathways.map(pathwayId => getPathway( args.uuid , pathwayId))).then(responses =>
    Promise.all(responses.map(res => res.json()))
  ).then(jsonResponses => {
    let allElements = [];
   
    jsonResponses.forEach(elements => {
      allElements = allElements.concat(elements);
    });

    const rootNode = allElements.find(element => element.data['shared-name'] === 'GO:0008150');

    rootNode && (rootNode.data['label'] = 'Cell State');

    const drugName = getState().drugs.selectedDrugName;

    const drugNode = { data : {
      'id' : 'drug',
      'name' : drugName,
      'label' : drugName
    }}

    const responseNode = { data : {
      'id' : 'response',
      'name' : 'Cell Response',
      'label' : 'Cell Response'
    }}


    allElements.push(drugNode);
    allElements.push(responseNode);

    console.log("root node: " + JSON.stringify(rootNode));

    dispatch(setElements(allElements));
  });
};

export const selectElements = state => state.network.elements;
export const selectPathways = state => state.network.pathways;

export default networkSlice.reducer;