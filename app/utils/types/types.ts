export interface BillboardInterface {
  id: string;
  label: string;
  imageUrl: string;
}

export interface CategoryInterface {
  id: string;
  storeId: string;
  billboardId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products: ProductInterface[];
}

export interface ProductInterface {
  id: string;
  name: string;
  Archived: boolean;
  isFeatured: boolean;
  price: number;
  categoryId: string;
  date: string;
  colorId: string;
  createdAt: string;
  updatedAt: string;
  color: ColorInterface;
  images: ImagesInterface[];
  category: Record<string, string>;
}

interface ColorInterface {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

interface ImagesInterface {
  id: string;
  productId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
