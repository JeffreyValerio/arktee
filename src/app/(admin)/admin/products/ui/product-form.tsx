"use client";

import { Button } from "@/components/ui/button";
import { Category, IProduct, ProductImage } from "@/interfaces/product.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Size } from "@/interfaces/cart-product.interface";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { createUpdateProduct, deleteProduct, deleteProductImage } from "@/actions";
import { useToaster } from "@/components/providers/ToastifyContext";
import { useState } from "react";

interface ProductFormProps {
  product?: Partial<IProduct> & { ProductImage?: ProductImage[] };
  categories?: Category[];
}

const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex" | undefined;
  categoryId: string;
  images?: FileList;
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags?.join(", ") || "",
      sizes: product?.sizes ?? [],
      gender: (product?.gender as FormInputs["gender"]) || "unisex",
      categoryId: product?.categoryId || "",
      images: undefined
    },
    mode: "onChange",
  });

  watch("sizes");

  const router = useRouter();
  const { showToast } = useToaster();

  // Estado para imágenes nuevas
  const [newImages, setNewImages] = useState<File[]>([]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { ...productToSave } = data;

    const formData = new FormData();
    if (product?.id) {
      formData.append("id", product?.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("stock", productToSave.stock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender ?? "unisex");

    // Adjuntar imágenes nuevas
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    const { ok, product: updatedProduct, message } = await createUpdateProduct(formData);

    if (!ok) {
      showToast(`El producto no se pudo actualizar ${message}`, {
        type: "warning",
      });
    } else {
      router.replace(`/admin/products/${updatedProduct?.slug}`);
      showToast(
        `El producto fue ${updatedProduct?.id ? "actualizado" : "creado"} con éxito.`,
        {
          type: "success",
        }
      );
    }
  };

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes"));

    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }

    setValue("sizes", Array.from(sizes));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda -> datos */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-medium">Nombre</label>
            <Input
              {...register("title", { required: "El nombre es obligatorio" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium">
              URL autogenerada
            </label>
            <Input {...register("slug")} disabled />
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium">Descripción</label>
            <Textarea
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* PRECIO y STOCK */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-xs font-medium">Precio</label>
              <Input
                type="number"
                {...register("price", {
                  required: "El precio es obligatorio",
                  min: { value: 0, message: "El precio no puede ser negativo" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium">Stock</label>
              <Input
                type="number"
                {...register("stock", {
                  required: "El stock es obligatorio",
                  min: { value: 0, message: "El stock no puede ser negativo" },
                })}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* TAGS */}
          <div>
            <label className="block mb-1 text-xs font-medium">
              Etiquetas (separadas por coma)
            </label>
            <Input
              {...register("tags", { required: "Las etiquetas son obligatorias" })}
            />
            {errors.tags && (
              <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* SIZES */}
          <div>
            <label className="block mb-1 text-xs font-medium">Tallas</label>
            <div className="grid grid-cols-7 text-xs gap-2 items-center flex-wrap">
              {allSizes.map((size) => (
                <div
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={clsx(
                    "cursor-pointer text-sm font-medium rounded flex justify-center items-center py-2 px-4 border",
                    { "bg-primary text-white": getValues("sizes").includes(size) }
                  )}
                >
                  <label>{size}</label>
                </div>
              ))}
            </div>
          </div>

          {/* GÉNERO Y CATEGORÍAS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-xs font-medium">Género</label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "El género es obligatorio" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Género</SelectLabel>
                        <SelectItem value="men">Hombre</SelectItem>
                        <SelectItem value="women">Mujer</SelectItem>
                        <SelectItem value="kid">Niño</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium">Categorías</label>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "La categoría es obligatoria" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          {/* BOTONES */}
          <div className="grid grid-cols-3 gap-x-2">
            <Button type="submit">
              {product ? "Guardar cambios" : "Crear producto"}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={() => router.replace("/admin/products")}
            >
              Regresar a productos
            </Button>

            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  `¿Desea eliminar el productos y sus imágenes?`
                )
                if (confirmed) {
                  showToast(`El producto fue eliminado con éxito`, {
                    type: 'success',
                    duration: 5000
                  })
                  deleteProduct(product?.id ?? "")
                } else {
                  showToast(`La eliminación del producto fue cancelada`, {
                    type: 'warning',
                    duration: 5000
                  })
                }
              }}
              disabled={!product?.id}
            >
              Eliminar producto
            </Button>
          </div>
        </div>

        {/* Columna derecha -> fotos */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Imágenes del producto</h3>

          {/* Input oculto para subir imágenes */}
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images", {
              validate: () => {
                // Valida si hay imágenes nuevas o ya existentes
                if ((product?.ProductImage?.length ?? 0) + newImages.length === 0) {
                  return "Debes subir al menos una imagen";
                }
                return true;
              },
            })}
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files);
                setNewImages((prev) => [...prev, ...files]);
              }
            }}
            className="hidden"
            id="images"
          />

          {/* Botón para abrir file input */}
          <label
            htmlFor="images"
            className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-500"
          >
            <p className="text-xs">Arrastra y suelta imágenes aquí</p>
            <p className="text-xs">o haz clic para seleccionar</p>
          </label>

          {/* Mensaje de error de validación */}
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">
              {errors.images.message as string}
            </p>
          )}

          {/* Previsualización de imágenes nuevas */}
          <div className="grid grid-cols-3 gap-2">
            {newImages.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded shadow-md"
                  width={300}
                  height={300}
                />
                <Button
                  type="button"
                  onClick={() => {
                    setNewImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                  variant="outline"
                  className="w-full mt-1"
                  size="sm"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}

            {/* Previsualización de imágenes existentes */}
            {product?.ProductImage?.map((image) => (
              <div key={image.id}>
                <Image
                  src={image.url}
                  alt={`Producto ${product.title}`}
                  className="w-full h-24 object-cover rounded shadow-md"
                  width={300}
                  height={300}
                />
                <Button
                  type="button"
                  onClick={
                    () => {
                      const confirmed = window.confirm(
                        `¿Desea eliminar la imagen?`
                      )
                      if (confirmed) {
                        showToast(`La imagen fue eliminada con éxito`, {
                          type: 'success',
                          duration: 5000
                        })
                        deleteProductImage(image.id ?? 0, image.url)
                      } else {
                        showToast(`La eliminación de la imagen fue cancelada`, {
                          type: 'warning',
                          duration: 5000
                        })
                      }
                    }
                  }
                  variant="outline"
                  className="w-full mt-1"
                  size="sm"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </form >
  );
}
