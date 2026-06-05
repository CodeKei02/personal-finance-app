import { create } from "zustand";

interface UiStore {
  isOpen: boolean;
  isModalOpen: boolean;
  isTemplateOpen: boolean;
  toggleMenu: () => void;
  openModal: () => void;
  closeModal: () => void;
  openTemplate: () => void;
  closeTemplate: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isOpen: false,
  isModalOpen: false,
  isTemplateOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  openTemplate: () => set({ isTemplateOpen: true }),
  closeTemplate: () => set({ isTemplateOpen: false }),
}));
