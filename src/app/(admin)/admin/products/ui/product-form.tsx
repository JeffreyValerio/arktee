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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { 
  Trash2, 
  Upload, 
  Package, 
  DollarSign, 
  Tag, 
  Image as ImageIcon,
  Save,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { createUpdateProduct, deleteProduct, deleteProductImage } from "@/actions";
import { useToaster } from "@/components/providers/ToastifyContext";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
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
        showToast(`El producto no se pudo ${product?.id ? "actualizar" : "crear"}: ${message}`, {
          type: "error",
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
    } catch (error) {
      showToast("Ocurrió un error inesperado. Por favor, intenta nuevamente.", {
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal -> datos del producto */}
        <div className="lg:col-span-2 lg:pr-4">
          {/* Información básica */}
          <Card className="mt-0">
            <CardHeader className="pt-6">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>
                Datos principales del producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div>
                <label className="block mb-2.5 text-sm font-medium flex items-center gap-2">
                  Nombre del producto
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("title", { required: "El nombre es obligatorio" })}
                  placeholder="Ej: Camiseta Premium"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                  Descripción
                  <span className="text-red-500">*</span>
                </label>
                <Textarea
                  {...register("description", {
                    required: "La descripción es obligatoria",
                    minLength: {
                      value: 20,
                      message: "La descripción debe tener al menos 20 caracteres"
                    }
                  })}
                  placeholder="Describe las características y beneficios del producto..."
                  rows={5}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Precio y Stock */}
          <Card className="mt-6">
            <CardHeader className="pt-6">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Precio y Inventario
              </CardTitle>
              <CardDescription>
                Define el precio y la cantidad disponible
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    Precio (₡)
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₡
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: "El precio es obligatorio",
                        min: { value: 0, message: "El precio no puede ser negativo" },
                      })}
                      placeholder="0.00"
                      className={`pl-8 ${errors.price ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    Stock disponible
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    {...register("stock", {
                      required: "El stock es obligatorio",
                      min: { value: 0, message: "El stock no puede ser negativo" },
                    })}
                    placeholder="0"
                    className={errors.stock ? "border-red-500" : ""}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categorización */}
          <Card className="mt-6">
            <CardHeader className="pt-6">
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categorización
              </CardTitle>
              <CardDescription>
                Clasifica el producto por género y categoría
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    Género
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "El género es obligatorio" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                          <SelectValue placeholder="Seleccione un género" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Género</SelectLabel>
                            <SelectItem value="men">👔 Hombre</SelectItem>
                            <SelectItem value="women">👗 Mujer</SelectItem>
                            <SelectItem value="kid">👶 Niño</SelectItem>
                            <SelectItem value="unisex">👥 Unisex</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    Categoría
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "La categoría es obligatoria" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categorías</SelectLabel>
                            {categories && categories.length > 0 ? (
                              categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                No hay categorías disponibles
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoryId && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                  Etiquetas
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("tags", { required: "Las etiquetas son obligatorias" })}
                  placeholder="Ej: verano, casual, premium (separadas por coma)"
                  className={errors.tags ? "border-red-500" : ""}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.tags.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Separa las etiquetas con comas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tallas */}
          <Card className="mt-6">
            <CardHeader className="pt-6">
              <CardTitle>Tallas Disponibles</CardTitle>
              <CardDescription>
                Selecciona las tallas que estarán disponibles para este producto
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {allSizes.map((size) => {
                  const isSelected = getValues("sizes").includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onSizeChange(size)}
                      className={clsx(
                        "relative h-12 rounded-lg border-2 font-medium transition-all duration-200",
                        "hover:scale-105 active:scale-95",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-background border-border hover:border-primary/50"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {getValues("sizes").length === 0 && (
                <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Selecciona al menos una talla
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral -> imágenes */}
        <div className="lg:pl-4">
          <Card className="mt-0">
            <CardHeader className="pt-6">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Imágenes del Producto
              </CardTitle>
              <CardDescription>
                Sube las imágenes del producto (mínimo 1)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              {/* Input oculto para subir imágenes */}
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("images", {
                  validate: () => {
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
                className={clsx(
                  "flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-primary hover:bg-primary/5",
                  errors.images ? "border-red-500" : "border-border"
                )}
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Arrastra y suelta imágenes aquí
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    o haz clic para seleccionar
                  </p>
                </div>
              </label>

              {/* Mensaje de error de validación */}
              {errors.images && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.images.message as string}
                </p>
              )}

              {/* Previsualización de imágenes */}
              {(newImages.length > 0 || (product?.ProductImage?.length ?? 0) > 0) && (
                <div className="space-y-3">
                  <Separator />
                  <div className="grid grid-cols-2 gap-3">
                    {/* Imágenes nuevas */}
                    {newImages.map((file, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            setNewImages((prev) => prev.filter((_, i) => i !== index));
                          }}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Nuevo
                        </div>
                      </div>
                    ))}

                    {/* Imágenes existentes */}
                    {product?.ProductImage?.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={image.url}
                            alt={`Producto ${product.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm(
                              "¿Desea eliminar esta imagen?"
                            );
                            if (confirmed) {
                              showToast("La imagen fue eliminada con éxito", {
                                type: "success",
                                duration: 5000,
                              });
                              deleteProductImage(image.id ?? 0, image.url);
                            } else {
                              showToast("La eliminación de la imagen fue cancelada", {
                                type: "info",
                                duration: 5000,
                              });
                            }
                          }}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botones de acción */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.replace("/admin/products")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancelar
            </Button>

            {product?.id && (
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    "¿Estás seguro de que deseas eliminar este producto y todas sus imágenes? Esta acción no se puede deshacer."
                  );
                  if (confirmed && product.id) {
                    deleteProduct(product.id);
                    showToast("El producto fue eliminado con éxito", {
                      type: "success",
                      duration: 5000,
                    });
                    router.replace("/admin/products");
                  }
                }}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar Producto
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {product?.id ? "Guardar Cambios" : "Crear Producto"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
