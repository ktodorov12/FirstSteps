export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "coffee" | "pastry" | "merch" | "rewards";
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
