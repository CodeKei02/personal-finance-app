import { createGenericSlice } from "./genericSlice";

export interface Pot {
    id: string;
    potName: string;
    amount: number;
    target: number;
    theme: string;
}

export const {
    reducer: potsReducer,
    actions: potActions,
    addItem: addPotItem,
    updateItem: updatePotItem,
    deleteItem: deletePotItem,
    fetchItems: fetchPots,
} = createGenericSlice<Pot>('pots');
