import { ProductInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProduct(productId: string) {
  try {
    const res = await fetch(`${URL}/${productId}`);

    const product: ProductInterface = await res.json();
    return product;
  } catch (error) {
    console.log("Error fetching product");
  }
}
