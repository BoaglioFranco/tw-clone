import { axios } from "./axios";

export const registerUser = (user: {
  username: string;
  password: string;
  email: string;
}) => {
    return axios.post('/register', user,);
};
