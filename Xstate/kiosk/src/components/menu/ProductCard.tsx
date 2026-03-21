import type { FC } from "react";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToOrder }) => {
  return (
    <div className="bg-surface-container-high rounded-xl p-5 flex flex-col gap-4 group transition-all hover:bg-surface-container-highest">
      <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-lowest">
        <img
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold font-headline">{product.name}</h3>
          <span className="text-primary font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-2">
          {product.description}
        </p>
      </div>
      <button
        onClick={() => onAddToOrder(product)}
        className="h-14 bg-primary-container/80 cursor-pointer hover:bg-primary-container duration-200  text-on-primary-fixed font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
        <span className="material-symbols-outlined">add</span>
        Add to Order
      </button>
    </div>
  );
};

export default ProductCard;
