"use client";

import { useFavoritesStore } from "@/store/favorites/favorites-store";
import { GetProductsByIds } from "@/actions/products/getByIds";
import { IProduct } from "@/interfaces/product.interface";
import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/products/Card";

export const dynamic = 'force-dynamic';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const fetchedProducts = await GetProductsByIds({ ids: favorites });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 lg:py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <Heart size={32} className="text-red-500" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {favorites.length === 0 
                  ? 'No tienes productos favoritos aún'
                  : `Tienes ${favorites.length} producto${favorites.length !== 1 ? 's' : ''} en favoritos`
                }
              </p>
            </div>
            
            {favorites.length > 0 && (
              <Button
                onClick={clearFavorites}
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={16} className="mr-2" />
                Limpiar favoritos
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 p-8">
            <div className="text-center py-12">
              <Heart size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No tienes productos favoritos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Explora nuestros productos y agrega los que más te gusten a tus favoritos usando el botón del corazón.
              </p>
              <Link href="/">
                <Button size="lg">
                  Explorar productos
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Products Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  !
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Tip de favoritos
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Los productos en favoritos se mantienen guardados para que puedas encontrarlos fácilmente más tarde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
