import type { CartProduct } from "@/interfaces/cart-product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInfo: () => {
    numberOfItems: number;
    subTotal: number;
    tax: number; // IVA
    total: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // METHODS
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        console.log(cart);

        // 1. revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. el producto existe por talla... incrementa cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCart });
      },

      getSummaryInfo: () => {
        const { cart } = get();
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.13);

        const numberOfItems = cart.reduce((total, item) => total + item.quantity, 0);
        const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const tax = subTotal * taxRate;
        const total = subTotal + tax;
        return {
          numberOfItems,
          subTotal,
          tax,
          total,
        };
      },

      clearCart: () => {
        set({ cart: [] });
      }
    }),

    { name: "shopping-cart" }
  )
);