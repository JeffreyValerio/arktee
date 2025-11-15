import type { Metadata } from "next";
import { GetCategories, getPaginatedProducts } from "@/actions";
import { ProductGrid } from "@/components";
import SidebarFilters from "@/components/shared/SidebarFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Size } from "@prisma/client";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';
const siteName = 'ARKTEE - Camisetas Personalizadas de Calidad';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryUrl = `${siteUrl}/category/${category}`;

  return {
    title: `Camisetas ${categoryName} | ARKTEE`,
    description: `Descubre nuestra colección de camisetas ${categoryName} personalizadas de alta calidad. Diseños únicos y materiales de primera. Envíos rápidos en Costa Rica.`,
    keywords: [`camisetas ${categoryName}`, 'camisetas personalizadas', categoryName, 'ropa Costa Rica', 't-shirts'],
    openGraph: {
      title: `Camisetas ${categoryName} | ${siteName}`,
      description: `Descubre nuestra colección de camisetas ${categoryName} personalizadas de alta calidad.`,
      url: categoryUrl,
      siteName: siteName,
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: `Camisetas ${categoryName}`,
        },
      ],
      locale: 'es_CR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Camisetas ${categoryName} | ARKTEE`,
      description: `Descubre nuestra colección de camisetas ${categoryName} personalizadas.`,
      images: [`${siteUrl}/logo.png`],
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    size?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: "price-asc" | "price-desc" | "newest" | "oldest" | "name-asc" | "name-desc";
  }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;

  const pageNumber = parseInt(query.page || "1");

  const rawSizes = Array.isArray(query.size)
    ? query.size
    : query.size
    ? [query.size]
    : [];
  const sizesFilter = rawSizes.filter((s): s is Size =>
    Object.values(Size).includes(s as Size)
  );

  const minPrice = query.minPrice ? parseFloat(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : undefined;

  const { products, totalPages, currentPage, totalCount } = await getPaginatedProducts({
    page: pageNumber,
    category,
    sizes: sizesFilter,
    minPrice,
    maxPrice,
    sort: query.sort,
  });

  // Solo redirigir si no hay filtros aplicados y no hay productos
  const hasFilters = sizesFilter.length > 0 || query.minPrice || query.maxPrice || query.sort;
  if (products.length === 0 && !hasFilters && currentPage > 1) {
    redirect(`/category/${category}`);
  }

  const categories = await GetCategories();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Capitalizar primera letra de la categoría
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // 🔗 Helper para mantener los filtros al cambiar de página
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();

    sizesFilter.forEach((s) => params.append("size", s));
    if (query.minPrice) params.set("minPrice", query.minPrice);
    if (query.maxPrice) params.set("maxPrice", query.maxPrice);
    if (query.sort) params.set("sort", query.sort);

    params.set("page", pageNum.toString());

    return `/category/${category}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-width py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <SidebarFilters categories={categories} availableSizes={sizes} hideCategoryFilter={true} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {categoryName}
                </h1>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
                {totalCount > 0 ? (
                  <>Mostrando {products.length} de {totalCount} productos</>
                ) : (
                  <>No se encontraron productos</>
                )}
              </p>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <>
                <ProductGrid products={products} />

                {/* PAGINACIÓN */}
                <div className="mt-8 sm:mt-12 mb-8">
                  <Pagination>
                    <PaginationContent>
                      {/* Botón Anterior */}
                      <PaginationItem>
                        {currentPage > 1 && (
                          <PaginationPrevious href={buildPageUrl(currentPage - 1)} />
                        )}
                      </PaginationItem>

                      {/* Primera página */}
                      {currentPage > 2 && (
                        <>
                          <PaginationItem>
                            <PaginationLink href={buildPageUrl(1)}>1</PaginationLink>
                          </PaginationItem>
                          {currentPage > 3 && <PaginationEllipsis />}
                        </>
                      )}

                      {/* Página actual y vecinas */}
                      {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i).map(
                        (pageNum) => {
                          if (pageNum < 1 || pageNum > totalPages) return null;
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href={buildPageUrl(pageNum)}
                                isActive={pageNum === currentPage}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      {/* Última página */}
                      {currentPage < totalPages - 1 && (
                        <>
                          {currentPage < totalPages - 2 && <PaginationEllipsis />}
                          <PaginationItem>
                            <PaginationLink href={buildPageUrl(totalPages)}>
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}

                      {/* Botón Siguiente */}
                      <PaginationItem>
                        {currentPage < totalPages && (
                          <PaginationNext href={buildPageUrl(currentPage + 1)} />
                        )}
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <a
                  href={`/category/${category}`}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Limpiar filtros
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
