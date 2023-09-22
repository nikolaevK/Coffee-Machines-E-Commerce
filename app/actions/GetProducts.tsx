import { ProductInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProducts(): Promise<ProductInterface[]> {
  const res = await fetch(URL);
  return res.json();
}
