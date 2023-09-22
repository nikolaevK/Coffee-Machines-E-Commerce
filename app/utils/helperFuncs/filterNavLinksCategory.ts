import { CategoryInterface } from "../types/types";

type CategoryType = "name" | "id";

export function filterNavLinksCategory(data: CategoryInterface[]) {
  const categories = data.reduce(
    (data: Record<CategoryType, string>[], category) => {
      const categoryObj = {
        name: category.name,
        id: category.id,
      };
      data.push(categoryObj);
      return data;
    },
    []
  );

  return categories;
}
