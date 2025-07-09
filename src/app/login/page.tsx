import Link from "next/link";
import { Image } from "@home/components/image";
import { LoginForm } from "@admin/components";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-black rounded-lg px-10 py-8 w-full max-w-md shadow-md text-white text-center">
        <Image
          src="/Logo.svg"
          alt="PlataformaMX"
          className="h-10 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">Administrador</h2>

        <LoginForm />

        <Link
          href="/"
          className="text-sm text-gray-400 mt-4 inline-block hover:underline"
        >
          Ir a PlataformaMX
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
