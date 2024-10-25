import { createStore } from 'redux';
import transactionReducer from './reducers';
import transactionsSlice from './transactionsSlice';

const store = createStore(transactionReducer);

export default store;
