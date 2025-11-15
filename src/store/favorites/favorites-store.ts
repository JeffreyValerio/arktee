import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (productId: string) => {
        const { favorites } = get();
        if (!favorites.includes(productId)) {
          set({ favorites: [...favorites, productId] });
        }
      },
      
      removeFromFavorites: (productId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(id => id !== productId) });
      },
      
      isFavorite: (productId: string) => {
        const { favorites } = get();
        return favorites.includes(productId);
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
