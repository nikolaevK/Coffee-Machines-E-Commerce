"use client";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { ProductInterface } from "../utils/types/types";

interface ShoppingCartItemInterface {
  products: ProductInterface[];
  productId: string;
  quantity: number;
}

export default function ShoppingCartItem({
  productId,
  quantity,
  products,
}: ShoppingCartItemInterface) {
  const { removeFromCart, decreaseCartQuantity } = useShoppingCart();
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
            <p className="ml-4">$ {parseFloat(product.price).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color.name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex justify-center items-center gap-2">
            {quantity > 1 && (
              <button
                onClick={() => decreaseCartQuantity(product.id)}
                className="flex items-center justify-center border-2 border-red-400 text-red-400 rounded-sm h-4 w-4 "
              >
                -
              </button>
            )}

            <button
              type="button"
              onClick={() => removeFromCart(product.id)}
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
