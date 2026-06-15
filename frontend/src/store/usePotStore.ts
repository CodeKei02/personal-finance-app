import { create } from "zustand";
import { api } from "@/lib/api";
import type { Pot } from "@/features/pots/types";

interface PotInput {
  id?: string;
  potName: string;
  amount: number;
  target: number;
  theme: string;
}

interface PotStore {
  items: Pot[];
  selectedItem: Pot | null;
  loading: boolean;
  fetchPots: () => Promise<void>;
  addPot: (input: PotInput) => Promise<void>;
  updatePot: (input: PotInput) => Promise<void>;
  deletePot: (id: string) => Promise<void>;
}

export const usePotStore = create<PotStore>((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,

  fetchPots: async () => {
    set({ loading: true });
    try {
      const items = await api.get<Pot[]>("/pots");
      set({ items });
    } finally {
      set({ loading: false });
    }
  },

  addPot: async (input) => {
    await api.post("/pots", {
      potName: input.potName,
      amount: input.amount ?? 0,
      target: input.target,
      theme: input.theme,
    });
    await get().fetchPots();
  },

  updatePot: async (input) => {
    if (!input.id) return;
    await api.put(`/pots/${input.id}`, {
      potName: input.potName,
      amount: input.amount,
      target: input.target,
      theme: input.theme,
    });
    await get().fetchPots();
  },

  deletePot: async (id) => {
    await api.del(`/pots/${id}`);
    await get().fetchPots();
  },
}));
