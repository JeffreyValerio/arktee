"use server";

import prisma from "@/lib/prisma";

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        ProductImage: true,
        category: true
      },
    });

    return product;
  } catch (error) { 
    console.error(error);
    return null;
  }
};