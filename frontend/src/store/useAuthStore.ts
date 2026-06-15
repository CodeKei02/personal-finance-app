import { create } from "zustand";
import { api, getToken, setToken } from "@/lib/api";
import { useCurrencyStore, type CurrencyCode } from "./useCurrencyStore";

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string | null;
  isGuest: boolean;
  preferredCurrency: CurrencyCode;
}

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface AuthStore {
  status: AuthStatus;
  user: AuthUser | null;
  errorMessage: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  loadSession: () => Promise<void>;
  logout: () => void;
}

function applyUser(user: AuthUser) {
  // Reflect the saved currency preference without re-persisting it.
  void useCurrencyStore.getState().setCurrency(user.preferredCurrency, false);
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: "checking",
  user: null,
  errorMessage: null,

  login: async (email, password) => {
    const data = await api.post<AuthResponse>("/auth/login", { email, password }, false);
    setToken(data.token);
    applyUser(data.user);
    set({ status: "authenticated", user: data.user, errorMessage: null });
  },

  register: async (email, password, displayName) => {
    const data = await api.post<AuthResponse>(
      "/auth/register",
      { email, password, displayName },
      false
    );
    setToken(data.token);
    applyUser(data.user);
    set({ status: "authenticated", user: data.user, errorMessage: null });
  },

  guestLogin: async () => {
    const data = await api.post<AuthResponse>("/auth/guest", {}, false);
    setToken(data.token);
    applyUser(data.user);
    set({ status: "authenticated", user: data.user, errorMessage: null });
  },

  loadSession: async () => {
    const token = getToken();
    if (!token) {
      set({ status: "not-authenticated", user: null });
      return;
    }
    try {
      const data = await api.get<{ user: AuthUser }>("/auth/me");
      applyUser(data.user);
      set({ status: "authenticated", user: data.user, errorMessage: null });
    } catch {
      setToken(null);
      set({ status: "not-authenticated", user: null });
    }
  },

  logout: () => {
    setToken(null);
    set({ status: "not-authenticated", user: null, errorMessage: null });
  },
}));
