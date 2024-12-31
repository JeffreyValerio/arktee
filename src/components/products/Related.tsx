import { RELATED_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { ProductTypeCard, Slider } from "..";
import { sanityFetch } from "@/sanity/lib/live";

interface Props {
    slug: string
    category: string
}
export const Related = async ({ slug, category }: Props) => {

    const params = { slug, category }

      const { data: rawProducts } = await sanityFetch({
        query: RELATED_PRODUCTS_QUERY,
        params,
      });
    
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const products: ProductTypeCard[] = rawProducts.map((product:any) => ({
        ...product,
        category: product.category
          ? { title: product.category.title, slug: product.category.slug }
          : undefined,
      }));
 
    return (
        <section className="mt-8">
            <h2 className="font-bold text-2xl">Productos relacionados</h2>

            <Slider products={products} />

        </section>
    )
}