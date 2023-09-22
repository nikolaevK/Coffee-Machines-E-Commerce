import getCategories from "../actions/getCategories";
import { filterNavLinksCategory } from "../utils/helperFuncs/filterNavLinksCategory";
import NavRoutes from "./NavRoutes";
// Server Component

// Doesn't cache
export const revalidate = 0;

export default async function Navbar() {
  const data = await getCategories();
  // gets necessary data for NavRoutes
  const categories = filterNavLinksCategory(data);

  return (
    <header>
      <NavRoutes categories={categories} />
    </header>
  );
}
