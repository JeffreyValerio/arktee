"use server";

import prisma from "@/lib/prisma";

export const GetStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { stock: true },
    });

    return stock?.stock ?? 0;
  } catch (error) {
    return 0;
  }
};
