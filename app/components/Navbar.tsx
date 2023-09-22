import getCategories from "../actions/getCategories";
import NavRoutes from "./NavRoutes";
// Server Component

// Doesnt cache
export const revalidate = 0;

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <header>
      <NavRoutes categories={categories} />
    </header>
  );
}
