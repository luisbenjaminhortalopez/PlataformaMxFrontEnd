import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plataforma News",
  description:
    "Desde los temas que marcan la agenda hasta los reportajes que revelan lo que nadie más cuenta, en Plataforma MX no seguimos la conversación, la creamos.",
  icons: "/LogoOficial.png",
  openGraph: {
    type: "website",
    title: "Plataforma News",
    description:
      "Desde los temas que marcan la agenda hasta los reportajes que revelan lo que nadie más cuenta, en Plataforma MX no seguimos la conversación, la creamos.",
    siteName: "Plataforma News",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Plataforma News Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataforma News",
    description:
      "Desde los temas que marcan la agenda hasta los reportajes que revelan lo que nadie más cuenta, en Plataforma MX no seguimos la conversación, la creamos.",
    images: ["/banner.jpg"]
  }
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
