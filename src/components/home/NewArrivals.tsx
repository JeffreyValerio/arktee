import Link from "next/link";
import ProductCard from "../products/Card";
import { getPaginatedProducts } from "@/actions";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NewArrivals = async () => {
  const { products } = await getPaginatedProducts({
    sort: "newest",
    take: 4,
  });

  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
              Nuevos lanzamientos
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Descubre nuestras últimas incorporaciones
            </p>
          </div>
          <Link href="/?page=1#products">
            <Button 
              variant="ghost" 
              className="group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Ver todo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

