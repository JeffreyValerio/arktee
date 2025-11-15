import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ComparisonState {
  comparison: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
  canAddToComparison: () => boolean;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      comparison: [],
      
      addToComparison: (productId: string) => {
        const { comparison } = get();
        if (comparison.length >= 4) {
          throw new Error('Solo puedes comparar hasta 4 productos');
        }
        if (!comparison.includes(productId)) {
          set({ comparison: [...comparison, productId] });
        }
      },
      
      removeFromComparison: (productId: string) => {
        const { comparison } = get();
        set({ comparison: comparison.filter(id => id !== productId) });
      },
      
      isInComparison: (productId: string) => {
        const { comparison } = get();
        return comparison.includes(productId);
      },
      
      clearComparison: () => {
        set({ comparison: [] });
      },
      
      canAddToComparison: () => {
        const { comparison } = get();
        return comparison.length < 4;
      },
    }),
    {
      name: 'comparison-storage',
    }
  )
);
