"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface Props {
  productId: string;
  categoryId: string;
  gender: Gender;
  limit?: number;
}

export const GetRelatedProducts = async ({ 
  productId, 
  categoryId, 
  gender, 
  limit = 4 
}: Props) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: productId } },
          { categoryId },
          { gender },
        ],
      },
      take: limit,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true },
        },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

