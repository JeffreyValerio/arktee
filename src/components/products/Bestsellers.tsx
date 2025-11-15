import Link from "next/link";
import ProductCard from "./Card";
import { getPaginatedProducts } from "@/actions";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Bestsellers = async () => {
  const { products } = await getPaginatedProducts({ });

  const bestsellers = products.slice(0, 4);

  if (bestsellers.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
              Lo más vendido
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Los favoritos de nuestros clientes
            </p>
          </div>
          <Link href="/gender/unisex">
            <Button 
              variant="ghost" 
              className="group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Ver todo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};