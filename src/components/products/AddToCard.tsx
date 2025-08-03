"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChartColumnStacked, Heart, ShoppingBag } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import { QuantitySelector } from "./QuantitySelector";
import { Size } from "@prisma/client";
import { Sizes } from "./Sizes";
import { StockLabel } from "./StockLabel";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";
import { CartProduct } from "@/interfaces/cart-product.interface";

interface Props {
  product: IProduct;
}

const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const AddToCard = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!selectedSize) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.ProductImage[0].url,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSelectedSize(undefined);

    console.log({ selectedSize, quantity, product });
  };

  return (
    <div>
      <div className="my-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            maxStock={product.stock}
            onQuantityChanged={setQuantity}
          />

          <StockLabel slug={product.slug} />
        </div>

        {posted && !selectedSize && (
          <span className="mt-2 text-red-600 text-sm">
            Debe seleccionar una talla *
          </span>
        )}
        <div className="flex justify-between items-center text-sm">
          <p>Tallas</p>
          <Link href={"/"} className="text-primary hover:text-white px-2">
            Guía
          </Link>
        </div>
        <div className="grid grid-cols-4 text-sm gap-2 items-center flex-wrap">
          {allSizes.map((size) => {
            const isAvailable = product?.sizes?.includes(size) ?? false;
            return (
              <Sizes
                selectedSize={selectedSize}
                key={size}
                size={size}
                isAvailable={isAvailable}
                onSizeChanged={setSelectedSize}
              />
            );
          })}
        </div>
      </div>

      <div className="flex w-full gap-1">
        <div className="flex items-center gap-1">
          <Button variant={"ghost"} title="Lista de deseos">
            <Heart />
          </Button>
          <Button variant={"ghost"} title="Comparar">
            <ChartColumnStacked />
          </Button>
        </div>

        <Button
          className="flex-1 cursor-pointer"
          title="Comprar por WhatsApp"
          onClick={addToCart}
        >
          <ShoppingBag />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};
