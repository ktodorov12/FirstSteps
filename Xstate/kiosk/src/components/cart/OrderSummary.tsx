import type { FC } from "react";
import type { CartItem as CartItemType } from "../../types";
import CartItem from "./CartItem";
import CheckoutFooter from "./CheckoutFooter";

interface OrderSummaryProps {
  items: CartItemType[];
  isOpen: boolean;
  onClose: () => void;
  onItemIncrement: (index: number) => void;
  onItemDecrement: (index: number) => void;
  onCheckout: () => void;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  items,
  isOpen,
  onClose,
  onItemIncrement,
  onItemDecrement,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity cursor-pointer"
          onClick={onClose}
        />
      )}

      {/* Slide-over panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-95 max-w-[90vw] bg-surface-container-low flex flex-col z-50 shadow-[-20px_0_40px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="p-8 flex-1 overflow-y-auto pt-6">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl font-bold font-headline">Order Summary</h2>
            <div className="flex items-center gap-3">
              <span className="text-on-surface-variant text-sm">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {items.map((item, i) => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrement={() => onItemIncrement(i)}
                onDecrement={() => onItemDecrement(i)}
              />
            ))}
          </div>
        </div>
        <CheckoutFooter
          subtotal={subtotal}
          tax={tax}
          total={total}
          onCheckout={onCheckout}
        />
      </aside>
    </>
  );
};

export default OrderSummary;
