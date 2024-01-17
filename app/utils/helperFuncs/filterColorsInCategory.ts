import { ProductInterface } from "../types/types";

interface FilteredOption {
  value: string;
  label: string;
  checked: boolean;
}

export function filterColors(
  filterOptions: FilteredOption[],
  products: ProductInterface[]
) {
  const colors = filterOptions.reduce(
    (accumulator: Array<string>, option: FilteredOption) => {
      if (option.checked) accumulator.push(option.label.toLowerCase());
      return accumulator;
    },
    []
  );

  if (colors.length === 0) return products;

  const filteredProducts = products.filter((product) =>
    colors.includes(product.color.name.toLowerCase())
  );

  return filteredProducts;
}
