"use client";

import { Heart, BarChart3 } from "lucide-react";
import Link from "next/link";
import { currencyFormat } from "@/lib/currency-format";
import Image from "next/image";
import { IProduct } from "@/interfaces/product.interface";
import { useFavoritesStore } from "@/store/favorites/favorites-store";
import { useComparisonStore } from "@/store/comparison/comparison-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  product: IProduct;
}

export default function ProductCardHorizontal({ product }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);
  
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { isInComparison, addToComparison, removeFromComparison } = useComparisonStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isProductFavorite = isHydrated ? isFavorite(product.id) : false;
  const isProductInComparison = isHydrated ? isInComparison(product.id) : false;

  const toggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
      toast.info("Producto eliminado de favoritos", {
        description: product.title,
      });
    } else {
      addToFavorites(product.id);
      toast.success("Producto agregado a favoritos", {
        description: product.title,
      });
    }
  };

  const toggleCompare = () => {
    if (isProductInComparison) {
      removeFromComparison(product.id);
      toast.info("Producto eliminado de comparación", {
        description: product.title,
      });
    } else {
      try {
        addToComparison(product.id);
        toast.success("Producto agregado a comparación", {
          description: product.title,
        });
      } catch {
        toast.error("Límite alcanzado", {
          description: "Solo puedes comparar hasta 4 productos",
        });
      }
    }
  };

  return (
    <Link href={`/${product.slug}`} className="group block">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Image Container */}
        <div className="relative w-full sm:w-2/5 aspect-[3/4] sm:aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900/50">
          <Image
            src={product.ProductImage[0].url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={500}
            height={500}
          />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite();
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isProductFavorite 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
              aria-label={isProductFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
            >
              <Heart size={16} className={isProductFavorite ? 'fill-current' : ''} />
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare();
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isProductInComparison 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
              aria-label={isProductInComparison ? 'Remover de comparación' : 'Agregar a comparación'}
            >
              <BarChart3 size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center flex-1 space-y-4">
          <div className="space-y-3">
            <h3 className="font-light text-2xl sm:text-3xl lg:text-4xl leading-tight text-gray-900 dark:text-gray-100 transition-colors">
              {product.title}
            </h3>
            
            {product.description && (
              <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed font-light">
                {product.description}
              </p>
            )}
          </div>
          
          <p className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-gray-700">
            {currencyFormat(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}