import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number | any;
  date: string;
  recurring: boolean;
  transactiontype: string;
}

interface TransactionsState {
  transactions: Transaction[];
  selectedCategory: string;
  selectedSearch: string;
  sortBy: 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest';
  loading: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  selectedCategory: 'All Transactions',
  selectedSearch: '',
  sortBy: 'Latest',
  loading: false,
};

export const transactionsSlice = (sliceName: string) => {
  const fetchTransactions = createAsyncThunk(
    `${sliceName}/fetchTransactions`, 
    async (): Promise<Transaction[]> => {
      return [];
    })

    const slice = createSlice({
      name: sliceName,
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
      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchTransactions.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
          })
      }
    })

    return {
      ...slice,
      fetchTransactions,
    };
}

export const { addTransactions, filterByCategory, filterBy, searchTransaction } = transactionsSlice('transactions').actions;
export default transactionsSlice('transactions').reducer;