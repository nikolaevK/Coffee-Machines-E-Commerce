import getBillboard from "../actions/GetBillboard";
import getProducts from "../actions/GetProducts";
import Billboard from "../components/Billboard";
import Container from "../components/Container";
import FeaturedProducts from "../components/FeaturedProducts";
import { filterFeaturedData } from "../utils/helperFuncs/filterFeaturedData";

export const revalidate = 0;

export default async function HomePage() {
  const billboard = await getBillboard("0af0764b-68b7-4a95-955d-e473834a9cc5");

  const data = await getProducts();
  const products = filterFeaturedData(data);

  return (
    <Container>
      <div>
        <Billboard billboard={billboard} />
      </div>
      <div>
        <FeaturedProducts featuredProducts={products} />
      </div>
    </Container>
  );
}
