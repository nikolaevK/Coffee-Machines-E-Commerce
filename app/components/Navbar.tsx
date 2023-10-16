import getCategories from "@/app/actions/getCategories";
import getProducts from "@/app/actions/GetProducts";
import { filterNavLinksCategory } from "../utils/helperFuncs/filterNavLinksCategory";
import NavRoutes from "./NavRoutes";
// Server Component

// Doesn't cache in browser
export const revalidate = 0;

export default async function Navbar() {
  const data = await getCategories();
  const productsData = await getProducts();

  // If something wrong with fetching data
  if (!data || !productsData)
    return <div>Something went wrong in Navbar...</div>;
  // gets necessary data for NavRoutes
  const categories = filterNavLinksCategory(data);

  return (
    <header>
      {categories && (
        <NavRoutes categories={categories} products={productsData} />
      )}
    </header>
  );
}
