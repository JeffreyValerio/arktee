
import { Contact, Hero, ProductTypeCard, Slider } from "@/components";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams)?.query || "";
  const params = { search: query }; 

  const { data: rawProducts } = await sanityFetch({
    query: PRODUCTS_QUERY,
    params,
  }); 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: ProductTypeCard[] = rawProducts.map((product: any) => ({
    ...product,
    category: product.category
      ? { title: product.category.title, slug: product.category.slug }
      : undefined,
  }));

  return (
    <main>
      <Hero />
      
      <Slider products={products} />

      <Contact />
    </main>
  );
}
