import category from "../(routes)/category/[categoryId]/page";
import { CategoryInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategory(categoryId: string) {
  try {
    const res = await fetch(`${URL}/${categoryId}`);
    const categories: CategoryInterface = await res.json();
    return categories;
  } catch (error) {
    console.log("Error inside getCategories");
  }
}
