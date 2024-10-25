// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice'; // Correct import path

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;
