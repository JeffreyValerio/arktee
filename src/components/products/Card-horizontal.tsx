"use client";

import {
  ChartColumnStacked,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { currencyFormat } from "@/lib/currency-format";
import Image from "next/image";

interface ProductDealHorizontalCardProps {
  title: string;
  price: number;
  rating: number;
  reviews: number;
  colors: string[];
  image: string;
}

export default function ProductCardHorizontal({
  title,
  price,
  rating,
  reviews,
  colors,
  image,
}: ProductDealHorizontalCardProps) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <Card className="shadow">
      <CardContent className="flex">
        <Image
          src={image}
          alt={title}
          className="w-1/3 h-full object-contain mr-6 rounded"
          width={300}
          height={400}
        />

        <div className="flex flex-col justify-between w-full">
          <div className="">
            <Link href={`/slug`} className="font-semibold text-xl">
              {title}
            </Link>

            <p className="text-3xl font-bold mb-6 text-accent-foreground">
              {currencyFormat(price)}
            </p>

            <div className="flex items-center text-sm mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  fill="yellow"
                  size={18}
                  key={i}
                  className={`mr-0.5 ${
                    i < rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-1">({reviews.toLocaleString()} Reviews)</span>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
              <div>
                <label className="block mb-1 text-muted-foreground">
                  Color
                </label>
                <div className="flex gap-2">
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedColor === i
                          ? "border-primary dark:border-white"
                          : "border-gray-500"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-400">Cantidad</label>
                <div className="flex items-center border border-gray-600 rounded px-2 py-1">
                  <button
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                    className="px-2"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-2">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-2">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-1">
            <Button variant={"ghost"} title="Lista de deseos">
              <Heart />
            </Button>
            <Button variant={"ghost"} title="Comparar">
              <ChartColumnStacked />
            </Button>
            <Button className="flex-1" title="Comprar por WhatsApp">
              <ShoppingBag /> Comprar por WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
