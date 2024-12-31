import Link from "next/link";
import { Card, ProductTypeCard } from "@/components/products/Card";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ProductSidebar } from "@/components";
import { sanityFetch } from "@/sanity/lib/live";
import { Category } from "@/sanity/types";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const query = (await searchParams).query || "";
    const params = { search: query };

    const { data: rawProducts } = await sanityFetch({ query: PRODUCTS_QUERY, params });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: ProductTypeCard[] = rawProducts.map((product: any) => ({
        ...product,
        category: product.category
            ? { title: product.category.title, slug: product.category.slug }
            : undefined,
    }));

    const rawCategories = await client.fetch(CATEGORIES_QUERY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categories: Category[] = rawCategories.map((category: any) => ({
        ...category
    }));

    if (products.length <= 0) {
        return (
            <div className="container">
                <h1>No se encontraron resultados para: <strong className="underline">{query}</strong></h1>
            </div>
        );
    }

    return (

        <div className="container">
            <div className="flex justify-center text-sm ">
                <ProductSidebar categories={categories} />

                <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Card product={product} key={product?.slug?.current ?? ''} />
                    ))}
                </div>

                <div className="hidden xl:block pl-3 absolute right-0 bg-black/30 py-4 rounded border-b border-l border-secondary w-[120px]">
                    <h2 className="text-gray-500 text-[12px] mb-2">Filtros</h2>

                    <ul className="grid gap-y-1 hover:text-accent">
                        <li> <Link href={'/'}>Menor precio</Link> </li>
                        <li> <Link href={'/'}>Mayor precio</Link> </li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 