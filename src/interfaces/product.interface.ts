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
  categoryId: string; 
  createdAt: Date;
  updatedAt: Date;
  ProductImage: ProductImage[];
  category?: Category;
}

export interface ProductImage {
  id?: number;
  url: string;
  productId?: string;
} 

export interface Category {
  id: string;
  name: string;
}