import { CategoryInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories(): Promise<CategoryInterface[]> {
  const res = await fetch(URL);
  return res.json();
}
