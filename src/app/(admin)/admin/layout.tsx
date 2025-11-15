
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Home,
  Tag,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Categorías", href: "/admin/categories", icon: Tag },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Analíticas", href: "/admin/analytics", icon: BarChart3 },
  { name: "Reportes", href: "/admin/reports", icon: FileText },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Fixed on all screen sizes */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col",
                sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Admin Panel
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-3 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || 
                                (item.href !== "/admin" && pathname.startsWith(item.href));
                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                                        isActive
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon size={20} className="mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Back to store */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md transition-colors duration-200"
                    >
                        <Home size={18} />
                        Volver a la tienda
                    </Link>
                </div>
            </div>

            {/* Main content area - With left margin for fixed sidebar */}
            <div className="flex flex-col min-h-screen lg:ml-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="flex items-center justify-between h-16 px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <Menu size={24} />
                        </button>
                        
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                                Panel de Administración
                            </div>
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                            >
                                <Home size={16} />
                                <span className="hidden sm:inline">Volver a la tienda</span>
                                <span className="sm:hidden">Tienda</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}