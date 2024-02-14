import { writable } from "svelte/store";
import { loginApi } from "../api/auth";
import { push } from "svelte-spa-router";

type StoreUser = {
  id: number | null;
  email: string;
  isAuthenticated: boolean;
  token: string;
};

export type AuthState = {
  user: StoreUser;
  loading: boolean;
  error: string | null;
};

const initialState = (): AuthState => {
  const user = localStorage.getItem("user");

  const baseObj = {
    loading: false,
    error: null,
  };

  if (!user) {
    return {
      ...baseObj,
      user: {
        id: null,
        email: "",
        isAuthenticated: false,
        token: "",
      },
    };
  }

  const userObj: StoreUser = JSON.parse(user);
  const token = JSON.parse(user).token;

  return {
    ...baseObj,
    user: {
      id: userObj.id,
      email: userObj.email,
      isAuthenticated: !!token,
      token: token || "",
    },
  };
};

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>(initialState());

  const syncLogin = (e: StorageEvent) => {
    if (e.key === "user") {
      if (e.newValue) {
        const user = JSON.parse(e.newValue);
        set({
          ...initialState(),
          user: {
            id: user.id,
            email: user.email,
            isAuthenticated: true,
            token: user.token,
          },
        });
      } else {
        set({ ...initialState() });
        push("/login");
      }
    }
  };

  window.addEventListener("storage", syncLogin);

  return {
    subscribe,
    login: async (email: string, password: string) => {
      if (!email || !password) {
        update((state) => ({
          ...state,
          error: "Please provide an email and password",
        }));
        return;
      }
      update((state) => ({ ...state, loading: true }));
      try {
        const res = await loginApi(email, password);
        update((state) => ({
          ...state,
          user: { ...res.user, isAuthenticated: true },
          loading: false,
          error: null,
        }));
        localStorage.setItem("user", JSON.stringify(res.user));
        push("/profile");
      } catch (error) {
        const err = error as Error;
        update((state) => ({
          ...state,
          error: err.message,
          loading: false,
        }));
      }
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ ...initialState() });
      push("/login");
    },
    destroy: () => {
      window.removeEventListener("storage", syncLogin);
    },
  };
};

export const authStore = createAuthStore();
