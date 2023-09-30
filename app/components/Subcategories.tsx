import { SubcategoriesInterface } from "../utils/types/types";

interface SubcategoriesComponentInterface {
  subcategories: SubcategoriesInterface;
}

export default function Subcategories({
  subcategories,
}: SubcategoriesComponentInterface) {
  const {
    subcategory1,
    subcategory2,
    subcategory3,
    description1,
    description2,
    description3,
  } = subcategories;
  return (
    <div className="hidden md:flex justify-between items-center my-8 text-[#2E2522]">
      <div className="flex flex-1 flex-col gap-y-2 justify-center items-center text-center px-8">
        <span className="font-semibold text-sm">
          {subcategory1.toUpperCase()}
        </span>
        <span>{description1}</span>
      </div>
      <div className="flex flex-1 flex-col gap-y-2 justify-center items-center border-x-2 border-[#2E2522] text-center px-8">
        <span className="font-semibold text-sm">
          {subcategory2.toUpperCase()}
        </span>
        <span>{description2}</span>
      </div>
      <div className="flex flex-1 flex-col gap-y-2 justify-center items-center text-center px-8">
        <span className="font-semibold text-sm">
          {subcategory3.toUpperCase()}
        </span>
        <span>{description3}</span>
      </div>
    </div>
  );
}
