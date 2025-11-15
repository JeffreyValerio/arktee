export const dynamic = 'force-dynamic';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/lib/currency-format";
import { Edit, Package, Plus } from "lucide-react";
import { getPaginatedProducts } from "@/actions";
import { IProduct } from "@/interfaces/product.interface";
import { ProductImage } from "@/components";
import { ProductSearch } from "./ui/search";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DeleteProductButton } from "./ui/delete-button";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; query?: string }> }) {
    const { page, query } = await searchParams;
    const pageNumber = parseInt(page || "1");
    const searchQuery = query || "";

    const { products, currentPage, totalPages } = await getPaginatedProducts({
        page: pageNumber,
        query: searchQuery,
    });

    if (products.length === 0 && !searchQuery) {
        redirect("/");
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Gestión de Productos
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Administra tu catálogo de productos
                    </p>
                </div>

                <Link href="/admin/products/new">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} />
                        Nuevo Producto
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <ProductSearch initialQuery={searchQuery} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Productos
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {products.length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <Package className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Con Stock
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {products.filter(p => p.stock > 0).length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <Package className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Sin Stock
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {products.filter(p => p.stock === 0).length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Promedio Precio
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {currencyFormat(products.reduce((acc, p) => acc + p.price, 0) / products.length || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Lista de Productos
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Producto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Género
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Tallas
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {products.map((product: IProduct) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <ProductImage
                                                    src={product.ProductImage[0]?.url}
                                                    alt={product.title}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    <Link 
                                                        href={`/admin/products/${product.slug}`}
                                                        className="hover:text-primary transition-colors"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {product.description?.substring(0, 50)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {currencyFormat(product.price)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            product.stock > 10 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                : product.stock > 0
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full capitalize">
                                            {product.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.sizes && product.sizes.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {product.sizes.slice(0, 3).map((size) => (
                                                    <Badge
                                                        key={size}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {size}
                                                    </Badge>
                                                ))}
                                                {product.sizes.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{product.sizes.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.slug}`}
                                                className="inline-flex items-center p-2 text-gray-400 hover:text-primary transition-colors"
                                                title="Editar producto"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <DeleteProductButton productId={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Página {currentPage} de {totalPages}
                        </div>
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const page = idx + 1;
                                return (
                                    <Link
                                        key={page}
                                        href={`/admin/products?page=${page}&query=${searchQuery}`}
                                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                            currentPage === page 
                                                ? "bg-primary text-white" 
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
