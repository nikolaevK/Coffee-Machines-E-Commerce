"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import Container from "./Container";
import ShoppingCartModal from "./ShoppingCart";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ProductInterface } from "../utils/types/types";
import toast from "react-hot-toast";

interface NavRoutesInterface {
  categories: { name: string; id: string }[];
  products: ProductInterface[];
}

export default function NavRoutes({
  categories,
  products,
}: NavRoutesInterface) {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { openCart, cartQuantity, clearCartItems } = useShoppingCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routes = categories.map((category) => ({
    href: `/category/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  // Stripe Success or Error when Checking out
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Transaction successfully completed");
      clearCartItems();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something Went Wrong...");
      openCart();
    }
  }, [searchParams]);

  return (
    <div className="border-b bg-[#2E2522] text-white">
      <Container>
        <div className="px-4 sm:px-8 lg:px-8 flex h-16 items-center">
          <button
            className="md:hidden"
            onClick={() => setOpenMobileNav((current) => !current)}
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-lg hidden md:block">Home</p>
          </Link>
          {/* Large screen Nav Links */}
          <nav className="hidden md:flex md:mx-6 items-center gap-x-4 lg:gap-x-6">
            {routes &&
              routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-md font-semibold transition-colors hover:text-neutral-200 underline-offset-8 ${
                    route.active ? "underline" : ""
                  }`}
                >
                  {route.label}
                </Link>
              ))}
          </nav>
          {/* Mobile Menu */}
          <MobileNav />
          {/* Shopping Cart Icon */}
          <button
            onClick={openCart}
            className="ml-auto flex items-center gap-1"
          >
            <ShoppingBagIcon className="text-white h-7 w-7" />
            <span>{cartQuantity}</span>
          </button>
          {/* Shopping Cart */}
          <ShoppingCartModal products={products} />
        </div>
      </Container>
    </div>
  );

  function MobileNav() {
    const openNavCSS =
      "animate-nav-transition fixed bottom-0 left-0 w-full flex flex-col md:hidden z-10 justify-top items-start  h-screen bg-[#2E2522]";
    return (
      <nav className={openMobileNav ? openNavCSS : "hidden"}>
        <div className="flex w-full justify-between items-center p-4">
          {/*  Exit menu Icon */}
          <button onClick={() => setOpenMobileNav(!openMobileNav)}>
            <XMarkIcon className="h-7 w-7 text-white" />
          </button>
          <button onClick={openCart} className="flex items-center gap-1">
            <ShoppingBagIcon className="text-white h-7 w-7" />
            <span>{cartQuantity}</span>
          </button>
        </div>
        <div className="w-full h-full mt-1 bg-white text-[#2E2522] flex flex-col gap-4 p-4">
          <div className="mt-10">
            <Link
              href="/"
              className="text-md font-semibold transition-colors"
              onClick={() => setOpenMobileNav((current) => !current)}
            >
              Home
            </Link>
            <hr className="mt-4" />
          </div>
          {routes &&
            routes.map((route) => (
              <div key={route.href} className="flex flex-col justify-center">
                <Link
                  href={route.href}
                  className="text-md font-semibold transition-colors"
                  onClick={() => setOpenMobileNav((current) => !current)}
                >
                  {route.label}
                </Link>
                <hr className="mt-4" />
              </div>
            ))}
        </div>
      </nav>
    );
  }
}
