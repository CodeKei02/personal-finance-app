import { create } from "zustand";
import { api } from "@/lib/api";
import type { Budget } from "@/features/budgets/types";

interface BudgetInput {
  id?: string;
  category: string;
  maximum: number;
  theme: string;
}

interface BudgetStore {
  items: Budget[];
  selectedItem: Budget | null;
  loading: boolean;
  fetchBudgets: () => Promise<void>;
  addBudget: (input: BudgetInput) => Promise<void>;
  updateBudget: (input: BudgetInput) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,

  fetchBudgets: async () => {
    set({ loading: true });
    try {
      const items = await api.get<Budget[]>("/budgets");
      set({ items });
    } finally {
      set({ loading: false });
    }
  },

  addBudget: async (input) => {
    await api.post("/budgets", {
      category: input.category,
      maximum: input.maximum,
      theme: input.theme,
    });
    await get().fetchBudgets();
  },

  updateBudget: async (input) => {
    if (!input.id) return;
    await api.put(`/budgets/${input.id}`, {
      category: input.category,
      maximum: input.maximum,
      theme: input.theme,
    });
    await get().fetchBudgets();
  },

  deleteBudget: async (id) => {
    await api.del(`/budgets/${id}`);
    await get().fetchBudgets();
  },
}));
