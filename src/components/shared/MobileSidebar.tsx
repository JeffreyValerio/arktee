"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Filter,
  Shirt,
  Package,
  Grid,
  Layers,
  Heart,
  BarChart3,
  ShoppingCart,
  Settings,
  ChevronRight,
  MapPin,
  User,
  CreditCard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { CartCounter } from "./CartCounter";
import { FavoritesCounter } from "./FavoritesCounter";
import { ComparisonCounter } from "./ComparisonCounter";
import { logoutAction } from "@/actions/auth/logout";

interface Category {
  id: string;
  name: string;
  productCount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MobileSidebarProps {
  categories: Category[];
  user: User | null;
}

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

export function MobileSidebar({ categories, user }: MobileSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const navigation = [
    { name: "Hombres", href: "/gender/men", icon: Shirt },
    { name: "Mujeres", href: "/gender/women", icon: Shirt },
    { name: "Niños", href: "/gender/kid", icon: Shirt },
    { name: "Unisex", href: "/gender/unisex", icon: Shirt },
  ];

  return (
    <>
      {/* Menu Button - Only visible on mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 p-2"
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Icons.logoDark />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Content - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Accesos Rápidos
            </h3>
            <div className="space-y-2">
              <div
                onClick={() => {
                  router.push("/favorites");
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
                  pathname === "/favorites"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <Heart size={18} />
                  <span>Favoritos</span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <FavoritesCounter />
                </div>
              </div>
              <div
                onClick={() => {
                  router.push("/compare");
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
                  pathname === "/compare"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 size={18} />
                  <span>Comparar</span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <ComparisonCounter />
                </div>
              </div>
              <div
                onClick={() => {
                  router.push("/cart");
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
                  pathname === "/cart"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  <span>Carrito</span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CartCounter />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Categorías
            </h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name);
                const isActive = pathname === `/category/${category.name}`;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.name}`}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs",
                          isActive
                            ? "text-white/80"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {category.productCount}
                      </span>
                      <ChevronRight
                        size={16}
                        className={cn(
                          "transition-transform group-hover:translate-x-0.5",
                          isActive ? "text-white/80" : "text-gray-400"
                        )}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Gender Navigation */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Géneros
            </h3>
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <item.icon size={18} className="mr-3" />
                    <span>{item.name}</span>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "ml-auto transition-transform group-hover:translate-x-0.5",
                        isActive ? "text-white/80" : "text-gray-400"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="px-3 mb-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {user ? "Mi Cuenta" : "Acceso"}
              </h3>
            </div>
            <div className="space-y-2">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  
                  {/* Admin Link */}
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                        pathname.startsWith("/admin")
                          ? "bg-primary text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      <Settings size={18} className="mr-3" />
                      <span>Panel de Admin</span>
                      <ChevronRight
                        size={16}
                        className={cn(
                          "ml-auto transition-transform group-hover:translate-x-0.5",
                          pathname.startsWith("/admin") ? "text-white/80" : "text-gray-400"
                        )}
                      />
                    </Link>
                  )}

                  {/* Account Links */}
                  <Link
                    href="/account/orders"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/account/orders"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Package size={18} className="mr-3" />
                    <span>Mis Pedidos</span>
                  </Link>
                  <Link
                    href="/account/addresses"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/account/addresses"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <MapPin size={18} className="mr-3" />
                    <span>Mis Direcciones</span>
                  </Link>
                  <Link
                    href="/account/profile"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/account/profile"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <User size={18} className="mr-3" />
                    <span>Mi Perfil</span>
                  </Link>
                  <Link
                    href="/account/payment-methods"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/account/payment-methods"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <CreditCard size={18} className="mr-3" />
                    <span>Métodos de Pago</span>
                  </Link>
                  <Link
                    href="/account/settings"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/account/settings"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>Configuración</span>
                  </Link>
                  
                  {/* Logout */}
                  <form action={logoutAction} className="mt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <LogOut size={18} className="mr-3" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/login"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <User size={18} className="mr-3" />
                    <span>Iniciar Sesión</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      pathname === "/register"
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <User size={18} className="mr-3" />
                    <span>Crear Cuenta</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

