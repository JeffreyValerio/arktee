"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChartColumnStacked,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { currencyFormat } from "@/lib/currency-format";
import { useState } from "react";
import { IProduct } from "@/interfaces/product.interface";

interface Props {
  product: IProduct;
}
export default function ProductCard({ product }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.ProductImage.map((img) => img.url);

  // Ahora solo un color disponible
  // const color = product.categoryId;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="shadow">
      <CardContent className="flex flex-col items-center justify-center rounded">
        <div className="w-full h-full shadow rounded mb-4">
          <Image
            src={images[imageIndex]}
            alt={product.title}
            className="size-full sm:size-full object-contain rounded"
            height={1000}
            width={1000}
          />
        </div>

        <div className="flex items-center justify-center gap-4 text-sm w-full mb-2">
          <button onClick={prevImage} className="hover:text-white">
            <ArrowLeft />
          </button>
          <span>{`${imageIndex + 1} of ${images.length}`}</span>
          <button onClick={nextImage} className="hover:text-white">
            <ArrowRight />
          </button>
        </div>

        <h2 className="font-bold text-center mb-2">
          <Link className="px-1" href={`../${product.slug}`}>
            {product.title}
          </Link>
        </h2>
        <p className="text-xs text-center mb-2">{product.description}</p>
        <p className="text-2xl font-bold mb-3">
          {currencyFormat(product.price)}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {/* Solo un color */}
          {/* <span
            className="w-4 h-4 rounded-full border border-white cursor-pointer"
            style={{ backgroundColor: color }}
            title={color.name}
          /> */}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-1">
        <Button variant={"ghost"} title="Lista de deseos">
          <Heart />
        </Button>
        <Button variant={"ghost"} title="Comparar">
          <ChartColumnStacked />
        </Button>
        <Button className="" title="Comprar por WhatsApp">
          <ShoppingBag /> Cotizar por WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
