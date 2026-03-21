import { create } from "zustand";
import type { CategoryType, Product } from "../types";
import { products } from "../data/mockData";

type KioskStoreActions = {
  setCurrentProductType: (productType: CategoryType) => void;
  getProductsByCategory: (category: CategoryType) => void;
};

type KioskStoreState = {
  fetchedProducts: Product[];
  currentProductType: CategoryType;
};

export const useKioskStore = create<KioskStoreActions & KioskStoreState>((set, get) => ({
  fetchedProducts: [],
  currentProductType: "coffee",

  // Actions
  setCurrentProductType(productType) {
    set({ currentProductType: productType });
  },

  getProductsByCategory: (category) => {
    const data = localStorage.getItem(category);

    if (data === null) {
      const savedData = products.filter((prod) => prod.category === category);

      localStorage.setItem(category, JSON.stringify(savedData));

      set({ fetchedProducts: savedData });
      return;
    }

    const parsedData: Product[] = JSON.parse(data);
    set({ fetchedProducts: parsedData });
  },
}));
