import { API_BASE } from "@/constants/api";
import axios from "axios";

export const loginPOST = async (username: string, password: string) => {
  return axios.post(`${API_BASE}/auth/login`, {
    username,
    password
  });
};
