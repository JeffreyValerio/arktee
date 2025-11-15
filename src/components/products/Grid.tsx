import ProductCard from "./Card";
import { IProduct } from "@/interfaces/product.interface";

interface Props {
  products: IProduct[];
}
export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};