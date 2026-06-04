import { createGenericSlice } from "./genericSlice";
import { Budget } from "@/features/budgets/types";

export const {
    reducer: budgetsReducer,
    actions: budgetActions,
    addItem: addBudgetItem,
    updateItem: updateBudgetItem,
    deleteItem: deleteBudgetItem,
    fetchItems: fetchBudgets,
} = createGenericSlice<Budget>('budgets');

