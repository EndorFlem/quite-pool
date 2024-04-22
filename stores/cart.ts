import { create } from "zustand";
import { ProductProps } from "@/components/ProductCard";

type CartList = {
  [name: string]: { count: number; product: ProductProps };
};

type CartState = {
  totalPrice: number;
  products: CartList;
  addProduct: (product: ProductProps) => void;
  removeProduct: (product: ProductProps) => void;
  deleteProduct: (name: string) => void;
};

export const useCart = create<CartState>((set) => ({
  totalPrice: 0,
  products: {},
  addProduct: (product: ProductProps) => {
    function updateProductList(products: CartList) {
      let newLlist: CartList = products;
      if (!(product.name in products)) {
        newLlist[product.name] = { count: 1, product: product };
      } else {
        newLlist[product.name].count += 1;
      }

      return newLlist;
    }

    set((state) => ({
      products: updateProductList(state.products),
      totalPrice: state.totalPrice + product.price,
    }));
  },
  removeProduct: (product: ProductProps) => {
    function updateProductList(products: CartList) {
      let newLlist: CartList = products;
      if (!products[product.name]) return newLlist;

      if (products[product.name].count == 1) {
        delete newLlist[product.name];
      } else {
        newLlist[product.name].count -= 1;
      }

      return newLlist;
    }

    set((state) => ({
      products: updateProductList(state.products),
      totalPrice: state.totalPrice - product.price,
    }));
  },
  deleteProduct: (name: string) => {
    function updateProductList(products: CartList) {
      let newList = products;
      delete newList[name];

      return newList;
    }

    set((state) => ({
      totalPrice:
        state.totalPrice -
        state.products[name].count * state.products[name].product.price,
      products: updateProductList(state.products),
    }));
  },
}));
