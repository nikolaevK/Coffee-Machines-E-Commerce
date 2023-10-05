import { ProductInterface } from "../types/types";

interface SortOptionInterface {
  name: string;
  current: boolean;
}

export function sortProducts(
  sortOptions: SortOptionInterface[],
  products: ProductInterface[]
): ProductInterface[] {
  const chosenSortOption = sortOptions.find(
    (option) => option.current === true
  );
  let sortedProducts;
  switch (chosenSortOption?.name) {
    case "Newest":
      sortedProducts = products.sort(
        // Unary plus (+) converts an operand ( new Date() ) into a number.
        (a: ProductInterface, b: ProductInterface) =>
          +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      break;
    case "Price: Low to High":
      sortedProducts = products.sort(
        (a: ProductInterface, b: ProductInterface) => a.price - b.price
      );
      break;
    case "Price: High to Low":
      sortedProducts = products.sort(
        (a: ProductInterface, b: ProductInterface) => b.price - a.price
      );
      break;
    default:
      sortedProducts = products;
      break;
  }

  return [...sortedProducts];
}
