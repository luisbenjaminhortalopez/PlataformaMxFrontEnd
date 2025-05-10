import axios from "axios";
import { API_BASE } from "../../config";

export const login = (username, password) => {
  return axios.post(`${API_BASE}/auth/login`, {
    username,
    password,
  });
};
