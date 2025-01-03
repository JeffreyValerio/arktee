import Link from "next/link";
import { Card, ProductTypeCard } from "@/components/products/Card";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { NoResults, ProductSidebar, ProductSidebarMobile } from "@/components";
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

    const currentCategory = products.length > 0 && products[0]?.category
        ? categories.find((cat) => cat.title === products[0]?.category?.title)
        : null;

    if (products.length <= 0) {
        return <NoResults params={{ query }} />
    }

    return (
        <div className="container">
            <div className="flex flex-col items-center text-sm">

                <div className="hidden lg:block">
                    <ProductSidebar categories={categories} />
                </div>
                <div className="lg:hidden w-full flex justify-center">
                    <ProductSidebarMobile categories={categories} />
                </div>

                <div className="flex justify-center items-center w-full">
                    <h1 className="heading">
                        {currentCategory
                            ? `Categoría ${currentCategory.title}`
                            : "Categoría no encontrada"}
                    </h1>
                </div>

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