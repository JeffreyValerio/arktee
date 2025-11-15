"use client";

import { GetStockBySlug } from "@/actions";
import { Shirt } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number | undefined>(undefined);

  useEffect(() => {
    getStock();
  }, [slug]);
 
  const getStock = async () => {
    const stock = await GetStockBySlug(slug);
    setStock(stock);
  };

  if (!stock)
    return (
      <Skeleton className="animate-pulse bg-accent-foreground w-[120px] h-[20px]" />
    );

  return (
    <p className="text-sm flex gap-1 items-center text-accent-foreground">
      <Shirt size={18} />
      {stock ?? 0} {stock == 1 ? "disponible" : "disponibles"}
    </p>
  );
};