import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { ShoppingBag } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-width py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Carrito de Compras
            </h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
            Revisa tus productos antes de finalizar tu compra
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <ProductsInCart />
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
