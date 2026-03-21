export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "coffee" | "pastry" | "merch" | "rewards";
}

export const Category = {
  COFFEE: "coffee",
  PASTRY: "pastry",
  MERCH: "merch",
  REWARDS: "rewards",
} as const;

export type CategoryType = (typeof Category)[keyof typeof Category];

export interface OrderedProducts {
  productName: string;
  price: string;
  img: string;
  quantity: number;
  additionMilk: string;
  additionSyrup: Array<string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  milk?: string;
  syrups?: string[];
  lineTotal: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface MilkOption {
  id: string;
  label: string;
  extraCost: number;
}

export interface SyrupFlavor {
  id: string;
  label: string;
}
