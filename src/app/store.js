import { configureStore } from '@reduxjs/toolkit';
import networkReducer from '../features/results/network/networkSlice';
import drugReducer from '../features/results/drugSlice';
import pathwayReducer from '../features/results/pathwaySlice';
import geneReducer from '../features/results/genes/geneSlice';

export default configureStore({
  reducer: {
    network: networkReducer,
    drugs: drugReducer,
    pathways: pathwayReducer,
    genes: geneReducer
  },
});
