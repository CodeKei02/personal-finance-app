import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Transaction {
  id: string;
  transactionName: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionsState {
  transactions: Transaction[];
  selectedCategory: string;
  selectedSearch: string;
  sortBy: 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest';
}

const initialState: TransactionsState = {
  transactions: [],
  selectedCategory: 'All Transactions',
  selectedSearch: '',
  sortBy: 'Latest'
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    searchTransaction: (state, action: PayloadAction<string>) => {
      state.selectedSearch = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    filterBy: (state, action: PayloadAction<'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest'>) => {
      state.sortBy = action.payload;
    },
  }
});

export const { addTransactions, filterByCategory, filterBy, searchTransaction } = transactionsSlice.actions;
