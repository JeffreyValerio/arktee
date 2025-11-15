"use client";

import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import { QuantitySelector } from "./QuantitySelector";
import { Size } from "@prisma/client";
import { Sizes } from "./Sizes";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";
import { CartProduct } from "@/interfaces/cart-product.interface";
import { SizeGuideModal } from "./SizeGuideModal";
import { toast } from "sonner";

interface Props {
  product: IProduct;
}

const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const AddToCard = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!selectedSize) {
      setPosted(false);
      toast.error("Debe seleccionar una talla", {
        description: "Por favor elige una talla antes de agregar al carrito",
      });
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      stock: product.stock,
      quantity: quantity,
      size: selectedSize,
      image: product.ProductImage[0].url,
    };

    addProductToCart(cartProduct);
    toast.success("Producto agregado al carrito", {
      description: `${product.title} - Talla ${selectedSize} x${quantity}`,
    });
    setPosted(false);
    setQuantity(1);
    setSelectedSize(undefined);
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Quantity Selector */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Cantidad
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Stock: {product.stock}
          </span>
        </div>
        <QuantitySelector
          quantity={quantity}
          maxStock={product.stock}
          onQuantityChanged={setQuantity}
        />
      </div>

      {/* Size Selection */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Talla
          </label>
          <SizeGuideModal />
        </div>
        
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {allSizes.map((size) => {
            const isAvailable = product?.sizes?.includes(size) ?? false;
            return (
              <Sizes
                selectedSize={selectedSize}
                key={size}
                size={size}
                isAvailable={isAvailable}
                onSizeChanged={setSelectedSize}
              />
            );
          })}
        </div>

        {posted && !selectedSize && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Debe seleccionar una talla</span>
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Las tallas no disponibles no se trabajan en este estilo o color
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="pt-4">
        <Button
          className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={addToCart}
          disabled={!selectedSize || product.stock === 0}
        >
          <ShoppingBag className="mr-1 sm:mr-2" size={16} />
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
        
        {/* Stock Warning */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>¡Quedan pocas unidades! Solo {product.stock} disponibles</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
