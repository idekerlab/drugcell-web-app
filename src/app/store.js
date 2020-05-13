import { configureStore } from '@reduxjs/toolkit';
import networkReducer from '../features/results/network/networkSlice';
import drugReducer from '../features/results/drugSlice';
import pathwayReducer from '../features/results/pathwaySlice';

export default configureStore({
  reducer: {
    network: networkReducer,
    drugs: drugReducer,
    pathways: pathwayReducer
  },
});
