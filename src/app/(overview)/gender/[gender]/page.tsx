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
import { Gender, Size } from "@prisma/client";
import { redirect } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';
const siteName = 'ARKTEE - Camisetas Personalizadas de Calidad';

const genderLabels: Record<string, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Unisex",
};

export async function generateMetadata({ params }: { params: Promise<{ gender: string }> }): Promise<Metadata> {
  const { gender } = await params;
  const genderLabel = genderLabels[gender] || gender;
  const genderUrl = `${siteUrl}/gender/${gender}`;

  return {
    title: `Camisetas para ${genderLabel} | ARKTEE`,
    description: `Descubre nuestra colección exclusiva de camisetas para ${genderLabel}. Diseños únicos, materiales de calidad y envíos rápidos en Costa Rica.`,
    keywords: [`camisetas ${genderLabel}`, 'camisetas personalizadas', genderLabel, 'ropa Costa Rica', 't-shirts'],
    openGraph: {
      title: `Camisetas para ${genderLabel} | ${siteName}`,
      description: `Descubre nuestra colección exclusiva de camisetas para ${genderLabel}. Diseños únicos y materiales de calidad.`,
      url: genderUrl,
      siteName: siteName,
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: `Camisetas para ${genderLabel}`,
        },
      ],
      locale: 'es_CR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Camisetas para ${genderLabel} | ARKTEE`,
      description: `Descubre nuestra colección exclusiva de camisetas para ${genderLabel}.`,
      images: [`${siteUrl}/logo.png`],
    },
    alternates: {
      canonical: genderUrl,
    },
  };
}

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{
    page?: string;
    category?: string;
    size?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: "price-asc" | "price-desc" | "newest" | "oldest" | "name-asc" | "name-desc";
  }>;
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
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
    gender: gender as Gender,
    category: query.category,
    sizes: sizesFilter,
    minPrice,
    maxPrice,
    sort: query.sort,
  });

  // Solo redirigir si no hay filtros aplicados y no hay productos
  const hasFilters = query.category || sizesFilter.length > 0 || query.minPrice || query.maxPrice || query.sort;
  if (products.length === 0 && !hasFilters && currentPage > 1) {
    redirect(`/gender/${gender}`);
  }

  const categories = await GetCategories();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  const categoryName = query.category || "Camisetas";

  // 🔗 Helper para mantener los filtros al cambiar de página
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();

    if (query.category) params.set("category", query.category);
    sizesFilter.forEach((s) => params.append("size", s));
    if (query.minPrice) params.set("minPrice", query.minPrice);
    if (query.maxPrice) params.set("maxPrice", query.maxPrice);
    if (query.sort) params.set("sort", query.sort);

    params.set("page", pageNum.toString());

    return `/gender/${gender}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-width py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <SidebarFilters categories={categories} availableSizes={sizes} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {categoryName} {labels[gender]}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
                  href={`/gender/${gender}`}
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
