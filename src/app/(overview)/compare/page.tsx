"use client";

import { useComparisonStore } from "@/store/comparison/comparison-store";
import { ProductComparison } from "@/components/products/ProductComparison";
import { Button } from "@/components/ui/button";
import { BarChart3, Trash2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function ComparePage() {
  const { comparison, clearComparison } = useComparisonStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <BarChart3 size={32} />
                Comparar Productos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Compara hasta 4 productos para tomar la mejor decisión
              </p>
            </div>
            
            {comparison.length > 0 && (
              <Button
                onClick={clearComparison}
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={16} className="mr-2" />
                Limpiar comparación
              </Button>
            )}
          </div>
        </div>

        {/* Comparison Content */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
          {comparison.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No hay productos para comparar
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Agrega productos usando el botón de comparar en las tarjetas de productos para ver sus características lado a lado.
              </p>
              <Link href="/">
                <Button size="lg">
                  Explorar productos
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Comparando {comparison.length} producto{comparison.length !== 1 ? 's' : ''}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comparison.length}/4 productos
                  </span>
                </div>
              </div>
              
              <ProductComparison productIds={comparison} />
            </>
          )}
        </div>

        {/* Tips */}
        {comparison.length > 0 && comparison.length < 4 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                !
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Tip de comparación
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Puedes agregar hasta {4 - comparison.length} producto{4 - comparison.length !== 1 ? 's' : ''} más para una comparación más completa.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
