import { ProductInterface } from "../types/types";

type Value = "category" | "url";

// Extracts Category that isFeatured. Name of category and Image url
export function filterFeaturedData(data: ProductInterface[]) {
  const filteredData = data.reduce(
    (data: Array<Record<Value, string>>, product: ProductInterface) => {
      if (product.isFeatured) {
        const filteredProduct = {
          category: product.category.name,
          url: product.images[0].url,
        };
        data.push(filteredProduct);
      }
      return data;
    },
    []
  );

  return filteredData;
}
