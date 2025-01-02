import React from 'react'
import { Card, ProductTypeCard } from '..'
import { sanityFetch } from '@/sanity/lib/live';
import { PRODUCTS_QUERY } from '@/sanity/lib/queries';

export const NoResults = async ({ params }: { params: { query: string } }) => {

    const { data: rawProducts } = await sanityFetch({
        query: PRODUCTS_QUERY,
        params: { search: '' },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: ProductTypeCard[] = rawProducts.map((product: any) => ({
        ...product,
        category: product.category
            ? { title: product.category.title, slug: product.category.slug }
            : undefined,
    }));

    return (
        <section className='container'>

            <div className="grid justify-center items-center mt-8">
                <h1 className='heading mb-4'>No se encontraron resultados para tu búsqueda: <span className="underline">{params.query}</span></h1>
            </div>
 
            <div className="mb-8 text-sm">
                <p className='flex items-center gap-2 mb-4 font-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    Recomendaciones :
                </p> 
                <ul className='pl-4 list-disc'>
                    <li>Verifica la ortografía de tu palabra clave.</li>
                    <li>Prueba con palabras o selecciones alternativas.</li>
                    <li>Intenta ingresar una palabra clave más genérica.</li>
                    <li>Intenta usar menos palabras clave.</li>
                </ul>
            </div>

            <div className="mb-8">
                <p className='text-xl'>Te podría interesar</p>
            </div>

            <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                    <Card product={product} key={product?.slug?.current ?? ''} />
                ))}
            </div>
        </section>
    )
} 
