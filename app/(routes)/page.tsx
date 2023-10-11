import getBillboard from "../actions/GetBillboard";
import getProducts from "../actions/GetProducts";
import Billboard from "../components/Billboard";
import CategoryBillboard from "../components/CategoryBillboard";
import Container from "../components/Container";
import FeaturedProducts from "../components/FeaturedCategories";
import { filterFeaturedData } from "../utils/helperFuncs/filterFeaturedData";

export const revalidate = 0;

export default async function HomePage() {
  const billboard = await getBillboard("296a5014-428d-4101-b32b-481e3373cf3f");
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
