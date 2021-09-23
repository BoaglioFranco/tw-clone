import { isServer } from "../utils/isServer";
import create from "zustand";

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLocalStorage = (key: string) => {
  if (!isServer) {
    return localStorage.getItem(key);
  }
  return null;
};

interface StoreState {
  token: string;
  user: {
    username: string;
    pfp: string;
    id: number;
  } | null;
  setToken: (token: string, expiresIn: number) => any;
  setUser: (user: { username: string; pfp: string; id: number }) => any;
}

//TODO: FIX TOKEN EXPIRATION ON PAGE RELOAD
export const useStore = create<StoreState>((set) => ({
  token: readFromLocalStorage("token") || "",
  user: JSON.parse(readFromLocalStorage("user")!) || null,
  setToken: (token, expiresIn) => {
    set((state) => ({ token }));
    saveToLocalStorage("token", token);
    setTimeout(() => {
      console.log("token expired");
    }, expiresIn - 10000);
  },
  setUser: (user) => {
    set((state) => {
      user;
    });
    saveToLocalStorage("user", user);
  },
}));
