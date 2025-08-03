"use client";

import { Card, CardContent } from "@/components/ui/card";
import { currencyFormat } from "@/lib/currency-format";
import { useCartStore } from "@/store/cart/cart-store";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const [qty, setQty] = useState(1);
  return (
    <div className="bg-secondary p-4 rounded-md">
      {loaded && productInCart.map((product: any) => (
        <div key={`${product.slug}-${product.size}`} className="mb-4">
          <div className="flex">
            <Image
              src={product.image} 
              alt={product.title}
              className="w-[150px] h-[150px] object-contain mr-6 rounded"
              width={150}
              height={150}
            />

            <div className="flex flex-col justify-between w-full">
              <div className="">
                <Link href={`${product.slug}`} className="font-semibold">
                  {product.size} - {product.title}
                </Link>

                <p className="font-bold mb-6 text-accent-foreground">
                  {currencyFormat(product.price)}
                </p>
              </div>

              <div className="w-fit">
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
        </div>
      ))}
    </div>
  );
};
