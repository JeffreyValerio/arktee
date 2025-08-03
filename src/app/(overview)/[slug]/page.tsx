import { GetProductBySlug } from "@/actions/products/getBySlug";
import {
  AddToCard,
  Bestsellers,
  BreadcrumbProduct,
  Gallery,
  Title,
} from "@/components";
import { Badge } from "@/components/ui/badge";
import { currencyFormat } from "@/lib/currency-format";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await GetProductBySlug({ slug });

  return {
    title: product?.title,
    description: product?.description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    alternates: {
      canonical: `/${product?.slug}`,
    },
    openGraph: {
      images: [`/${product?.images[0]}`],
      type: "website",
      siteName: "Venta de camisetas personalizadas",
      url: `${process.env.NEXT_PUBLIC_URL}/${product?.slug}`,
      countryName: "Costa Rica",
      emails: "ventas@arktee.com",
      phoneNumbers: ["7144-7395"],
      description: product?.description,
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await GetProductBySlug({ slug });

  if (!product) return null;

  const images =
    product?.ProductImage.map((img) => ({
      url: img.url,
      alt: product.title,
    })) ?? [];

  return (
    <div className="my-10 max-width">
      <BreadcrumbProduct slug={slug} />

      <div className="grid gap-4 lg:grid-cols-3 mt-6">
        <div className="lg:col-start-1 lg:col-end-3">
          <Gallery images={images} />
        </div>

        <div className="bg-secondary rounded p-4 relative h-full shadow flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="sr-only">Product information</h2>
            <p className="text-4xl tracking-tight font-semibold text-accent-foreground">
              {currencyFormat(product?.price ?? 0)}
            </p>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="text-sm mr-2">(4.5)</span>
                  {[1, 2, 3, 4].map((_, i) => (
                    <svg
                      key={i}
                      className="size-5 shrink-0"
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
                  <svg
                    className="size-5 shrink-0 text-gray-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Badge className="ml-3">117 reviews</Badge>
              </div>
            </div>
            <div className="my-6">
              <div className="mt-4 flex space-x-2">
                {product?.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className="cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Title title={product.title} />
              <p className="text-sm">{product?.description}</p>
            </div>
          </div>

          <AddToCard product={product} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {product?.title}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0"></div>

        <div className="py-10 lg:col-span-2 lg:col-start-1">
          <div>
            <div className="space-y-6">
              <p className="text-base">{product?.description}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium">Highlights</h3>
            <div className="mt-4">
              <ul className="list-disc space-y-2 pl-4 text-sm">
                <li className="text-gray-600">Hand cut and sewn locally</li>
                <li className="text-gray-600">
                  Dyed with our proprietary colors
                </li>
                <li className="text-gray-600">Pre-washed &amp; pre-shrunk</li>
                <li className="text-gray-600">Ultra-soft 100% cotton</li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium">Details</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                The 6-Pack includes two black, two white, and two heather gray
                Basic Tees...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Bestsellers /> */}
    </div>
  );
}
