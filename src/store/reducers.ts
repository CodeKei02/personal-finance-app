import { combineReducers } from "@reduxjs/toolkit";
import { transactionsSlice } from "./slices/transactionsSlice";
import { uiSlice } from "./slices/uiSlice";
import { budgetsReducer  } from "./slices/budgetsSlice";
import { potsReducer } from "./slices/potsSlice";

export const rootReducer = combineReducers({
    transaction: transactionsSlice.reducer,
    budget: budgetsReducer,
    pot: potsReducer,
    ui: uiSlice.reducer
});

