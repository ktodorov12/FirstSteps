import { useState, type FC } from "react";
import type { Product } from "../../types";
import { milkOptions, syrupFlavors } from "../../data/mockData";
import MilkSelector from "./MilkSelector";
import SyrupChips from "./SyrupChips";
import QuantitySelector from "./QuantitySelector";

interface CustomizationPopupProps {
  product: Product;
  onClose: () => void;
  onAddToOrder: (
    product: Product,
    quantity: number,
    milk: string,
    syrups: string[],
  ) => void;
}

const CustomizationPopup: FC<CustomizationPopupProps> = ({
  product,
  onClose,
  onAddToOrder,
}) => {
  const [selectedMilk, setSelectedMilk] = useState("whole");
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const milkExtra = milkOptions.find((m) => m.id === selectedMilk)?.extraCost ?? 0;
  const unitPrice = product.price + milkExtra;
  const totalPrice = unitPrice * quantity;

  const handleSyrupToggle = (id: string) => {
    setSelectedSyrups((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div
        className="bg-surface-container-high w-full max-w-lg rounded-xl overflow-hidden flex flex-col relative sculpted-depth"
        onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors z-10">
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Hero image header */}
        <div className="relative h-48 w-full bg-surface-container-lowest">
          <img
            className="w-full h-full object-cover opacity-80"
            src={product.image}
            alt={product.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent" />
          <div className="absolute bottom-6 left-8">
            <span className="bg-primary text-on-primary-fixed text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-2 inline-block">
              Customizer
            </span>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight">
              Customize Your {product.name}
            </h2>
          </div>
        </div>

        {/* Scrollable options */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-20rem)]">
          <MilkSelector
            options={milkOptions}
            selected={selectedMilk}
            onSelect={setSelectedMilk}
          />

          <SyrupChips
            flavors={syrupFlavors}
            selected={selectedSyrups}
            onToggle={handleSyrupToggle}
          />

          {/* Quantity and CTA */}
          <div className="pt-4 border-t border-outline-variant/15 flex items-center justify-between gap-6">
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button
              onClick={() => {
                const milk =
                  milkOptions.find((m) => m.id === selectedMilk)?.label ?? "Whole Milk";
                onAddToOrder(product, quantity, milk, selectedSyrups);
                onClose();
              }}
              className="flex-1 bg-primary-container text-on-primary-fixed font-headline font-bold text-lg h-16 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
              <span>Add to Order</span>
              <span className="text-sm opacity-60">•</span>
              <span>${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPopup;
