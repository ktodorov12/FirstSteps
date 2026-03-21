import type { FC } from "react";
import type { CartItem as CartItemType } from "../../types";

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CartItem: FC<CartItemProps> = ({ item, onIncrement, onDecrement }) => {
  const customization = item.milk
    ? `${item.milk}${item.syrups && item.syrups.length > 0 ? ` · ${item.syrups.join(", ")}` : ""}`
    : `Quantity: ${item.quantity}`;

  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover"
          src={item.product.image}
          alt={item.product.name}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <span className="font-bold">{item.product.name}</span>
          <span className="text-primary font-bold">${item.lineTotal.toFixed(2)}</span>
        </div>
        <span className="text-xs text-on-surface-variant uppercase tracking-wider mb-2">
          {customization}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onDecrement}
            className="active:scale-95 cursor-pointer w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-surface-variant">
            <span className="material-symbols-outlined text-xs">remove</span>
          </button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <button
            onClick={onIncrement}
            className="active:scale-95 cursor-pointer w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-surface-variant">
            <span className="material-symbols-outlined text-xs">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
