import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlataformaNews",
  description:
    "Desde los temas que marcan la agenda hasta los reportajes que revelan lo que nadie más cuenta, en Plataforma MX no seguimos la conversación, la creamos.",
  icons: "/LogoOficial.png"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
