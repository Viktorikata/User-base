import axios from "axios";

const BASE_URL = "https://6978e083cd4fe130e3da8504.mockapi.io";

export const http = axios.create({
  baseURL: BASE_URL,
});
