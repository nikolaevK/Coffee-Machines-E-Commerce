export interface BillboardInterface {
  id: string;
  label: string;
  imageUrl: string;
}

export interface HomeBillboardInterface {
  id: string;
  storeId: string;
  categories?: CategoryInterface[];
  imageUrl: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInterface {
  id: string;
  storeId: string;
  billboardId: string;
  homeBillboard: HomeBillboardInterface;
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
