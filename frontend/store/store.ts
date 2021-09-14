import create from "zustand";

interface StoreState {
  token: string;
  user: {
    username: string;
    email: string;
    id: number;
  } | null;
}

export const useStore = create<StoreState>((set) => ({
  token: "",
  user: null,
}));
