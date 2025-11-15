"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
      return {
        success: false,
        error: "El nombre de la categoría es requerido",
      };
    }

    // Verificar si la categoría ya existe
    const existingCategory = await prisma.category.findUnique({
      where: { name: name.trim() },
    });

    if (existingCategory) {
      return {
        success: false,
        error: "Ya existe una categoría con ese nombre",
      };
    }

    // Crear la categoría
    await prisma.category.create({
      data: {
        name: name.trim(),
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return {
      success: true,
      message: "Categoría creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: "Error al crear la categoría",
    };
  }
}

