import Link from "next/link";

interface FeaturedCategory {
  categoryId: string;
  category: string;
  url: string;
}

interface FeaturedCategoriesInterface {
  featuredCategories: FeaturedCategory[];
}
export default function FeaturedCategories({
  featuredCategories,
}: FeaturedCategoriesInterface) {
  return (
    <div className="bg-white h-full ">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 md:min-w-full lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Coffee, Espresso, and Tea
        </h2>
        <div className="mt-2  md:h-56 overflow-auto flex flex-row justify-items-center gap-2">
          {featuredCategories.map((product: FeaturedCategory, index) => (
            <Link
              href={`/category/${product.categoryId}`}
              key={`${product.categoryId}-${product.category}-${index}`}
            >
              <div className="group relative">
                <div className="h-40 w-40 aspect-1 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 hover:cursor-pointer lg:h-44 lg:w-52">
                  <img
                    src={product.url}
                    alt="img"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <p className="mt-1 text-sm font-semibold group-hover:underline">
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
