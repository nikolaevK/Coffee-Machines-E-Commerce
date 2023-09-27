import { CategoryInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories() {
  try {
    const res = await fetch(URL);
    const categories: CategoryInterface[] = await res.json();
    return categories;
  } catch (error) {
    console.log("Error inside getCategories");
  }
}
