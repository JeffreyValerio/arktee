import { GetProductBySlug } from "@/actions/products/getBySlug";
import { GetRelatedProducts } from "@/actions/products/getRelated";
import {
  AddToCard,
  Bestsellers,
  BreadcrumbProduct,
  Gallery,
  Title,
} from "@/components";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductInfoSections } from "@/components/products/ProductInfoSections";
import { Badge } from "@/components/ui/badge";
import { currencyFormat } from "@/lib/currency-format";
import { Gender } from "@prisma/client";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await GetProductBySlug({ slug });
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';
  const siteName = 'ARKTEE - Camisetas Personalizadas de Calidad';

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no está disponible',
    };
  }

  const productUrl = `${siteUrl}/${product.slug}`;
  const productImage = product.ProductImage?.[0]?.url || `${siteUrl}/logo.png`;
  const description = product.description || `Compra ${product.title} - Camiseta personalizada de alta calidad. Envíos rápidos en Costa Rica.`;

  return {
    title: `${product.title} | ARKTEE`,
    description: description,
    keywords: [...(product.tags || []), 'camiseta', 'camisetas personalizadas', product.title, 'Costa Rica'],
    openGraph: {
      type: 'website',
      url: productUrl,
      siteName: siteName,
      title: `${product.title} | ARKTEE`,
      description: description,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.title,
        },
        ...(product.ProductImage?.slice(1, 4).map(img => ({
          url: img.url,
          width: 800,
          height: 600,
          alt: product.title,
        })) || []),
      ],
      locale: 'es_CR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | ARKTEE`,
      description: description,
      images: [productImage],
      creator: '@arktee',
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductDetailsPage({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  const product = await GetProductBySlug({ slug });  

  if (!product) return null;

  const images = product.ProductImage?.map((img) => ({
    url: img.url,
    alt: product.title,
  })) ?? [];

  // Get related products
  const relatedProducts = await GetRelatedProducts({
    productId: product.id,
    categoryId: product.categoryId,
    gender: product.gender as Gender,
    limit: 4,
  });

  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';
  const productUrl = `${siteUrl}/${product.slug}`;
  const productImage = product.ProductImage?.[0]?.url || `${siteUrl}/logo.png`;

  // Structured Data JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || `${product.title} - Camiseta personalizada de alta calidad`,
    image: product.ProductImage?.map(img => img.url) || [productImage],
    brand: {
      '@type': 'Brand',
      name: 'ARKTEE',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'CRC',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'ARKTEE',
        url: siteUrl,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '117',
    },
    sku: product.id,
    category: product.category?.name || 'Camisetas',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category?.name || 'Productos',
        item: product.category ? `${siteUrl}/category/${product.category.name}` : `${siteUrl}/#products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ARKTEE',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+506-7144-7395',
      contactType: 'customer service',
      email: 'ventas@arktee.com',
      areaServed: 'CR',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 md:px-4 py-3 md:py-6 lg:py-8">
          <BreadcrumbProduct slug={slug} />

        {/* Main Product Section */}
        <div className="mt-2 sm:mt-4 md:mt-6">
          <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:items-start">
            {/* Gallery Section */}
            <div className="lg:sticky lg:top-8">
              <Gallery images={images} />
            </div>

            {/* Product Info Section */}
            <div>
              <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-md p-2 sm:p-4 lg:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                {/* Price and Rating */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {currencyFormat(product?.price ?? 0)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <svg
                            key={i}
                            className={`size-4 shrink-0 ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        4.5 (117)
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Product Title */}
                <div className="mb-4 sm:mb-6">
                  <Title title={product.title} />
                  {product?.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {product?.tags && product.tags.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                  <AddToCard product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Sections */}
        <ProductInfoSections />

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        {/* Bestsellers Section */}
        <div className="mt-16">
          <Bestsellers />
        </div>
      </div>
    </div>
    </>
  );
}
