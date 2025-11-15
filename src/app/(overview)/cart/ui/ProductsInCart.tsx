"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/interfaces/cart-product.interface";
import { currencyFormat } from "@/lib/currency-format";
import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (productInCart.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-md p-8 sm:p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Parece que aún no has agregado productos a tu carrito. Explora nuestra colección y encuentra lo que buscas.
          </p>
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Productos ({productInCart.length})
        </h2>
      </div>

      {/* Products List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {loaded && productInCart.map((product: CartProduct, index: number) => (
          <div key={`${product.slug}-${product.size}`} className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Product Image */}
              <Link href={`/${product.slug}`} className="flex-shrink-0">
                <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 group">
                  <ProductImage
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={150}
                    height={150}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex-1">
                  <Link 
                    href={`/${product.slug}`}
                    className="block mb-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                  >
                    {product.title}
                  </Link>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Talla: <span className="font-medium text-gray-900 dark:text-gray-100">{product.size}</span>
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {currencyFormat(product.price)}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cantidad:</span>
                      <QuantitySelector
                        quantity={product.quantity}
                        maxStock={product.stock}
                        onQuantityChanged={value => updateProductQuantity(product, value)}
                      />
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {currencyFormat(product.price * product.quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start">
                  <Button
                    onClick={() => removeProduct(product)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Eliminar</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
