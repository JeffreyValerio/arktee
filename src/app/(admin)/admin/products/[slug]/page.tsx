export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { ProductForm } from "../ui/product-form";
import { GetProductBySlug } from "@/actions/products/getBySlug";
import { GetCategories } from "@/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Edit } from "lucide-react";

export default async function ProductEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const categories = await GetCategories();

  // Si la ruta es /admin/products/new => formulario vacío
  if (slug === "new") {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Nuevo Producto
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Completa el formulario para agregar un nuevo producto a tu catálogo
            </p>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6 md:p-8">
            <ProductForm categories={categories} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si no es "new", buscamos el producto
  const product = await GetProductBySlug({ slug });

  if (!product) {
    redirect("/admin/products");
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Edit className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Editar Producto
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Modifica los detalles del producto: {product.title}
          </p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6 md:p-8">
          <ProductForm product={product} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}