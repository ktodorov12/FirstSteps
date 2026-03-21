import type { FC } from "react";
import { getKioskActorRef } from "../../machines/kioskMachine";
import { Category, type CategoryType } from "../../types";

interface TopNavBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  cartCount: number;
  onCartClick: () => void;
}

const TopNavBar: FC<TopNavBarProps> = ({
  activeCategory,
  onCategoryChange,
  cartCount,
  onCartClick,
}) => {
  const actorRef = getKioskActorRef();

  const handleClick = (category: CategoryType) => {
    actorRef.send({ type: "products.change", newProduct: category });

    onCategoryChange(category);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 flex justify-between items-center bg-[#0e0e0e] h-20">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold text-primary tracking-tighter font-headline">
          The Kinetic Roast
        </span>
        <nav className="hidden md:flex gap-6">
          {Object.values(Category).map((category) => {
            const isActive = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => handleClick(category)}
                className={`font-headline tracking-tight transition-colors pb-1 cursor-pointer ${
                  isActive
                    ? "text-primary border-b-2 border-primary-container"
                    : "text-on-surface-variant hover:text-primary"
                }`}>
                {category[0].toUpperCase()}
                {category.slice(1)}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-on-surface w-48 placeholder:text-on-surface-variant"
            placeholder="Search menu..."
            type="text"
          />
        </div>
        <button
          onClick={onCartClick}
          className="p-2 hover:bg-surface-container-highest rounded-full transition-colors relative cursor-pointer">
          <span className="material-symbols-outlined text-primary">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button className="p-2 hover:bg-surface-container-highest rounded-full transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-primary">person</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
