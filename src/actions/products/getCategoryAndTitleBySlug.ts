"use server";

import prisma from "@/lib/prisma";

export const GetCategoryAndTitleBySlug = async (
  slug: string
): Promise<{ category: string; title: string } | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      select: {
        category: {
          select: {
            name: true,
          },
        },
        title: true,
      },
    });

    if (!product || !product.category) return null;

    return {
      category: product.category.name,
      title: product.title,
    };
  } catch (error) {
    console.error("Error fetching product for breadcrumb:", error);
    return null;
  }
};
