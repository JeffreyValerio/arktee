"use client";

import { useComparisonStore } from "@/store/comparison/comparison-store";
import { useFavoritesStore } from "@/store/favorites/favorites-store";
import { IProduct } from "@/interfaces/product.interface";
import { ProductImage } from "./ProductImage";
import { currencyFormat } from "@/lib/currency-format";
import { Button } from "../ui/button";
import { Heart, X, BarChart3, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GetProductsByIds } from "@/actions/products/getByIds";
import { toast } from "sonner";

interface Props {
  productIds: string[];
}

export function ProductComparison({ productIds }: Props) {
  const { removeFromComparison } = useComparisonStore();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productIds.length === 0) return;
      
      try {
        setLoading(true);
        const fetchedProducts = await GetProductsByIds({ ids: productIds });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  const toggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
      toast.info("Producto eliminado de favoritos", {
        description: product?.title || "Producto",
      });
    } else {
      addToFavorites(productId);
      toast.success("Producto agregado a favoritos", {
        description: product?.title || "Producto",
      });
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No hay productos para comparar
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Agrega productos usando el botón de comparar en las tarjetas de productos
        </p>
        <Link href="/">
          <Button>Ver productos</Button>
        </Link>
      </div>
    );
  }


  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4 font-medium text-gray-900 dark:text-gray-100">
                Características
              </th>
              {products.map((product) => (
                <th key={product.id} className="text-center p-4 min-w-[200px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      aria-label="Remover de comparación"
                    >
                      <X size={12} />
                    </button>
                    <ProductImage
                      src={product.ProductImage[0].url}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                      width={96}
                      height={96}
                    />
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 text-center">
                      {product.title}
                    </h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">Precio</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {currencyFormat(product.price)}
                  </span>
                </td>
              ))}
            </tr>
            
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">Descripción</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                </td>
              ))}
            </tr>
            
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">Stock</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                  </span>
                </td>
              ))}
            </tr>
            
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">Tallas</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.sizes?.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">Acciones</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        isFavorite(product.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                      }`}
                      aria-label={isFavorite(product.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
                    >
                      <Heart size={16} className={isFavorite(product.id) ? 'fill-current' : ''} />
                    </button>
                    
                    <Link href={`../${product.slug}`}>
                      <Button size="sm" className="w-full">
                        <ShoppingBag size={14} className="mr-1" />
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
