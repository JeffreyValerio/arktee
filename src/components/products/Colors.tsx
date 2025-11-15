"use client";

import { Button } from "@/components/ui/button";
import { Size, Product } from "@prisma/client";
import { Sizes } from "@/components";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

interface ProductColorsProps {
  product: Product & { color: { hex: string; name: string } };
}

export const Colors = ({ product }: ProductColorsProps) => {
  return (
    <>
      {/* Color info */}
      <div>
        <h3 className="text-xs">Colores disponible</h3>
        <div className="mt-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full w-6 h-6 border ${
              product.color.hex === "#ffffff" ? "border-gray-300" : ""
            } ring-2 ring-primary`}
            style={{ backgroundColor: product.color.hex }}
            title={product.color.name}
            disabled
          />
        </div>
      </div>

      {/* Stock info */}
      <p className="mt-3 text-sm flex space-x-1 items-center">
        <PackageSearch size={18} fill={product.color.hex || "#000000"} />
        {product.stock > 0 ? (
          <span className="font-medium">
            {product.stock} unidades disponibles
          </span>
        ) : (
          <span className="text-red-600">Agotado</span>
        )}
      </p>

      {/* Size selector */}
      <div className="my-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Tallas</h3>
          <Link href="/" className="text-xs font-medium">
            Guía
          </Link>
        </div>

        <fieldset aria-label="Choose a size" className="mt-2">
          <div className="grid grid-cols-4 gap-4">
            {Object.values(Size).map((size) => (
              <Sizes
                key={size}
                size={size}
                isAvailable={product.sizes.includes(size)}
                onSizeChanged={() => {}}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </>
  );
};
