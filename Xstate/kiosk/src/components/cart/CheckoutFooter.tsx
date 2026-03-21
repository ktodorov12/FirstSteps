import type { FC } from "react";

interface CheckoutFooterProps {
  subtotal: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

const CheckoutFooter: FC<CheckoutFooterProps> = ({
  subtotal,
  tax,
  total,
  onCheckout,
}) => {
  return (
    <div className="glass-panel p-8 mt-auto border-t border-outline-variant/10">
      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-on-surface-variant">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold font-headline pt-2">
          <span>Total</span>
          <span className="text-primary-container">${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="cursor-pointer w-full h-20 bg-primary-container/90 hover:bg-primary-container text-on-primary-fixed text-xl font-black rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl">
        Proceed to Checkout
        <span className="material-symbols-outlined font-bold">arrow_forward</span>
      </button>
    </div>
  );
};

export default CheckoutFooter;
