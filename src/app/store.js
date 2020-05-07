import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/network/networkSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
