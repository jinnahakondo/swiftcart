

export type ProductType = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  brand: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  bestSeller: boolean;
  rating: number;
  soldCount: number;
  createdBy?: string;
};
