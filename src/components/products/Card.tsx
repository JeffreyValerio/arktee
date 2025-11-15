"use client";

import { ArrowLeft, ArrowRight, ShoppingBag, Eye, Heart, BarChart3 } from "lucide-react";
import Link from "next/link";
import { currencyFormat } from "@/lib/currency-format";
import { IProduct } from "@/interfaces/product.interface";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import { CartProduct } from "@/interfaces/cart-product.interface";
import { Size } from "@prisma/client";
import { toast } from "sonner";
import { useFavoritesStore } from "@/store/favorites/favorites-store";
import { useComparisonStore } from "@/store/comparison/comparison-store";

interface Props {
  product: IProduct;
}

const allSizes: Size[] = ["XS", "S", "M", "L", "XL"];
const productColors = [
  { name: "Gris", hex: "#9CA3AF" },
  { name: "Azul", hex: "#3B82F6" },
  { name: "Amarillo", hex: "#FBBF24" },
];

export default function ProductCard({ product }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(productColors[0].hex);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { isInComparison, addToComparison, removeFromComparison } = useComparisonStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const images = product.ProductImage.map((img) => img.url);
  const availableSizes = product.sizes || [];
  const isProductFavorite = isHydrated ? isFavorite(product.id) : false;
  const isProductInComparison = isHydrated ? isInComparison(product.id) : false;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedSize) {
      // Seleccionar la primera talla disponible si no hay selección
      const firstAvailable = availableSizes[0] as Size;
      if (firstAvailable) {
        setSelectedSize(firstAvailable);
        const cartProduct: CartProduct = {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          stock: product.stock,
          quantity: 1,
          size: firstAvailable,
          image: images[0],
        };
        addProductToCart(cartProduct);
        toast.success("Producto agregado al carrito", {
          description: `${product.title} - Talla ${firstAvailable}`,
        });
      } else {
        toast.error("No hay tallas disponibles", {
          description: "Por favor selecciona una talla diferente",
        });
      }
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      stock: product.stock,
      quantity: 1,
      size: selectedSize,
      image: images[0],
    };
    addProductToCart(cartProduct);
    toast.success("Producto agregado al carrito", {
      description: `${product.title} - Talla ${selectedSize}`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[9/8] overflow-hidden bg-gray-50 dark:bg-gray-900/50">
        <Image
          src={images[imageIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          height={400}
          width={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          quality={85}
        />
        
        {/* Action Buttons - Favoritos y Comparar */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isProductFavorite 
                ? 'bg-gray-900 text-white' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
            aria-label={isProductFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={14} className={isProductFavorite ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={toggleCompare}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isProductInComparison 
                ? 'bg-gray-900 text-white' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
            aria-label={isProductInComparison ? 'Remover de comparación' : 'Agregar a comparación'}
          >
            <BarChart3 size={14} />
          </button>
        </div>
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevImage();
              }}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Previous image"
            >
              <ArrowLeft size={10} />
            </button>
            <span className="text-xs font-medium text-white min-w-[1.5rem] text-center">{imageIndex + 1}/{images.length}</span>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextImage();
              }}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Next image"
            >
              <ArrowRight size={10} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/${product.slug}`} className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              {product.category?.name || "Producto"}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
              {product.title}
            </p>
          </Link>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
            {currencyFormat(product.price)}
          </p>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            SIZE
          </label>
          <div className="flex gap-2">
            {allSizes.map((size) => {
              const isAvailable = availableSizes.includes(size);
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isAvailable) setSelectedSize(size);
                  }}
                  disabled={!isAvailable}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all ${
                    isSelected && isAvailable
                      ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                      : isAvailable
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            COLOR
          </label>
          <div className="flex gap-2">
            {productColors.map((color) => {
              const isSelected = selectedColor === color.hex;
              return (
                <button
                  key={color.hex}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(color.hex);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-gray-900 dark:border-gray-100 ring-2 ring-gray-300 dark:ring-gray-600'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Color ${color.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-3 text-[10px] font-medium capitalize bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-900 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all rounded-md flex items-center justify-center gap-1.5"
          >
            <Eye size={12} />
            Ver producto
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 text-[10px] font-medium capitalize bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={12} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
