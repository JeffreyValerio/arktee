import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Topbar } from "./Topbar";
import { Icons } from "./Icons";
import { GetCategories } from "@/actions";
import { CartCounter } from "./CartCounter";
import { FavoritesCounter } from "./FavoritesCounter";
import { ComparisonCounter } from "./ComparisonCounter";
import { Filter, Shirt, Package, Grid, Layers } from "lucide-react";
import { UserMenu } from "./UserMenu";

export const Navbar = async () => {
  const categories = await GetCategories();

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <Topbar />
      <div className="max-width">
        <div className="h-16 sm:h-20 flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/"} className="flex items-center">
                  <Icons.logoDark />
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 data-[state=open]:text-gray-900 dark:data-[state=open]:text-gray-100">
                    <Filter size={14} className="mr-1.5" />
                    Categorías
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[calc(100vw-2rem)] sm:w-[600px] lg:w-[700px] max-w-[calc(100vw-2rem)] sm:max-w-[600px] lg:max-w-[700px]">
                    <div className="w-full p-6">
                      <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Nuestras Categorías
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Explora nuestra colección completa
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categories.map((category) => (
                          <CategoryCard
                            key={category.id}
                            title={category.name}
                            href={`/category/${category.name}`}
                            productCount={category.productCount}
                          />
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/gender/men"
                      className="px-4 py-2 text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 rounded-md"
                    >
                      Hombres
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/gender/women"
                      className="px-4 py-2 text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 rounded-md"
                    >
                      Mujeres
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/gender/kid"
                      className="px-4 py-2 text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 rounded-md"
                    >
                      Niños
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/gender/unisex"
                      className="px-4 py-2 text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 rounded-md"
                    >
                      Unisex
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <FavoritesCounter />
            <ComparisonCounter />
            <CartCounter />
          </div>
          
          {/* Mobile User Menu - Solo visible en mobile ya que en desktop está en el Topbar */}
          <div className="md:hidden">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon mapping for categories
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("crop") || name.includes("corto")) {
    return Grid;
  }
  if (name.includes("oversize") || name.includes("grande")) {
    return Package;
  }
  if (name.includes("delantal") || name.includes("apron")) {
    return Layers;
  }
  if (name.includes("sudadera") || name.includes("hoodie")) {
    return Shirt;
  }
  return Filter;
};

function CategoryCard({
  title,
  href,
  productCount,
}: {
  title: string;
  href: string;
  productCount: number;
}) {
  const Icon = getCategoryIcon(title);

  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="group relative flex items-start gap-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-gray-900 dark:hover:border-gray-100 hover:shadow-lg transition-all duration-200 no-underline outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-gray-100 transition-colors duration-200">
          <Icon 
            className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-200" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {title}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {productCount} {productCount === 1 ? "producto disponible" : "productos disponibles"}
          </p>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}
