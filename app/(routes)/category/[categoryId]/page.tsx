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
      <div className="px-6 py-2 h-screen">
        <h1 className="font-bold text-3xl">{category.name}</h1>
        <CategoryFilters products={category.products} />
      </div>
    </Container>
  );
}
