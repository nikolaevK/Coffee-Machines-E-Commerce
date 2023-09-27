import { ProductInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProducts() {
  try {
    const res = await fetch(URL);

    const products: ProductInterface[] = await res.json();
    return products;
  } catch (error) {
    console.log("Error fetching products");
  }
}
