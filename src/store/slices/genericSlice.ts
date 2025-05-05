import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export interface GenericState<T> {
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
                state.selectedItem = action.payload;
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
                    state.items = action.payload;
                    state.loading = false;
                })
                .addCase(fetchItems.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'Error';
                })
                .addCase(addItem.fulfilled, (state, action) => {
                    state.items.push(action.payload);
                })
                .addCase(updateItem.fulfilled, (state, action) => {
                    const index = state.items.findIndex((index: any) => index.id === action.payload.id);
                    console.log("index", index);
                    console.log("action.payload", action.payload.id);
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                })
                .addCase(deleteItem.fulfilled, (state, action) => {
                    state.items = state.items.filter((index: any) => index.id !== action.payload);
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
