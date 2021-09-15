import { isServer } from "../utils/isServer";
import create from "zustand";

const saveToLocalStorage = (token: string) => {
  localStorage.token = token;
};

const readFromLocalStorage = () => {
  if (!isServer){
    return localStorage.token;
  }
  return null;
};

interface StoreState {
  token: string;
  user: {
    username: string;
    email: string;
    id: number;
  } | null;
  setToken: (token: string, expiresIn: number) => any;
}

//TODO: FIX TOKEN EXPIRATION ON PAGE RELOAD
export const useStore = create<StoreState>((set) => ({
  token: readFromLocalStorage() || "",
  user: null,
  setToken: (token, expiresIn) => {
    set((state) => ({ token }));
    saveToLocalStorage(token);
    setTimeout(() => {
      console.log("token expired");
    }, expiresIn - 10000);
  },
}));
