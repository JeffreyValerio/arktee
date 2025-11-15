"use server";

import prisma from "@/lib/prisma";

export async function incrementProductViews(slug: string) {
  try {
    await (prisma as any).product.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error("Error incrementing product views:", error);
    // No lanzamos error para no interrumpir la experiencia del usuario
  }
}

