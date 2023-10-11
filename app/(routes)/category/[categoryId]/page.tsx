import getCategory from "@/app/actions/GetCategory";
import Container from "@/app/components/Container";

import CategoryFilters from "./components/CategoryFilters";

interface CategoryComponentInterface {
  params: { categoryId: string };
}

export const revalidate = 0;

export default async function category({
  params: { categoryId },
}: CategoryComponentInterface) {
  const category = await getCategory(categoryId);
  if (!category) return <div>Something went wrong loading category...</div>;

  return (
    <Container>
      <div className="px-2 md:px-6 py-2 min-h-screen">
        <CategoryFilters
          products={category.products}
          categoryName={category.name}
        />
      </div>
    </Container>
  );
}
