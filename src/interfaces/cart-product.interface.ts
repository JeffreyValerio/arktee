export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  size: Size;
  image: string; 
}
