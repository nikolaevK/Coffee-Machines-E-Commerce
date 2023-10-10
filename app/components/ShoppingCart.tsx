"use client";

import { Fragment, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import { ProductInterface } from "../utils/types/types";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

interface ShoppingCartModalInterface {
  products: ProductInterface[];
}

export default function ShoppingCartModal({
  products,
}: ShoppingCartModalInterface) {
  const { isOpen, openCart, closeCart, cartItems } = useShoppingCart();

  function calculateTotal(products: ProductInterface[]) {
    let price: number = 0;
    products.forEach((product: ProductInterface) => {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === product.id) {
          price = price + product.price * cartItems[i].quantity;
        }
      }
    });
    return price;
  }

  const cartTotal = useMemo(() => calculateTotal(products), [cartItems]);

  async function checkOutUsingStripe() {
    toast.loading("Loading Stripe...");
    const response = await axios.post(URL, { cartItems });
    toast.dismiss();
    window.location = response.data.url;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-[#2E2522]">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-[#2E2522] hover:opacity-70"
                            onClick={closeCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((item) => (
                              <ShoppingCartItem
                                key={item.id}
                                productId={item.id}
                                quantity={item.quantity}
                                products={products}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6 flex items-center justify-center">
                        <button
                          onClick={checkOutUsingStripe}
                          className="w-full rounded-md border border-transparent bg-[#2E2522] px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-70"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or <span />
                          <Link
                            href="/"
                            onClick={closeCart}
                            className="font-medium text-[#2E2522] hover:opacity-70"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
