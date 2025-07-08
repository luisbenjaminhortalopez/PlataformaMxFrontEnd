"use client";

import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      const { usuario } = response.data;

      document.cookie = `isAuthenticated=true; path=/`;
      document.cookie = `adminId=${usuario.id}; path=/`;

      router.push("/admin/noticias");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Credenciales inválidas o error del servidor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-left mt-4"
    >
      <div>
        <label className="block mb-1">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-black outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-black outline-none"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
      >
        Entrar
      </button>
    </form>
  );
};
