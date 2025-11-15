"use server";

import prisma from "@/lib/prisma";

interface Props {
  ids: string[];
}

export const GetProductsByIds = async ({ ids }: Props) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};
