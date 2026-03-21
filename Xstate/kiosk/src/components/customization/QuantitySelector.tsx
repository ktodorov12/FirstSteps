import type { FC } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center bg-surface-container-lowest rounded-xl p-1">
      <button
        onClick={onDecrement}
        className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-highest rounded-lg transition-colors">
        <span className="material-symbols-outlined">remove</span>
      </button>
      <span className="w-12 text-center font-headline font-bold text-xl">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-highest rounded-lg transition-colors">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
