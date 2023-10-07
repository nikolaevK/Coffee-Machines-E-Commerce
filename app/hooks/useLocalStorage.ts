"use client";

import { useEffect, useState } from "react";
import { CartItem } from "../context/ShoppingCartContext";

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
//   const [value, setValue] = useState<T>(() => {
//     if (typeof window === "undefined") return initialValue;
//     const jsonValue = localStorage.getItem(key);

//     if (jsonValue !== null) return JSON.parse(jsonValue);

//     if (typeof initialValue === "function") {
//       return (initialValue as () => T)();
//     } else {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue] as [typeof value, typeof setValue];
// }

const isServer = typeof window === "undefined";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  /* prevents hydration error so that state is only initialized after server is defined */
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = <T>(value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        // taking function as a value and passing current store value as a parameter and returns the outcome opf that function
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
