import { axios } from "./axios";

export const registerUser = (user: {
  username: string;
  password: string;
  email: string;
}) => {
  return axios.post("/register", user);
};

export const login = (loginInfo: {
  usernameOrEmail: string;
  password: string;
}) => {
  return axios.post("/login", loginInfo)
};
