import { ADD_TRANSACTION, DELETE_TRANSACTION } from './actions';

const initialState = {
  transactions: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export default transactionReducer;
