import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Transaction {
  id: string;
  transactionName: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionsState {
  transactions: Transaction[][];
  currentList: number;
  selectedCategory: string;
  selectedSearch: string;
  filterBy: 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest';
}

const initialState: TransactionsState = {
  transactions: [[]],
  currentList: 0,
  selectedCategory: 'All Transactions',
  selectedSearch: '',
  filterBy: 'Latest'
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<Transaction>) => {
      const transactionLastList = state.transactions[state.transactions.length - 1];

      if(transactionLastList.length < 11){
        transactionLastList.push(action.payload);
      }else{
        state.transactions.push([action.payload]);
      }
    },
    prevPage: (state) => {
      if(state.currentList > 0){
        state.currentList--;
      }
    },
    nextPage: (state) => {
      if(state.currentList < state.transactions.length - 1){
        state.currentList++;
      }
    },
    searchTransaction: (state, action: PayloadAction<string>) => {
      state.selectedSearch = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    sortBy: (state, action: PayloadAction<'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest'>) => {
      state.filterBy = action.payload;
    },
  }
});

export const { addTransactions, prevPage, nextPage, filterByCategory, sortBy, searchTransaction } = transactionsSlice.actions;
