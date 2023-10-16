"use client";

import { useEffect, useMemo, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ProductInterface } from "@/app/utils/types/types";
import { ColorChoiceInterface } from "../page";
import { useRouter } from "next/navigation";
import MobileImageSlider from "./MobileImageSlider";
import { useShoppingCart } from "@/app/context/ShoppingCartContext";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductPageInterface {
  productId: string;
  categoryId: string;
  products: ProductInterface[];
  colors: any;
}

export default function ProductPage({
  productId,
  categoryId,
  products,
  colors,
}: ProductPageInterface) {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
  } = useShoppingCart();
  const [reviews, setReviews] = useState({
    href: "#",
    average: 0,
    totalCount: 0,
  });
  const router = useRouter();
  const product = useMemo(
    () => products.find((p) => p.id === productId)!,
    [productId, products]
  );
  const productInCart = cartItems.find((p) => p.id === productId);

  const selectedProductColor = useMemo(
    () =>
      colors.find((c: ColorChoiceInterface) => c.colorId === product.colorId),
    [product, colors]
  );

  const [selectedColor, setSelectedColor] =
    useState<ColorChoiceInterface>(selectedProductColor);

  useEffect(() => {
    router.push(
      `/category/${selectedColor.categoryId}/products/${selectedColor.productId}`
    );
  }, [selectedColor.colorId, router]);

  useEffect(() => {
    setReviews((prev) => ({
      ...prev,
      average: Math.max(Math.round(Math.random() * 5), 2),
      totalCount: Math.max(Math.round(Math.random() * 110), 35),
    }));
  }, []);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li key={product.categoryId}>
              <div className="flex items-center">
                <a
                  href={`/category/${categoryId}/`}
                  className="mr-2 text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.category.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a
                href={`/category/${categoryId}/products/${productId}`}
                aria-current="page"
                className="font-medium text-gray-900 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="hidden mx-auto mt-6 max-w-2xl sm:px-6 md:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image
              height={500}
              width={500}
              src={product.images[0].url}
              alt="Product Image"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                width={500}
                height={500}
                src={product.images[1]?.url || ""}
                alt="Product Image"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                width={500}
                height={500}
                src={product.images[2]?.url || ""}
                alt="Product Image"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <Image
              height={500}
              width={500}
              src={product.images[3]?.url || ""}
              alt="Product Image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        {/* Mobile Image Display Component */}
        <MobileImageSlider images={product.images} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${parseFloat(product.price).toFixed(2)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-[#7C4F3F]"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0 "
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-[#7C4F3F] hover:text-opacity-80"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color: ColorChoiceInterface) => (
                      <RadioGroup.Option
                        key={color.colorId}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          }
                          style={{
                            backgroundColor: color.class,
                          }}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </form>
            {/* Add To Cart Button */}
            {productInCart === undefined ? (
              <button
                type="button"
                onClick={() => increaseCartQuantity(product.id)}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#2E2522] px-8 py-3 text-base font-medium text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#7C4F3F] focus:ring-offset-2"
              >
                Add to bag
              </button>
            ) : (
              <>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    onClick={() => decreaseCartQuantity(product.id)}
                    className="flex items-center justify-center h-8 w-8 border-2 rounded-md border-[#2E2522] p-2 text-black"
                  >
                    <span>-</span>
                  </button>
                  <label className="text-md ">
                    {productInCart.quantity} in the cart
                  </label>
                  <button
                    onClick={() => increaseCartQuantity(product.id)}
                    className="flex items-center justify-center h-8 w-8 border-2 rounded-md border-[#2E2522] p-2 text-black"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#7C4F3F] focus:ring-offset-2"
                >
                  Remove
                </button>
              </>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique accusantium saepe voluptas pariatur ad molestias,
                  repellendus soluta tempora id ipsa maiores? Totam asperiores
                  rem magnam, nemo similique vel autem fuga.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Lorem ipsum dolor sit amet.
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Lorem ipsum dolor sit amet.
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Lorem ipsum dolor sit amet.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nulla officia, suscipit blanditiis libero similique temporibus
                  cum aut? Est, alias, facere, blanditiis maxime tempora ducimus
                  atque architecto dolorem eligendi quibusdam ullam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
