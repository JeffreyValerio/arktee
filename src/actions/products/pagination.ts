"use server";
import prisma from "@/lib/prisma";
import { Gender, Size } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  sizes?: Size[];
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "oldest" | "name-asc" | "name-desc";
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
  gender,
  category,
  sizes,
  query,
  minPrice,
  maxPrice,
  sort,
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
    // ✅ Construcción del whereClause sin valores undefined
    const whereClause: import("@prisma/client").Prisma.ProductWhereInput = {
      ...(gender && { gender }),
      ...(categoryId && { categoryId }),
    };

    // 👀 Si hay query, filtramos por título, slug o tags
    if (query && query.trim().length > 0) {
      const terms = query.split(",").map((t) => t.trim().toLowerCase());

      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { slug: { contains: query, mode: "insensitive" } },
        { tags: { hasSome: terms } },
      ];
    }

    // 📏 Filtro por tallas
    if (sizes && sizes.length > 0) {
      whereClause.sizes = { hasSome: sizes };
    }

    // 💰 Filtro por precio
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) {
        whereClause.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        whereClause.price.lte = maxPrice;
      }
    }

    // 📊 Ordenamiento
    let orderBy: any = { createdAt: "desc" }; // Default: más recientes primero
    if (sort) {
      switch (sort) {
        case "price-asc":
          orderBy = { price: "asc" };
          break;
        case "price-desc":
          orderBy = { price: "desc" };
          break;
        case "newest":
          orderBy = { createdAt: "desc" };
          break;
        case "oldest":
          orderBy = { createdAt: "asc" };
          break;
        case "name-asc":
          orderBy = { title: "asc" };
          break;
        case "name-desc":
          orderBy = { title: "desc" };
          break;
      }
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: { url: true },
          },
          category: true,
        },
        where: whereClause,
        orderBy,
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products,
      totalCount,
    };
  } catch (error) {
    throw new Error(`❌ Error fetching products: ${error}`);
  }
};
