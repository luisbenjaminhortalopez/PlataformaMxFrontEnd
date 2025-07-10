"use server";

import { API_BASE } from "@/constants/api";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (username: string, password: string) => {
  return axios.post(`${API_BASE}/auth/login`, {
    username,
    password
  });
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("isAuthenticated");
  cookieStore.delete("adminId");
  redirect("/login");
};
