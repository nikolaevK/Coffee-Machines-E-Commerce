import Link from "next/link";
import getCategories from "../actions/getCategories";
import getHomeBillboard from "../actions/GetHomeBillboard";
import ProductList from "./ProductList";

export default async function CategoryBillboard() {
  const homeBillboard = await getHomeBillboard(
    "25fa4ff7-0ef8-442d-9eb1-0c904630cfa3"
  );
  const categories = await getCategories();

  if (!homeBillboard) return <div>Could not fetch billboard...</div>;
  if (!categories) return <div>Something went wrong...</div>;

  const { imageUrl, title, description } = homeBillboard;

  const [{ products, id }] = categories.filter(
    (c) => c.name === "Espresso Makers"
  );

  return (
    <section className="flex flex-col w-full px-4 md:px-8 py-2">
      <div className="flex justify-between md:justify-start items-center gap-4 ">
        <p className="text-lg md:text-2xl font-bold">Espresso Makers</p>
        <Link
          href={`/category/${id}`}
          className="text-sm underline underline-offset-4"
        >
          Shop All <span>&#40;{products.length}&#41;</span>
        </Link>
      </div>
      <Link href={`/category/${id}`}>
        <div className="flex-auto md:flex md:flex-row hover:cursor-pointer">
          <div className="md:w-[50%] flex flex-col justify-center items-center py-20 md:py-0 md:p-0 gap-6 bg-[#2E2522] text-white">
            <span className="text:2xl md:text-4xl xl:text-6xl font-bold text-center w-[40%] md:w-[50%] lg:w-[60%]">
              {title}
            </span>
            <div className="border-b-2 border-white w-12"></div>
            <span className="text-center text-sm md:text-base xl:text-xl font-semibold w-[70%] md:w-[50%]">
              {description}
            </span>
          </div>
          <div className="md:w-[50%]">
            <img
              src={imageUrl}
              alt="img"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
        </div>
      </Link>
      <ProductList products={products} />
    </section>
  );
}
