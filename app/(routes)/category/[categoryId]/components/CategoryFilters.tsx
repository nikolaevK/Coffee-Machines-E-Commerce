"use client";
import React, { Fragment, useMemo, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ProductList from "@/app/components/ProductList";
import { ColorInterface, ProductInterface } from "@/app/utils/types/types";
import { filterColors } from "@/app/utils/helperFuncs/filterColorsInCategory";
import { sortProducts } from "@/app/utils/helperFuncs/sortProducts";

const sortOptions = [
  { name: "Newest", current: false },
  { name: "Price: Low to High", current: false },
  { name: "Price: High to Low", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CategoryFiltersInterface {
  products: ProductInterface[];
  colors: ColorInterface[];
  categoryName: string;
}

export default function CategoryFilters({
  products,
  colors,
  categoryName,
}: CategoryFiltersInterface) {
  const filters = useMemo(() => {
    return {
      id: "color",
      name: "Color",
      options: colors.map((color) => {
        return {
          value: color.name.toLowerCase(),
          label: color.name.charAt(0).toUpperCase() + color.name.slice(1),
          checked: false,
        };
      }),
    };
  }, [colors]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [colorFilters, setColorFilters] = useState(filters); // Keeps track of active state of color inputs
  const [optionsToSort, setOptionsToSort] = useState(sortOptions); // Keeps track of active sorted option

  let filteredSortedProducts: ProductInterface[] = useMemo(
    () => filterColors(colorFilters.options, products),
    [colorFilters, products]
  );

  filteredSortedProducts = useMemo(
    () => sortProducts(optionsToSort, filteredSortedProducts),
    [optionsToSort, filteredSortedProducts]
  );

  // Filter by Color
  function onColorFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    filters.options.forEach((filter) => {
      if (filter.value === e.target.value) filter.checked = e.target.checked;
    });
    setColorFilters({ ...filters });
  }

  // Sort by provided option
  function pickSortOption(name: string) {
    sortOptions.forEach((option) => {
      if (option.name === name) {
        option.current = true;
      } else option.current = false;
    });
    setOptionsToSort([...sortOptions]);
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <Disclosure
                      as="div"
                      key={colorFilters.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {colorFilters.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {colorFilters.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={onColorFilterChange}
                                    id={`filter-mobile-${colorFilters.id}-${optionIdx}`}
                                    name={`${colorFilters.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-[#7C4F3F] focus:ring-[#7C4F3F]"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${colorFilters.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-2">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">
              {categoryName}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {optionsToSort.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => pickSortOption(option.name)}
                              name={option.name}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </main>
        <div className="flex gap-8 w-full h-full">
          <form className="hidden lg:block p-4">
            <Disclosure as="div" key={colorFilters.id} className="py-2">
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {colorFilters.name}
                      </span>
                      <span className="ml-2 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                      {colorFilters.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            onChange={onColorFilterChange}
                            id={`filter-${colorFilters.id}-${optionIdx}`}
                            name={`${colorFilters.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className="h-4 w-4 rounded border-gray-300 text-[#7C4F3F] focus:ring-[#7C4F3F]"
                          />
                          <label
                            htmlFor={`filter-${colorFilters.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </form>
          <div className="flex-1 p-4">
            {filteredSortedProducts && (
              <ProductList products={filteredSortedProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
