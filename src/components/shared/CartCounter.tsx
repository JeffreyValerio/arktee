"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CartCounter = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative inline-block">
      <Link href={"/cart"}>
        <ShoppingBag className="w-6 h-6" />
        {loaded && totalItemsInCart > 0 && (
          <span className="absolute -top-2 -right-2 bg-foreground text-white dark:text-black font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItemsInCart}
          </span>
        )}
      </Link>
    </div>
  );
};
