import React from "react";
import { ProductInterface } from "../utils/types/types";

interface ProductListInterface {
  products: ProductInterface[];
}

export default function ProductList({ products }: ProductListInterface) {
  return (
    <div className="bg-white mt-4">
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.images[0].url}
                alt="Img"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a
                    href={`/category/${product.categoryId}/products/${product.id}`}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.color.name}
                </p>
              </div>
              <p className="text-sm text-gray-900 font-bold">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
