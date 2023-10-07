"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number | null;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;

  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  if (typeof cartItems === "function") return null;

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    if (typeof cartItems === "function") return null;
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    if (typeof setCartItems === "object") return null;
    // Takes function as a parameter and returns updated CartItem[]
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    toast.success("Item Added To Cart", {
      position: "bottom-center",
    });
  }

  function decreaseCartQuantity(id: string) {
    if (typeof setCartItems === "object") return null;
    // Takes function as a parameter and returns updated CartItem[]
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    toast.error("Item Removed From Cart", {
      position: "bottom-center",
    });
  }

  function removeFromCart(id: string) {
    if (typeof setCartItems === "object") return null;

    // Takes function as a parameter and returns updated CartItem[]
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item) => item.id !== id);
    });
    toast.error("Item Removed From Cart", {
      position: "bottom-center",
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
