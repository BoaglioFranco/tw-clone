import { axios } from "./axios";

export const registerUser = (user: {
  username: string;
  password: string;
  email: string;
}) => {
  return axios.post("/register", user);
};


interface LoginResponse {
  token: string;
  expiresIn: number;
}

export const login = (loginInfo: {
  usernameOrEmail: string;
  password: string;
}) => {
  return axios.post<LoginResponse>("/login", loginInfo)
};
