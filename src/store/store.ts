import { configureStore } from '@reduxjs/toolkit'
import { transactionsSlice } from './slices/transactionsSlice'
import { uiSlice } from './slices/uiSlice'
import { loadState, saveState } from '../localstorage/index'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    ui: uiSlice.reducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch