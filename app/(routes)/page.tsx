import getBillboard from "../actions/GetBillboard";
import getProducts from "../actions/GetProducts";
import Billboard from "../components/Billboard";
import CategoryBillboard from "../components/CategoryBillboard";
import Container from "../components/Container";
import FeaturedProducts from "../components/FeaturedCategories";
import { filterFeaturedData } from "../utils/helperFuncs/filterFeaturedData";

export const revalidate = 0;

export default async function HomePage() {
  const billboard = await getBillboard("f831afd3-d19f-4efb-b16e-4b660cd7ad65");
  const data = await getProducts();

  const categories = data ? filterFeaturedData(data) : [];

  return (
    <Container>
      <>
        <div>{billboard && <Billboard billboard={billboard} />}</div>
        <div>
          <FeaturedProducts featuredCategories={categories} />
        </div>
        <div>
          {/* @ts-expect-error Async Server Component */}
          <CategoryBillboard />
        </div>
      </>
    </Container>
  );
}
