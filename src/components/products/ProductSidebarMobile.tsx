'use client';

import { cn } from "@/lib/utils";
import { Category } from "@/sanity/types";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductSidebarMobile({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams(); // Para obtener los parámetros de la URL
    const currentQuery = searchParams?.get('query'); // Obtener el parámetro "query"

    const router = useRouter();

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSlug = event.target.value;
        if (selectedSlug) {
            router.push(`/search?query=${selectedSlug}`);
        }
    };

    return (
        <select
            name="categories"
            id="categories"
            className="bg-primary w-full py-2 text-center rounded"
            onChange={handleCategoryChange}
            value={categories.find(category => `/search/${category.slug?.current}` === currentQuery)?.slug?.current || ''}
        >
            <option value={``} disabled>
                Seleccione una categoría
            </option>
            {categories.map((category: Category) => (
                <option
                    key={category._id}
                    value={category.slug?.current}
                    className={cn(
                        'w-fit',
                        currentQuery === `${category.slug?.current}` ? 'border-b' : ''
                    )}
                >
                    {category.title}
                </option>
            ))}
        </select>
    );
}
