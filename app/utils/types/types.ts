export interface BillboardInterface {
  id: string;
  label: string;
  imageUrl: string;
}

export interface HomeBillboardInterface {
  id: string;
  storeId: string;
  categories?: CategoryInterface[];
  subcategories: SubcategoriesInterface;
  imageUrl: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubcategoriesInterface {
  id: string;
  storeId: string;
  homeBillboardId: string;
  subcategory1: string;
  subcategory2: string;
  subcategory3: string;
  description1: string;
  description2: string;
  description3: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInterface {
  id: string;
  storeId: string;
  billboardId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products: ProductInterface[];
  homeBillboardId: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  Archived: boolean;
  isFeatured: boolean;
  price: string;
  categoryId: string;
  date: string;
  colorId: string;
  createdAt: string;
  updatedAt: string;
  color: ColorInterface;
  images: ImagesInterface[];
  category: Record<string, string>;
}

export interface ColorInterface {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImagesInterface {
  id: string;
  productId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
