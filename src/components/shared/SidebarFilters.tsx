"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { X, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarFiltersProps {
  categories: { id: string; name: string; productCount?: number }[];
  availableSizes: string[];
  hideCategoryFilter?: boolean;
}

export default function SidebarFilters({
  categories,
  availableSizes,
  hideCategoryFilter = false,
}: SidebarFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados iniciales desde la URL
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.getAll("size")
  );
  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );
  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );

  // 🔁 Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Categoría
    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");

    // Tallas
    params.delete("size");
    selectedSizes.forEach((s) => params.append("size", s));

    // Precio
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    // Ordenamiento
    if (sort) params.set("sort", sort);
    else params.delete("sort");

    params.set("page", "1"); // reset de paginación al aplicar filtro

    const nextQuery = `?${params.toString()}`;
    const currentQuery = `?${searchParams.toString()}`;
    if (nextQuery !== currentQuery) {
      router.push(nextQuery);
    }
  }, [selectedCategory, selectedSizes, minPrice, maxPrice, sort, router, searchParams]);

  // ✅ Alternar selección múltiple de tallas
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedSizes.length > 0 ||
    minPrice ||
    maxPrice ||
    sort;

  return (
    <aside className="w-full lg:w-72 border-r border-gray-200 dark:border-gray-700 pr-4 lg:pr-6">
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Filtros
            </h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-3 w-3 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

        <Separator />

        {/* Ordenamiento */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Ordenar por
          </label>
          <Select value={sort || undefined} onValueChange={(value) => setSort(value === "default" ? "" : value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar orden" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Por defecto</SelectItem>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="oldest">Más antiguos</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!hideCategoryFilter && (
          <>
            <Separator />

            {/* CATEGORÍAS */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categoría
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition-all ${
                    !selectedCategory
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Todas las categorías
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.name ? "" : cat.name
                      )
                    }
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-all flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.productCount !== undefined && (
                      <span className={`text-xs ${
                        selectedCategory === cat.name
                          ? "text-primary-foreground/80"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        ({cat.productCount})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />
          </>
        )}

        {/* TALLAS */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Tallas
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${
                  selectedSizes.includes(size)
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* PRECIO */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Rango de Precio
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Mínimo
              </label>
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-9 text-sm"
                min="0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Máximo
              </label>
              <Input
                type="number"
                placeholder="∞"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-9 text-sm"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
