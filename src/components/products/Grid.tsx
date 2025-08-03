import ProductCard from "./Card";
import { IProduct } from "@/interfaces/product.interface";

interface Props {
  products: IProduct[];
}
export const ProductGrid = async ({ products }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {products.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
