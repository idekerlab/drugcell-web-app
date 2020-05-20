import { createSlice } from '@reduxjs/toolkit';

export const geneSlice = createSlice({
  name: 'genes',
  initialState: {
    genes: [ 'floon', 'lorp' ]
  },
  reducers: {
    setGenes: (state, action) => {
      state.genes = action.payload;
    }
  },
});

export const { setGenes: setGenes } = geneSlice.actions;

export const selectGenes = state => state.genes.genes;

export default geneSlice.reducer;