export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { getPaginatedProducts } from "@/actions";

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';
const siteName = 'ARKTEE - Camisetas Personalizadas de Calidad';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Descubre nuestra colección exclusiva de camisetas personalizadas. Diseños únicos, materiales de calidad y envíos rápidos en Costa Rica. Encuentra el estilo perfecto para ti.',
  keywords: ['camisetas personalizadas', 'tienda online', 'ropa Costa Rica', 'diseños únicos', 'camisetas de calidad', 't-shirts'],
  openGraph: {
    title: `${siteName} - Inicio`,
    description: 'Descubre nuestra colección exclusiva de camisetas personalizadas. Diseños únicos, materiales de calidad y envíos rápidos.',
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'ARKTEE - Camisetas Personalizadas',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Inicio`,
    description: 'Descubre nuestra colección exclusiva de camisetas personalizadas.',
    images: [`${siteUrl}/logo.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Structured Data for Homepage
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ARKTEE',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: 'Tienda online de camisetas personalizadas de alta calidad en Costa Rica',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+506-7144-7395',
    contactType: 'customer service',
    email: 'ventas@arktee.com',
    areaServed: 'CR',
    availableLanguage: 'Spanish',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CR',
    addressRegion: 'Costa Rica',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: 'Tienda online de camisetas personalizadas de alta calidad en Costa Rica',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
import {
  Hero,
  Bestsellers,
  FeaturedCategories,
  NewArrivals,
  GenderCollections,
  QualityMaterials,
  Testimonials,
  ProductGrid,
} from "@/components";
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

  if (products.length === 0 && pageNumber > 1) {
    redirect("/");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main className="bg-white dark:bg-gray-900">
      <Hero />
      <Bestsellers />
      <FeaturedCategories />
      <GenderCollections />
      <NewArrivals />
      <QualityMaterials />
      <Testimonials />

      {/* Products Section */}
      <section className="py-16 sm:py-20" id="products">
        <div className="max-width px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
              Nuestra Colección
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Descubre todos nuestros productos
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {/* Botón Anterior */}
                      <PaginationItem>
                        {currentPage > 1 && (
                          <PaginationPrevious
                            href={`/?page=${currentPage - 1}#products`}
                          />
                        )}
                      </PaginationItem>

                      {/* Primera página */}
                      {currentPage > 2 && (
                        <>
                          <PaginationItem>
                            <PaginationLink href="/?page=1#products">1</PaginationLink>
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
                          <PaginationNext
                            href={`/?page=${currentPage + 1}#products`}
                          />
                        )}
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No hay productos disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  );
}
