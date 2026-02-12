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
        extraReducers: (builder) => {
            builder
                .addCase(fetchItems.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchItems.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items = action.payload as Draft<T[]>;
                })
                .addCase(fetchItems.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? `Failed to fetch ${entityName}`;
                })
                .addCase(addItem.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(addItem.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items.push(action.payload as Draft<T>);
                })
                .addCase(addItem.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? `Failed to add ${entityName}`;
                })
                .addCase(updateItem.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateItem.fulfilled, (state, action) => {
                    state.loading = false;
                    const index = state.items.findIndex((item) => item.id === action.payload.id);
                    if (index !== -1) {
                        state.items[index] = action.payload as Draft<T>;
                    }
                })
                .addCase(updateItem.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? `Failed to update ${entityName}`;
                })
                .addCase(deleteItem.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(deleteItem.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items = state.items.filter((item) => item.id !== action.payload) as Draft<T[]>;
                })
                .addCase(deleteItem.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? `Failed to delete ${entityName}`;
                });
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
