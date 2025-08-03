import { getPaginatedProducts } from "@/actions";
import { ProductGrid } from "@/components";
import { Gender } from "@prisma/client";
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

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
    [key: string]: string | undefined;
  }>;
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;

  const pageNumber = parseInt(page || "1");

  const { products, currentPage, totalPages } = await getPaginatedProducts({
    page: pageNumber,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };
  return (
    <div className="max-width mt-10">
      <h2 className="text-[2rem] font-bold mb-8">Camisetas {labels[gender]}</h2>

      <ProductGrid products={products} />

      <div className="mb-32 mt-6">
        <Pagination>
          <PaginationContent>
            {/* Botón Anterior */}
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                  href={`/gender/${gender}/?page=${currentPage - 1}`}
                />
              )}
            </PaginationItem>

            {/* Primera página */}
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`/gender/${gender}/?page=1`}>
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
                      href={`/gender/${gender}/?page=${pageNum}`}
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
                    href={`/gender/${gender}/?page=${totalPages}`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Botón Siguiente */}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  href={`/gender/${gender}/?page=${currentPage + 1}`}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
