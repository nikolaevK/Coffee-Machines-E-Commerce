interface FeaturedProduct {
  category: string;
  url: string;
}

interface FeaturedProductsInterface {
  featuredProducts: FeaturedProduct[];
}
export default function FeaturedProducts({
  featuredProducts,
}: FeaturedProductsInterface) {
  return (
    <div className="bg-white h-full ">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 md:min-w-full lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Coffee, Accessories
        </h2>
        <div className="mt-2 h-52 md:h-72 overflow-auto flex flex-row justify-items-center gap-2">
          {featuredProducts.map((product: FeaturedProduct, id) => (
            <div key={id} className="group relative">
              <div className="h-40 w-40 aspect-1 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 hover:cursor-pointer lg:h-44 lg:w-44">
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
          ))}
        </div>
      </div>
    </div>
  );
}
