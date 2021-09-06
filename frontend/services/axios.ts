import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1500,
    // headers: {'X-Custom-Header': 'foobar'}
  });