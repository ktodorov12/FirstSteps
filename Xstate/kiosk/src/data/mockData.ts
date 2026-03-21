import type { Product, CartItem, Category, MilkOption, SyrupFlavor } from "../types";

export const categories: Category[] = [
  { id: "coffee", label: "Coffee", icon: "local_cafe" },
  { id: "pastry", label: "Pastries", icon: "bakery_dining" },
  { id: "merch", label: "Merch", icon: "shopping_bag" },
  { id: "rewards", label: "Rewards", icon: "loyalty" },
];

export const topNavLinks = ["Coffee", "Pastries", "Merch", "Rewards"] as const;

export const products: Product[] = [
  {
    id: "nitro-cold-brew",
    name: "Nitro Cold Brew",
    price: 5.5,
    description: "Infused with nitrogen for a creamy, stout-like finish.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkbyNxBl2_FU5382YoktEukpRpdnYH8HVG-LJwWtg_qBZmXUPhGJwymNVPIMHRKL1WJMS8x6Uxm_xhNCFoTzJBrMahkNNq58BVJkaEPMODuX69bxQLnuqV_0JQoJAWILgH9ueN5hPfFMKIfTAzgikG22PG2vVZ2ZXhW6-NS-x4DPdvR9R0kwnVqIiG3m5mqtZ6uUlBSxKjqlA15l2z1VaGODeZNoeHoMW4OAtz1QcAKfqewWgFUvvdSLGxjW83qwoH9xawsLEqMNV",
    category: "coffee",
  },
  {
    id: "iced-oat-latte",
    name: "Iced Oat Latte",
    price: 6.25,
    description: "Double espresso shot over creamy oat milk and ice.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRLRWAUYZ8mY7T6g-cIGxrrSh_PQRlhoowAT4gImso-54tzk9JUevaF3whLpxdUgxlVvN6QnzdAnSlJH1M2fuk24BlTCtc6il0BzTVxk6h0roTA97VA3n6t8WHjGEx5jv_cwRBmPyQqyF_Nztjzg2jU8skbIDaAtc2YLF7RvYZtGd_foqhLp_vTN7QBPbnyIbgpy1M5rVRjNnTT2DLg1O6biJpYGWHjWw3BBKc9popC6ZGue38YFT-npR9qH1veEi-W85IGLQNrRdM",
    category: "coffee",
  },
  {
    id: "kinetic-flat-white",
    name: "Kinetic Flat White",
    price: 4.5,
    description: "Micro-foam over a ristretto base. The perfect balance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDK7J9udnUdSxjAFjbn4Hw__idgUrVJGpVclWKN0kLm55g4HbUR0jC1tmHO0qPiw5046h1K0d2l-S-J_JCPf269wuAPMTCyU9vnPzgdaaa85JASGpljrZsG_ys-o94Hrqqoqu2mpJiUWxl2OdbsIjy6HV623gluTrJfOWdwnzUGhYuaOn7PvFxMW1sVWJbw2rpBCF1ZQbb3wnZvoGUKH0dzX6W49ngvYkdPD5axIiKm-iMKM_dTHdBFgEJ_jlFAUmjqERxm6EoC0NSP",
    category: "coffee",
  },
  {
    id: "single-origin-pour",
    name: "Single Origin Pour",
    price: 6.0,
    description: "Ethiopian Yirgacheffe with floral and citrus notes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tgisiknJV0ZvDEy1DhyfMNByI45ySb0ZA5Tz0qlq6cf78HMODnpnOmm_fQOXEYhkUlzxUTSxT1nlbhJ_fxq6riZYqIBfxxydFMULlx9R57iRixuODcb5mIBIodGAjcMvWWPwbQuNBBwz9x8BYti7gvErlBjWazRgWPSoATaU4d15NIbfU3zgyr7tP0DmnROuy0BlPxtZux7CsntMRUmpjZ5Kp1PKGncT1R5gZakGuEhRqJRvpHGS5mTCH9hYMOA2cqClgg1YtS8L",
    category: "coffee",
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    price: 4.75,
    description: "Buttery, flaky pastry filled with sweet almond frangipane.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCIiaL2eIBGPaX6Ly_JCUrxKvPdoEFHq7ZzN-jlMzwJU6TF6r73tZGfrGknBQXNTRADNNBAtW7rzzgXldiMYeaiExuNABHgeMsHYb-Y2xKXmxYHoLDsWVigpyM-oKjh0Yi_PxmJxl27OOAVuANR1hZQxhA8UA2pDuNcyuS1qzjZRB95sOw-myicGW_J6tRAjXzVlksXNuILzxNEn8sVj939NGgMWjaYJK2RbdlBPUGFRx0GcD4fXuRL-QNwdfbg0fzo85iD17xffaG",
    category: "pastry",
  },
  {
    id: "morning-bun",
    name: "Morning Bun",
    price: 5.25,
    description: "Laminated dough with cinnamon sugar and orange zest.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGgT-vXLqDLrV9FBhzaucGGhxlvqxxBvhB3g6KMCBTKnrNjCDDvk8dXo4yK2CA-nXFNe82hKJMoBS73JvMI15ot7u19EiRVICjtHasIh6lDeLVJJexvpUfLMaHUYpzTrw-5Zqs-xHNi--6FKN0wpxWlmGgXDQxlpdJP4XqKbcx5p1SfKcM3l6t2a-rNMEudnB2RiHw5TCPbwZbvrEX8wpQVJ_qrROurdKzsWctjJLdjsFDxTjbIBdQEN-STooptlTlJXHe8XFYFaj6",
    category: "pastry",
  },
];

export const milkOptions: MilkOption[] = [
  { id: "whole", label: "Whole Milk", extraCost: 0 },
  { id: "oat", label: "Oat Milk", extraCost: 0.5 },
  { id: "almond", label: "Almond Milk", extraCost: 0.5 },
];

export const syrupFlavors: SyrupFlavor[] = [
  { id: "vanilla", label: "Vanilla" },
  { id: "caramel", label: "Caramel" },
  { id: "hazelnut", label: "Hazelnut" },
];

export const mockCartItems: CartItem[] = [
  {
    product: products[0], // Nitro Cold Brew
    quantity: 1,
    milk: "Whole Milk",
    syrups: [],
    lineTotal: 5.5,
  },
  {
    product: products[4], // Almond Croissant
    quantity: 2,
    lineTotal: 9.5,
  },
];
