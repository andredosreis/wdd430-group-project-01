// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist as Geist_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./componets/NavBar";
import { Footer } from "./componets/Footer";

const geistSans = Geist_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoiceApp • Gerencie suas faturas",
  description: "Aplicativo criado com Next.js e Tailwind para controle de invoices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
