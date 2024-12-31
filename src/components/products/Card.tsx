import { currencyFormat } from "@/lib/currency-format";
import { Product } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import styles from './card.module.css'
 
export type ProductTypeCard = Partial<Omit<Product, "category">> & {
    category?: { title?: string; slug?: { current?: string } };
};

export const Card = ({ product }: { product: ProductTypeCard }) => {

    const defaultImage = '/assets/img/placeholder.png';

    const backgroundImage = product.mainImage
        ? urlFor(product.mainImage).width(394).height(490).url()
        : defaultImage;

    return (
        <div
            className={styles.card}
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Link href={`../product/${product.slug?.current}`} title={product.title} passHref>
                <div className="bg-background absolute bottom-0 flex hover:text-white items-center gap-2 rounded-full pl-2 py-[2px] pr-[2px] mb-4">
                    <h2 className='text-sm'>{product.title}</h2>
                    <h3 className='bg-accent rounded-full px-2 text-sm py-2 font-bold hover:text-white'>{currencyFormat(product.price ?? 0)}</h3>
                </div>
            </Link>
            <div className='top-0 absolute rounded-full bg-background px-2 mt-2 text-[12px] uppercase'>
                <Link href={`../search?query=${product.category?.slug?.current}`} className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                    {product.category?.title}
                </Link>
            </div>
        </div>
    )
}
