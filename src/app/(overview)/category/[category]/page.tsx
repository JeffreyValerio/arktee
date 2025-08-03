import { getPaginatedProducts } from "@/actions";
import { ProductGrid } from "@/components";
import { redirect } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;

  const pageNumber = parseInt(page || "1");

  const { products, currentPage, totalPages } = await getPaginatedProducts({
    page: pageNumber,
    category,
  });

  if (products.length === 0) {
    redirect(`/category/${category}`);
  }

  return (
    <div className="max-width mt-10">
      <h2 className="text-[2rem] font-bold mb-8">Categoría de {category}</h2>

      <ProductGrid products={products} />

      <div className="mb-32 mt-6">
        <Pagination>
          <PaginationContent>
            {/* Botón Anterior */}
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                  href={`category/${category}/?page=${currentPage - 1}`}
                />
              )}
            </PaginationItem>

            {/* Primera página */}
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`/category/${category}/?page=1`}>
                    1
                  </PaginationLink>
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
                      href={`/category/${category}/?page=${pageNum}`}
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
                  <PaginationLink
                    href={`/category/${category}/?page=${totalPages}`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Botón Siguiente */}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext href={`/category/?page=${currentPage + 1}`} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
