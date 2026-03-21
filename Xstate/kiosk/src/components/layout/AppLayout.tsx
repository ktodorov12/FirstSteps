import { useState, type FC } from "react";
import type { Product, CartItem } from "../../types";
import { categories, mockCartItems } from "../../data/mockData";
import TopNavBar from "./TopNavBar";
import SideNavBar from "./SideNavBar";
import ProductGrid from "../menu/ProductGrid";
import OrderSummary from "../cart/OrderSummary";
import CustomizationPopup from "../customization/CustomizationPopup";
import { useKioskStore } from "../../stores/kiosk-store";

const AppLayout: FC = () => {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [sideNavIndex, setSideNavIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = useKioskStore((state) => state.fetchedProducts);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const idx = categories.findIndex(
      (c) => c.id === category || c.label.toLowerCase() === category,
    );
    if (idx >= 0) setSideNavIndex(idx);
  };

  const handleSideNavSelect = (index: number) => {
    setSideNavIndex(index);
    setActiveCategory(categories[index].id);
  };

  const handleAddToOrder = (product: Product) => {
    setSelectedProduct(product);
  };

  const handlePopupAdd = (
    product: Product,
    quantity: number,
    milk: string,
    syrups: string[],
  ) => {
    const milkExtra = milk !== "Whole Milk" ? 0.5 : 0;
    const lineTotal = (product.price + milkExtra) * quantity;
    setCartItems((prev) => [...prev, { product, quantity, milk, syrups, lineTotal }]);
    setSelectedProduct(null);
  };

  const handleItemIncrement = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newQty = item.quantity + 1;
        const unitPrice = item.lineTotal / item.quantity;
        return { ...item, quantity: newQty, lineTotal: unitPrice * newQty };
      }),
    );
  };

  const handleItemDecrement = (index: number) => {
    setCartItems((prev) =>
      prev
        .map((item, i) => {
          if (i !== index) return item;
          const newQty = item.quantity - 1;
          if (newQty <= 0) return null;
          const unitPrice = item.lineTotal / item.quantity;
          return { ...item, quantity: newQty, lineTotal: unitPrice * newQty };
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  return (
    <div className="h-screen flex flex-col bg-surface text-on-surface">
      <TopNavBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onCartClick={() => setIsCartOpen((o) => !o)}
      />

      <main className="flex-1 flex mt-20 overflow-hidden">
        <SideNavBar activeIndex={sideNavIndex} onSelect={handleSideNavSelect} />

        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onAddToOrder={handleAddToOrder}
        />
      </main>

      <OrderSummary
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onItemIncrement={handleItemIncrement}
        onItemDecrement={handleItemDecrement}
        onCheckout={() => {}}
      />

      {selectedProduct && (
        <CustomizationPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={handlePopupAdd}
        />
      )}
    </div>
  );
};

export default AppLayout;
