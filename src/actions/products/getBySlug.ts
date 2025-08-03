"use server";

import prisma from "@/lib/prisma";

type Props = {
  slug: string;
};
export const GetProductBySlug = async ({ slug }: Props) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: true,
        category: true,
        color: true,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((img) => img.url),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};