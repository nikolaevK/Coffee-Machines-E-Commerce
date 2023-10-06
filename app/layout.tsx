import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

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
        <Toaster />
        <ShoppingCartProvider>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          {children}
          <Footer />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
