import { isServer } from "../utils/isServer";
import create from "zustand";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (key: string, value: any) => {
  document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
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
  token: cookies.get('token') || "",
  user: cookies.get('user') || null,
  setToken: (token, expiresIn) => {
    set(() => ({ token }));
    setCookie("token", token);
    setTimeout(() => {
      console.log("token expired");
    }, expiresIn - 10000);
  },
  setUser: (user) => {
    set(() => {
      user;
    });
    setCookie("user", user);
  },
}));
