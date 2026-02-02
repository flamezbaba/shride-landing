"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  userToken: String | null;
  user: Object | any;
  globalImage: any;
  cart: any[];
  hasHydrated: boolean;
  address: any;

  setStoreCart: (cart: any[]) => void;
  clearStoreCart: () => void;
  clearStoreUser: () => void;
  setStoreUser: (user: any, userToken?: any) => void;
  setStoreAddress: (address: any) => void;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userToken: null,
      globalImage: null,
      cart: [],
      hasHydrated: false,
      address: null,
      setStoreCart: (cart: any) => set({ cart }),
      clearStoreCart: () => set({ cart: [] }),
      setStoreUser: (user: any, userToken?: any) =>
        set({ user: user, userToken: userToken }),
      clearStoreUser: () => set({ user: null, userToken: null }),
      setStoreAddress: (address: any) => set({ address }),
    }),
    {
      name: "useUserStore",
      onRehydrateStorage: () => (state: any, error) => {
        if (error) {
          console.error("Hydration failed", error);
        } else {
          if (state) {
            state.hasHydrated = true;
          }
          // console.log("Zustand hydrated", state);
        }
      },
    },
  ),
);

export const setToken = (token: string) => {
  useUserStore.setState({
    userToken: token,
  });
};

export const setGlobalImage = (val: any) => {
  useUserStore.setState({
    globalImage: val,
  });
};

