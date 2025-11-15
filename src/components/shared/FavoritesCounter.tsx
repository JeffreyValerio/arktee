"use client";

import { useFavoritesStore } from "@/store/favorites/favorites-store";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FavoritesCounter = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const favoritesCount = favorites.length;

  return (
    <div className="relative inline-block">
      <Link href="/favorites" aria-label="Ver favoritos">
        <Heart className="w-6 h-6" />
        {loaded && favoritesCount > 0 && (
          <span className="fade-in absolute -top-2 -right-2 bg-foreground text-white dark:text-black font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {favoritesCount}
          </span>
        )}
      </Link>
    </div>
  );
};
