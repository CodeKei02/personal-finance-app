import { combineReducers } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/uiSlice";
import { budgetsReducer  } from "./slices/budgetsSlice";
import { potsReducer } from "./slices/potsSlice";
import { transactionsSlice } from "./slices/transactionsSlice";
import { authSlice } from "./auth/authSlice";

const transactions = transactionsSlice("transactions");

export const rootReducer = combineReducers({
    transaction: transactions.reducer,
    budget: budgetsReducer,
    pot: potsReducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
});

