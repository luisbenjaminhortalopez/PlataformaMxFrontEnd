import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/authService";
import Logo from "../../../assets/Logo.svg";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      const { usuario } = response.data;

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminId", usuario.id);

      navigate("/admin/noticias");
    } catch (err) {
      setError("Credenciales inválidas o error del servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-black rounded-lg px-10 py-8 w-full max-w-md shadow-md text-white text-center">
        <img src={Logo} alt="PlataformaMX" className="h-10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Administrador</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left mt-4">
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

        <a href="/" className="text-sm text-gray-400 mt-4 inline-block hover:underline">
          Ir a PlataformaMX
        </a>
      </div>
    </div>
  );
};
