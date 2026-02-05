import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Draft } from 'immer';

export interface GenericState<T extends { id: string }> {
    items: T[];
    selectedItem: T | null;
    isEditModalOpen: boolean;
    isCreateModalOpen: boolean;
    loading: boolean;
    error: string | null;
}

export function createGenericSlice<T extends { id: string }>(entityName: string) {
    const fetchItems = createAsyncThunk(`${entityName}/fetchItems`, async (): Promise<T[]> => {
        return [];
    });

    const addItem = createAsyncThunk(`${entityName}/addItem`, async (item: T): Promise<T> => {
        return item;
    });

    const updateItem = createAsyncThunk(`${entityName}/updateItem`, async (item: T): Promise<T> => {
        return item;
    });

    const deleteItem = createAsyncThunk(`${entityName}/deleteItem`, async (id: string): Promise<string> => {
        return id;
    });

    const initialState: GenericState<T> = {
        items: [],
        selectedItem: null,
        isEditModalOpen: false,
        isCreateModalOpen: false,
        loading: false,
        error: null,
    };

    const slice = createSlice({
        name: entityName,
        initialState,
        reducers: {
            openEditModal(state, action: PayloadAction<T>) {
                state.selectedItem = action.payload as Draft<T> | null;
                state.isEditModalOpen = true;
            },
            closeEditModal(state) {
                state.isEditModalOpen = false;
                state.selectedItem = null;
            },
            openCreateModal(state) {
                state.isCreateModalOpen = true;
            },
            closeCreateModal(state) {
                state.isCreateModalOpen = false;
            },
        },
    });

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        fetchItems,
        addItem,
        updateItem,
        deleteItem,
    };
}
