import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShoppingCartModal from "./components/ShoppingCart";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Coffeegear",
  description: "Premium Coffeegear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Async Server Component */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
