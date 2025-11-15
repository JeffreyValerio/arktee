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
import { MobileSidebar } from "./MobileSidebar";
import { getCurrentUserAction } from "@/actions/auth/get-user";

export const Navbar = async () => {
  const categories = await GetCategories();
  const { user } = await getCurrentUserAction();

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <Topbar />
      <div className="max-width">
        <div className="h-16 sm:h-20 flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Mobile Sidebar Button */}
          <div className="lg:hidden">
            <MobileSidebar categories={categories} user={user} />
          </div>

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
                  <NavigationMenuTrigger className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 data-[state=open]:text-gray-900 dark:data-[state=open]:text-gray-100 data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-800 rounded-md px-4 py-2">
                    <Filter size={16} className="mr-2" />
                    Categorías
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!left-1/2 !-translate-x-1/2 !top-full !mt-2 !overflow-visible !z-[100] data-[state=open]:!block">
                    <nav 
                      className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-visible backdrop-blur-sm" 
                      style={{ width: 'max-content', minWidth: '500px', maxWidth: '95vw' }}
                      aria-label="Navegación de categorías"
                    >
                      <div className="mb-5">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Categorías
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Explora nuestra colección
                        </p>
                      </div>
                      {categories && categories.length > 0 ? (
                        <ul className="grid grid-cols-2 gap-2 list-none m-0 p-0" style={{ width: '100%' }}>
                          {categories.map((category) => (
                            <li key={category.id}>
                              <CategoryCard
                                title={category.name}
                                href={`/category/${category.name}`}
                                productCount={category.productCount}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No hay categorías disponibles</p>
                      )}
                    </nav>
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

          {/* Actions - Hidden on mobile, shown in sidebar */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 md:gap-4">
            <FavoritesCounter />
            <ComparisonCounter />
            <CartCounter />
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
  return (
    <Link
      href={href}
      className="group relative flex items-center justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 no-underline outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2 w-full min-w-0"
      aria-label={`Ver productos de ${title}, ${productCount} ${productCount === 1 ? "producto disponible" : "productos disponibles"}`}
    >
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors block">
          {title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block" aria-label={`${productCount} ${productCount === 1 ? "producto" : "productos"}`}>
          {productCount} {productCount === 1 ? "producto" : "productos"}
        </span>
      </div>
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200" aria-hidden="true">
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
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
  );
}
