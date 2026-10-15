import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Azevedo · CRM Têxtil",
  description: "Sua carteira, suas oportunidades e seu próximo negócio.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
