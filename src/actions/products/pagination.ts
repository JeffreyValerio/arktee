"use server";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  category?: string;
}
export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
  gender,
  category,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  let categoryId: string | undefined = undefined;

  if (category) {
    const categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryRecord) {
      throw new Error(`Category "${category}" not found`);
    }

    categoryId = categoryRecord.id;
  }

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        category: true,
      },
      where: {
        gender,
        categoryId,
      },
    });

    const totalCount = await prisma.product.count({
      where: {
        gender,
        categoryId,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
      })),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
