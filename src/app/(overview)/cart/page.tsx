import { ProductsInCart } from "./ui/ProductsInCart";

export default function CartPage() {
  return (
    <div>
      <div className="max-width py-20">
        <h1 className="font-bold text-4xl mb-4">Carrito de compras</h1>

        <div className="flex items-center">
          <div className="w-2/3">
            <div className="">
              <ProductsInCart />
            </div>
            PRODUCTS
          </div>
          <div className="border w-1/3">CART</div>
        </div>
      </div>
    </div>
  );
}
