import ProductPage from "@/app/(routes)/category/[categoryId]/products/[productId]/components/ProductPage";
import getColors from "@/app/actions/GetColors";
import getProduct from "@/app/actions/GetProduct";
import getProducts from "@/app/actions/GetProducts";
import { ColorInterface } from "@/app/utils/types/types";

interface ProductHomePageInterface {
  params: { productId: string; categoryId: string };
}

export interface ColorChoiceInterface {
  colorId: string;
  name: string;
  class: string;
  selectedClass: string;
  categoryId: string;
  productId: string;
}

export const revalidate = 0;

export default async function ProductHomePage({
  params: { productId, categoryId },
}: ProductHomePageInterface) {
  const selectedProduct = await getProduct(productId);
  const allProducts = await getProducts();
  const allColors = await getColors();

  if (!selectedProduct || !allProducts || !allColors) {
    throw new Error("Something went wrong while fetching...");
  }

  const products = allProducts.filter(
    (product) =>
      product.name.split(" ")[0] === selectedProduct.name.split(" ")[0] &&
      product.price === selectedProduct.price
  );

  const colors = allColors.reduce(
    (colorArray: ColorChoiceInterface[], color: ColorInterface) => {
      products.forEach((product) => {
        if (product.colorId === color.id) {
          const colorObj = {
            colorId: color.id,
            name: product.color.name,
            class: `${color.value}`,
            selectedClass: "ring-[#7C4F3F]",
            categoryId: product.categoryId,
            productId: product.id,
          };
          colorArray.push(colorObj);
        }
      });
      return colorArray;
    },
    []
  );

  return (
    <ProductPage
      products={products}
      productId={productId}
      categoryId={categoryId}
      colors={colors}
    />
  );
}
