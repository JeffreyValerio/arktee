import { getPaginatedProducts } from "@/actions";
import { Benefits, Bestsellers, Hero, ProductGrid } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const pageNumber = parseInt(page || "1");

  const { products, currentPage, totalPages } = await getPaginatedProducts({
    page: pageNumber,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <main>
      <Benefits />
      <Hero />
      <Bestsellers />

      <div className="py-6" id="products">
        <div className="max-width">
          <h2 className="text-[2rem] font-bold mb-8">Nuestros productos</h2>

          <ProductGrid products={products} />
        </div>
      </div>
      <div className="mb-32">
        <Pagination>
          <PaginationContent>
            {/* Botón Anterior */}
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious href={`/?page=${currentPage - 1}#products`} />
              )}
            </PaginationItem>

            {/* Primera página */}
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href="/?page=1">1</PaginationLink>
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
                      href={`/?page=${pageNum}#products`}
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
                  <PaginationLink href={`/?page=${totalPages}#products`}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Botón Siguiente */}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext href={`/?page=${currentPage + 1}#products`} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
