"use server";

import prisma from "@/lib/prisma";

export const GetStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { stock: true },
    });

    return stock?.stock ?? 0;
  } catch (error) {
    console.error("Error fetching stock by slug:", error);
  }
};
