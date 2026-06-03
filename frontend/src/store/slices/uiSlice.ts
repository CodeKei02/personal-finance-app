import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isOpen: boolean;
  isModalOpen: boolean;
  isTemplateOpen: boolean;
}

const initialState: UIState = {
  isOpen: false,
  isModalOpen: false,
  isTemplateOpen: false,
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
    },
    openTemplate: (state) => {
      state.isTemplateOpen = true;
    },
    closeTemplate: (state) => {
      state.isTemplateOpen = false;
    }
  }
});

export const { toggleMenu, isCloseModal, isOpenModal, openTemplate, closeTemplate} = uiSlice.actions;

