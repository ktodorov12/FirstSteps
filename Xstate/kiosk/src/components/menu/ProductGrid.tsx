import type { FC } from "react";
import type { Product } from "../../types";
import ProductCard from "./ProductCard";
import CategoryHeader from "./CategoryHeader";

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onAddToOrder: (product: Product) => void;
}

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  coffee: { title: "Signature Brews", subtitle: "Precision roasted, expertly pulled." },
  pastry: { title: "Fresh Pastries", subtitle: "Baked daily, gone by noon." },
  merch: { title: "Merch & Gear", subtitle: "Wear the roast." },
  rewards: { title: "Rewards", subtitle: "Earn while you sip." },
};

const ProductGrid: FC<ProductGridProps> = ({
  products,
  activeCategory,
  onAddToOrder,
}) => {
  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => {
          if (activeCategory === "pastries") return p.category === "pastry";
          return p.category === activeCategory;
        });

  const meta =
    categoryMeta[activeCategory === "pastries" ? "pastry" : activeCategory] ??
    categoryMeta.coffee;

  return (
    <section className="ml-24 flex-1 p-8 overflow-y-auto bg-surface">
      <CategoryHeader title={meta.title} subtitle={meta.subtitle} />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToOrder={onAddToOrder} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
