import { configureStore } from '@reduxjs/toolkit';
import networkReducer from '../features/network/networkSlice';

export default configureStore({
  reducer: {
    network: networkReducer,
  },
});
