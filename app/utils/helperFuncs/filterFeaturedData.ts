import { ProductInterface } from "../types/types";

type Value = "category" | "url";

export function filterFeaturedData(json: ProductInterface[]) {
  const filteredData = json.reduce(
    (data: Array<Record<Value, string>>, product: ProductInterface) => {
      const filteredProduct = {
        category: product.category.name,
        url: product.images[0].url,
      };
      data.push(filteredProduct);
      return data;
    },
    []
  );

  return filteredData;
}
