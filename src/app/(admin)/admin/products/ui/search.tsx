"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductSearch({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/products?query=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setQuery("");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Buscar Productos
        </h3>
        {query && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearSearch}
            className="flex items-center gap-2"
          >
            <X size={14} />
            Limpiar
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, descripción, género..."
            className="pl-10"
          />
        </div>
        <Button type="submit" className="flex items-center gap-2">
          <Search size={16} />
          Buscar
        </Button>
      </form>
      
      {query && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando resultados para: <span className="font-medium">&quot;{query}&quot;</span>
        </div>
      )}
    </div>
  );
}
