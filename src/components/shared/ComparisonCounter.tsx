"use client";

import { useComparisonStore } from "@/store/comparison/comparison-store";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ComparisonCounter = () => {
  const comparison = useComparisonStore((state) => state.comparison);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const comparisonCount = comparison.length;

  return (
    <div className="relative inline-block">
      <Link href="/compare" aria-label="Comparar productos">
        <BarChart3 className="w-6 h-6" />
        {loaded && comparisonCount > 0 && (
          <span className="fade-in absolute -top-2 -right-2 bg-foreground text-white dark:text-black font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {comparisonCount}
          </span>
        )}
      </Link>
    </div>
  );
};
