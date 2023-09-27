import getCategories from "../actions/getCategories";
import { filterNavLinksCategory } from "../utils/helperFuncs/filterNavLinksCategory";
import NavRoutes from "./NavRoutes";
// Server Component

// Doesn't cache in browser
export const revalidate = 0;

export default async function Navbar() {
  const data = await getCategories();

  // If something wrong with fetching data
  if (!data) return <div>Something went wrong...</div>;
  // gets necessary data for NavRoutes
  const categories = filterNavLinksCategory(data);

  return <header>{categories && <NavRoutes categories={categories} />}</header>;
}
