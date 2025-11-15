"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { incrementProductViews } from "@/actions/products/increment-views";

interface ProductViewsProps {
  slug: string;
  initialViews: number;
}

export function ProductViews({ slug, initialViews }: ProductViewsProps) {
  const [views, setViews] = useState(initialViews);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Solo incrementar una vez por sesión
    if (!hasIncremented) {
      incrementProductViews(slug);
      setHasIncremented(true);
      setViews((prev) => prev + 1);
    }
  }, [slug, hasIncremented]);

  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
        <Eye size={12} className="sm:w-3.5 sm:h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <span className="font-medium whitespace-nowrap">
          {formatViews(views)} {views === 1 ? "vista" : "vistas"}
        </span>
      </div>
    </div>
  );
}

