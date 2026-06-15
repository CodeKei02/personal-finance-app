import { create } from "zustand";
import { api } from "@/lib/api";
import type { Transaction } from "@/features/transactions/types";

interface ApiTransaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  transactionType: "income" | "expense";
}

interface ListResponse {
  data: ApiTransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NewTransactionInput {
  name: string;
  amount: number;
  category: string;
  transactiontype: string;
  recurring: boolean;
  date: string;
}

function fromApi(t: ApiTransaction): Transaction {
  return {
    id: t.id,
    name: t.name,
    category: t.category,
    amount: t.amount,
    date: typeof t.date === "string" ? t.date.slice(0, 10) : t.date,
    recurring: t.recurring,
    transactiontype: t.transactionType,
  };
}

interface TransactionStore {
  // Server-side paginated list (Transactions page)
  list: Transaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  // Full dataset for dashboard/bills/budgets analytics
  all: Transaction[];
  // Filters
  selectedCategory: string;
  selectedSearch: string;
  sortBy: string;

  setPage: (page: number) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedSearch: (search: string) => void;
  setSortBy: (sortBy: string) => void;

  fetchTransactions: () => Promise<void>;
  fetchAll: () => Promise<void>;
  addTransaction: (input: NewTransactionInput) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  list: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  all: [],
  selectedCategory: "All Transactions",
  selectedSearch: "",
  sortBy: "Latest",

  setPage: (page) => set({ page }),
  setSelectedCategory: (category) => set({ selectedCategory: category, page: 1 }),
  setSelectedSearch: (search) => set({ selectedSearch: search, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),

  fetchTransactions: async () => {
    const { page, limit, selectedCategory, selectedSearch, sortBy } = get();
    set({ loading: true });
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy,
      });
      if (selectedCategory && selectedCategory !== "All Transactions") {
        params.set("category", selectedCategory);
      }
      if (selectedSearch) params.set("search", selectedSearch);

      const res = await api.get<ListResponse>(`/transactions?${params.toString()}`);
      set({
        list: res.data.map(fromApi),
        total: res.total,
        totalPages: res.totalPages,
        page: res.page,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchAll: async () => {
    // Large page used to feed client-side analytics (charts, budgets, bills).
    const res = await api.get<ListResponse>("/transactions?page=1&limit=1000&sortBy=Latest");
    set({ all: res.data.map(fromApi) });
  },

  addTransaction: async (input) => {
    await api.post("/transactions", input);
    await Promise.all([get().fetchTransactions(), get().fetchAll()]);
  },
}));
