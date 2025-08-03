"use server";

import prisma from "@/lib/prisma";

export const GetProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        ProductImage: true,
        color: true
      },
    });

    const totalProducts = await prisma.product.count();

    return {
      products,
      totalProducts,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
