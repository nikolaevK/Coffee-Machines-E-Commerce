export interface BillboardInterface {
  id: string;
  label: string;
  imageUrl: string;
}

export interface CategoryInterface {
  id: string;
  name: string;
  billboard: BillboardInterface;
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
  color: Record<string, string>;
  images: Array<Record<string, string>>;
  category: Record<string, string>;
}
