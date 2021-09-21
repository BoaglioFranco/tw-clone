import { ITwit } from "../models/twit";
import { axios } from "./axios";

export const getAllTwits = () => {
  return axios.get<ITwit[]>("twit/getAll");
};

export const postTwit = (text: string) => {
  return axios.post("twit/create", { text });
};

export const likeTwit = (id: number) => {
  return axios.post("twit/like", { id });
};
