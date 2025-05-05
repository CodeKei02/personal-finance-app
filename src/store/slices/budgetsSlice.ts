import { createGenericSlice } from "./genericSlice";

export interface Budget {
    id: string;
    category: string;
    maximum: number;
    theme: string;
}

export const {
    reducer: budgetsReducer,
    actions: budgetActions,
    addItem: addBudgetItem,
    updateItem: updateBudgetItem,
    deleteItem: deleteBudgetItem,
    fetchItems: fetchBudgets,
} = createGenericSlice<Budget>('budgets');

