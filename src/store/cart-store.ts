import { create } from "zustand";
import { PRODUCTS } from "../../assets/products";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};
//  define cart state type
type CartState = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  clearCart: () => void;
};

// define actions
const initialCartItem: CartItemType[] = [];
export const useCartStore = create<CartState>((set, get) => ({
  items: initialCartItem,
  addItem: (item: CartItemType) => {
    const existingItem = get().items.find((i) => i.id === item.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: Math.min(
                  i.quantity + item.quantity,
                  PRODUCTS.find((p) => p.id === item.id)?.maxQuantity ||
                    i.quantity
                ),
              }
            : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, item] }));
    }
  },

  removeItem: (id: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  incrementItem: (id: number) =>
    set((state) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return state;
      return {
        items: state.items.map((item) =>
          item.id == id && item.quantity < product.maxQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }),
  decrementItem: (id: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      ),
    })),
  getTotalPrice: () => {
    const { items } = get();
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
  clearCart: () => set({ items: [] }),
}));
