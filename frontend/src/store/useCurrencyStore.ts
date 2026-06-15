import { create } from "zustand";
import { api } from "@/lib/api";

export type CurrencyCode = "USD" | "VES" | "EUR";

interface RatesResponse {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  cached: boolean;
}

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  VES: "Bs",
};

interface CurrencyStore {
  currency: CurrencyCode;
  rates: Record<string, number>;
  loading: boolean;
  fetchRates: () => Promise<void>;
  setCurrency: (currency: CurrencyCode, persist?: boolean) => Promise<void>;
  convert: (amountUsd: number) => number;
  format: (amountUsd: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currency: "USD",
  rates: { USD: 1 },
  loading: false,

  fetchRates: async () => {
    set({ loading: true });
    try {
      const data = await api.get<RatesResponse>("/currency/rates", false);
      set({ rates: { USD: 1, ...data.rates } });
    } finally {
      set({ loading: false });
    }
  },

  setCurrency: async (currency, persist = true) => {
    set({ currency });
    if (persist) {
      try {
        await api.patch("/users/me/currency", { preferredCurrency: currency });
      } catch {
        // Non-fatal: keep the local selection even if persistence fails.
      }
    }
  },

  convert: (amountUsd) => {
    const { currency, rates } = get();
    const rate = rates[currency] ?? 1;
    return amountUsd * rate;
  },

  format: (amountUsd) => {
    const { currency } = get();
    const value = get().convert(amountUsd);
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${SYMBOLS[currency]}${formatted}`;
  },
}));
