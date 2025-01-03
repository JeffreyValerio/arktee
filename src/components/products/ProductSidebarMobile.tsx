'use client';

import { cn } from "@/lib/utils";
import { Category } from "@/sanity/types";
import { usePathname, useRouter } from "next/navigation";

export function ProductSidebarMobile({ categories }: { categories: Category[] }) {
    const currentPath = usePathname();
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
            value={categories.find(category => `/search/${category.slug?.current}` === currentPath)?.slug?.current || ''}
        >
            <option value="" disabled>
                Seleccione una categoría
            </option>
            {categories.map((category: Category) => (
                <option
                    key={category._id}
                    value={category.slug?.current}
                    className={cn( 
                        '',
                        currentPath === `/search/${category.slug?.current}` ? 'border-b' : ''
                    )}
                >
                    {category.title}
                </option>
            ))}
        </select>
    );
}
