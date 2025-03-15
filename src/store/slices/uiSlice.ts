import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isOpen: boolean;
  isModalOpen: boolean;
}

const initialState: UIState = {
  isOpen: false,
  isModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen 
    },
    isCloseModal: (state) => {
      state.isModalOpen = false
    },
    isOpenModal: (state) => {
      state.isModalOpen = true;
    }
  }
});

export const { toggleMenu, isCloseModal, isOpenModal } = uiSlice.actions;

