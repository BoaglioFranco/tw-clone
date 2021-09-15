import Axios from "axios";
import { useStore } from "../store/store";

export const axios = Axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1500,
  // headers: {'X-Custom-Header': 'foobar'}
});

axios.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer: ${useStore.getState().token}`;
  return request;
});
