export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  tags: string[];
  gender: string;
  sizes: string[];
  stock: number;
  colorId: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  ProductImage: ProductImage[];
  
}

export interface ProductImage {
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
}
