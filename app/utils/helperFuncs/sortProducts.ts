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

  switch (chosenSortOption?.name) {
    case "Newest":
      products.sort(
        // Unary plus (+) converts an operand ( new Date() ) into a number.
        (a: ProductInterface, b: ProductInterface) =>
          +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      break;
    case "Price: Low to High":
      products.sort(
        (a: ProductInterface, b: ProductInterface) =>
          parseFloat(a.price) - parseFloat(b.price)
      );
      break;
    case "Price: High to Low":
      products.sort(
        (a: ProductInterface, b: ProductInterface) =>
          parseFloat(b.price) - parseFloat(a.price)
      );
      break;
  }

  return products;
}
