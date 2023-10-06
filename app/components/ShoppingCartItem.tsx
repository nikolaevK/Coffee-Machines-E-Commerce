"use client";

import React, { useEffect, useState } from "react";
import getProduct from "../actions/GetProduct";
import { ProductInterface } from "../utils/types/types";

interface ShoppingCartItemInterface {
  products: ProductInterface[];
  productId: string;
  quantity: number;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default function ShoppingCartItem({
  productId,
  quantity,
  products,
}: ShoppingCartItemInterface) {
  const product = products.find((p) => p.id === productId);
  if (!product) return null;
  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.images[0].url}
          alt="Product Image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a
                href={`/category/${product.categoryId}/products/${product.id}`}
              >
                {product.name}
              </a>
            </h3>
            <p className="ml-4">$ {product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color.name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-[#2E2522] hover:opacity-70"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
