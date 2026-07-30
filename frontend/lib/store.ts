import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("forgemind_token", token);
      localStorage.setItem("forgemind_user", JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("forgemind_token");
      localStorage.removeItem("forgemind_user");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  initialize: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("forgemind_token");
      const userStr = localStorage.getItem("forgemind_user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ user, token, isAuthenticated: true });
          return;
        } catch {
          localStorage.removeItem("forgemind_token");
          localStorage.removeItem("forgemind_user");
        }
      }
      
      // Auto-initialize demo engineer user so /dashboard opens seamlessly
      const demoUser: User = {
        id: "demo-engineer-1",
        email: "engineer@forgemind.ai",
        full_name: "Senior Systems Engineer",
        created_at: new Date().toISOString(),
        is_active: true,
      };
      const demoToken = "demo-jwt-token-access-2026";
      localStorage.setItem("forgemind_token", demoToken);
      localStorage.setItem("forgemind_user", JSON.stringify(demoUser));
      set({ user: demoUser, token: demoToken, isAuthenticated: true });
    }
  },
}));
