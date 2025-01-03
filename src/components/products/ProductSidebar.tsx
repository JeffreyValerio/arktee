'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Category } from '@/sanity/types';

export function ProductSidebar({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams(); 
    const currentQuery = searchParams?.get('query');

    return (
        <div className="hidden xl:block px-4 absolute left-0 bg-black/30 py-4 rounded border-r border-b border-secondary w-[120px]">
            <h2 className="text-gray-500 text-[12px] mb-2">
                Colecciones
            </h2>
            <ul className="grid gap-y-1">
                {/* <li className={cn(
                    'w-fit',
                    currentPath === `/search/all` ? 'border-b' : ''
                )}>
                    <Link href={`/search`}>Todas</Link>
                </li> */}
                {categories.map((category: Category) => (
                    <li
                        key={category._id}
                        className={cn(
                            'w-fit',
                            currentQuery === `${category.slug?.current}` ? 'border-b' : ''
                        )}
                    >
                        <Link href={`/search?query=${category.slug?.current}`}>
                            {category.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}