import { isServer } from "../utils/isServer";
import create from "zustand";

const saveToLocalStorage = (key: string, value: any) => {
  if (!isServer) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const readFromLocalStorage = (key: string) => {
  if (!isServer) {
    const parse = JSON.parse(localStorage.getItem(key)!);
    console.log(parse);
    return parse;
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
  user: readFromLocalStorage("user") || null,
  setToken: (token, expiresIn) => {
    set(() => ({ token }));
    saveToLocalStorage("token", token);
    setTimeout(() => {
      console.log("token expired");
    }, expiresIn - 10000);
  },
  setUser: (user) => {
    set(() => {
      user;
    });
    saveToLocalStorage("user", user);
  },
}));
