import Link from "next/link";
import Image from "next/image";
import { GetCategories } from "@/actions";

export const FeaturedCategories = async () => {
  const categories = await GetCategories();

  const featuredCategories = categories.slice(0, 4);

  if (featuredCategories.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
            Categorías
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Explora nuestras colecciones
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name}`}
              className="group relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-900/40 group-hover:from-gray-900/70 group-hover:to-gray-900/50 transition-all duration-300 z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white">
                  <h3 className="text-2xl sm:text-3xl font-light mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200">
                    {category.productCount} {category.productCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

