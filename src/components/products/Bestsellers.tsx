import Link from "next/link";
import ProductCardHorizontal from "./Card-horizontal";

export const Bestsellers = () => {
  return (
    <section className="py-16">
      <div className="max-width">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-3xl sm:text-4xl">Lo más vendido</h2>
          <Link href="/">
            Ver más →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4 justify-between">
          <ProductCardHorizontal
            title="Camiseta personalizada de Floricienta"
            price={45}
            rating={5}
            reviews={0}
            colors={["#0F172A", "#2563EB"]}
            image="https://placehold.co/300x400.png"
          />
          <ProductCardHorizontal
            title="Camiseta personalizada de Bad Bunny"
            price={499}
            rating={5}
            reviews={0}
            colors={["#0F172A", "gray"]}
            image="https://placehold.co/300x400.png"
          />
        </div>
      </div>
    </section>
  );
};