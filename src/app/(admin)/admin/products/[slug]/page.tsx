export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { ProductForm } from "../ui/product-form";
import { GetProductBySlug } from "@/actions/products/getBySlug";
import { GetCategories } from "@/actions";

export default async function ProductEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const categories = await GetCategories();

  // Si la ruta es /admin/products/new => formulario vacío
  if (slug === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Nuevo Producto
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Crea un nuevo producto para tu catálogo
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <ProductForm categories={categories} />
        </div>
      </div>
    );
  }

  // Si no es "new", buscamos el producto
  const product = await GetProductBySlug({ slug });

  if (!product) {
    redirect("/admin/products");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Editar Producto
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Modifica los detalles del producto
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}