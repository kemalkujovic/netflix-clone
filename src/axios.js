import axios from "./axios";
c9064d8b82d4f15287b5c1b7cea07159;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
