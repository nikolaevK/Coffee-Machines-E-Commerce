import Image from "next/image";
import Link from "next/link";
import getCategories from "@/app/actions/GetCategories";
import getHomeBillboard from "@/app/actions/GetHomeBillboard";
import {
  CategoryInterface,
  HomeBillboardInterface,
} from "../utils/types/types";
import ProductList from "./ProductList";
import Subcategories from "./Subcategories";

export default async function CategoryBillboard() {
  const data = await getCategories();
  if (!data) return <div>Something went wrong...</div>;

  // Getting categories that have homeBillboardId to Display on Home Page
  const categories = data.filter((category) => category.homeBillboardId !== "");

  // Constructing new a new object from CategoryInterface and HomeBillboardInterface
  // To map over it efficiently
  const homePageBillboards = await categories.reduce(
    async (
      accumulatorP: Promise<Array<CategoryInterface & HomeBillboardInterface>>,
      category
    ) => {
      const homeBillboard = await getHomeBillboard(category.homeBillboardId);

      const accumulator = await accumulatorP;
      const mergedObject = {
        ...category,
        title: homeBillboard!.title,
        description: homeBillboard!.description,
        imageUrl: homeBillboard!.imageUrl,
        subcategories: homeBillboard!.subcategories,
      };
      accumulator.push(mergedObject);
      return accumulator;
    },
    Promise.resolve([])
  );

  return (
    <>
      {homePageBillboards.map((category) => {
        return (
          <section
            key={category.id}
            className="flex flex-col w-full px-4 md:px-8 py-2"
          >
            <div className="flex justify-between md:justify-start items-center gap-4 ">
              <p className="text-lg md:text-2xl font-bold ">{category.name}</p>
              <Link
                href={`/category/${category.id}`}
                className="text-sm underline underline-offset-4"
              >
                Shop All <span>&#40;{category.products.length}&#41;</span>
              </Link>
            </div>
            <Link href={`/category/${category.id}`}>
              <div className="grid grid-flow-row auto-rows-[1fr] md:grid-flow-col md:auto-cols-[1fr] hover:cursor-pointer">
                <div className="w-full flex flex-col justify-center items-center py-20 md:py-0 md:p-0 gap-6 bg-[#2E2522] text-white">
                  <span className="text:2xl md:text-4xl xl:text-6xl font-bold text-center w-[40%] md:w-[50%] lg:w-[60%]">
                    {category.title}
                  </span>
                  <div className="border-b-2 border-white w-12"></div>
                  <span className="text-center text-sm md:text-base xl:text-xl font-semibold w-[70%] md:w-[50%]">
                    {category.description}
                  </span>
                </div>
                <div className="w-full">
                  <Image
                    height={500}
                    width={500}
                    src={category?.imageUrl}
                    alt="img"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
              </div>
            </Link>
            {category.subcategories && (
              <Subcategories subcategories={category.subcategories} />
            )}
            <ProductList
              // Making sure to display no more than 8 products under category on the HomePage
              products={
                category.products.length <= 8
                  ? category.products
                  : category.products.slice(0, 8)
              }
            />
            <div className="text-center my-14  text-white">
              <Link
                href={`category/${category.id}`}
                className="bg-[#2E2522] hover:bg-opacity-70 text-xs px-4 py-2 md:px-6 md:py-3 md:text-sm font-semibold"
              >
                SHOP ALL {category.name.toUpperCase()} &#40;
                {category.products.length}&#41;
              </Link>
            </div>
          </section>
        );
      })}
    </>
  );
}
