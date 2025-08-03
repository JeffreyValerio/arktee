"use server";

import prisma from "@/lib/prisma";

export const GetCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            Product: true,
          },
        },
      },
    });

    return categories.map((cat) => ({
      ...cat,
      productCount: cat._count.Product,
    }));
  } catch (error) {
    throw new Error(`${error}`);
  }
};
