import { ITwit } from "../models/twit";
import { IProfile } from "../models/userProfile";
import { axios } from "./axios";

export const registerUser = (user: {
  username: string;
  password: string;
  email: string;
}) => {
  return axios.post("/register", user);
};

interface LoginResponse {
  user: { username: string; pfp: string; id: number };
  token: string;
  expiresIn: number;
}

export const login = (loginInfo: {
  usernameOrEmail: string;
  password: string;
}) => {
  return axios.post<LoginResponse>("/login", loginInfo);
};

export const getProfile = (username: string) => {
  return axios.get<IProfile>(`/user/getProfile`, {
    params: {
      username,
    },
  });
};

export const followUser = (id: string | number) => {
  return axios.post<any>("/user/follow", { id });
};

export const unfollowUser = (id: string | number) => {
  return axios.post<any>("/user/unfollow", { id });
};

export const getUserTwits = (id: string | number) => {
  return axios.get<ITwit[]>("/user/getTwits", { params: { id } });
};

export const getUserLikes = (id: string | number) => {
  return axios.get<ITwit[]>("user/getLikes", { params: { id } });
};
