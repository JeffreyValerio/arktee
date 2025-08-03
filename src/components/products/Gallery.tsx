import Image from "next/image";
import React from "react";

type Props = {
  images: { url: string; alt?: string }[];
};

export const Gallery = ({ images }: Props) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Imagen principal */}
      <Image
        src={images[0].url}
        alt={images[0].alt ?? "Imagen principal"}
        className="size-full rounded object-cover md:block"
        width={1000}
        height={1000}
      />

      {/* Imágenes secundarias (si existen) */}
      <div className="hidden md:grid md:grid-cols-1 gap-4">
        {images.slice(1, 3).map((img, index) => (
          <Image
            key={index}
            src={img.url}
            alt={img.alt ?? `Imagen ${index + 2}`}
            className="aspect-3/2 w-full rounded object-cover"
            width={1000}
            height={1000}
          />
        ))}
      </div>
    </div>
  );
};
