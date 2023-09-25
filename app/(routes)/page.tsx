import getBillboard from "../actions/GetBillboard";
import getProducts from "../actions/GetProducts";
import Billboard from "../components/Billboard";
import CategoryBillboard from "../components/CategoryBillboard";
import Container from "../components/Container";
import FeaturedProducts from "../components/FeaturedCategories";
import { filterFeaturedData } from "../utils/helperFuncs/filterFeaturedData";

export const revalidate = 0;

export default async function HomePage() {
  const billboard = await getBillboard("0af0764b-68b7-4a95-955d-e473834a9cc5");

  const data = await getProducts();
  const categories = filterFeaturedData(data);

  return (
    <Container>
      {categories && billboard && (
        <>
          <div>
            <Billboard billboard={billboard} />
          </div>
          <div>
            <FeaturedProducts featuredCategories={categories} />
          </div>
          <div>
            {/* @ts-expect-error Async Server Component */}
            <CategoryBillboard />
          </div>
        </>
      )}
    </Container>
  );
}
