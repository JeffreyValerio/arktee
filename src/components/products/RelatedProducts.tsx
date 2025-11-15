"use client";

import { IProduct } from "@/interfaces/product.interface";
import ProductCard from "./Card";
import { Title } from "@/components/shared/Title";
import { Loader2 } from "lucide-react";

interface Props {
  products: IProduct[];
  loading?: boolean;
}

export function RelatedProducts({ products, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-6 sm:mb-8">
        <Title title="Productos Relacionados" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Descubre más productos que te pueden interesar
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

