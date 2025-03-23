import { combineReducers } from "@reduxjs/toolkit";
import { transactionsSlice } from "./slices/transactionsSlice";
import { uiSlice } from "./slices/uiSlice";

export const rootReducer = combineReducers({
    transaction: transactionsSlice.reducer,
    ui: uiSlice.reducer,
});

