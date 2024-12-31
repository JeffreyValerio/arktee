import { Icons, Related } from "@/components";
import { currencyFormat } from "@/lib/currency-format";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import Link from "next/link";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const slug = (await params).slug;
  const { data: product } = await sanityFetch({ query: PRODUCT_BY_ID_QUERY, params: { slug } });
  if (!product) {
    throw new Error('Product not found');
  }
  const backgroundImage = product.mainImage ? urlFor(product.mainImage).width(394).height(490).url() : ''

  return {
    title: product.title,
    description: product.description ?? '',
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    alternates: {
      canonical: product.slug ? `/product/${product.slug.current}` : '',
    },
    keywords: ['Producto en Costa Rica', 'comprar en Costa Rica', 'camisetas Costa Rica'], // Agregar las palabras clave relevantes del producto
    openGraph: {
      images: [backgroundImage],
      type: "website",
      siteName: "Arktee",
      url: product?.slug ? `${process.env.NEXT_PUBLIC_URL}/product/${product.slug.current}` : '',
      countryName: "Costa Rica",
      description: product.description ?? '',
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug;
  const { data: product } = await sanityFetch({ query: PRODUCT_BY_ID_QUERY, params: { slug } });

  const defaultImage = '/assets/img/tshirt.png';

  const backgroundImage = product?.mainImage
    ? urlFor(product.mainImage).width(394).height(490).url()
    : defaultImage;

  if (!product) {
    return (
      <div className="container">
        <h1>Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="grid md:grid-cols-3 rounded md:p-8">

        <div className="md:col-start-1 md:col-end-3 h-[500px] bg-center sm:bg-top bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        <div>
          <h1>{product.title}</h1>
          <p className="text-3xl mt-4 font-bold text-accent w-fit">{currencyFormat(product.price ?? 0)}</p>

          <p className="py-8">{product.description}</p>

          <h3 className="uppercase mt-4 mb-2 text-[12px] text-gray-500">Color</h3>
          <ul className="flex items-center gap-2 w-full py-2 text-sm rounded-full px-4 shadow shadow-accent drop-shadow">
            <li className="bg-primary hover:bg-accent rounded-full px-3">Azul</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">Verde</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">Rojo</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">Negro</li>
          </ul>

          <h3 className="uppercase mt-4 mb-2 text-[12px] text-gray-500">Tallas</h3>

          <ul className="flex justify-between items-center w-full py-2 text-sm rounded-full px-4 shadow shadow-accent">
            <li className="bg-primary hover:bg-accent rounded-full px-3">XS</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">S</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">M</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">L</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">XL</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">XXL</li>
            <li className="bg-primary hover:bg-accent rounded-full px-3">XXXL</li>
          </ul>

          <div className="flex mt-8">
            <Link
              className="flex justify-center items-center gap-2 font-bold bg-primary w-full py-2 px-4 text-center rounded-md"
              title="Escríbenos por WhatsApp"
              href={`https://wa.me/50671447395?text=Hola, me interesa saber más información sobre la camiseta: **${product.title}** %0Ahttps://www.arktee.com/product/${slug}`}
              target="_blank"
              rel="external nofollow">
              <Icons.whatsapp />
              Consultar por WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {product.category?.title && <Related slug={slug} category={product.category.title} />}

    </div>
  );
} 