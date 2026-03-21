import type { FC } from "react";
import { categories } from "../../data/mockData";
import { getKioskActorRef } from "../../machines/kioskMachine";
import type { CategoryType } from "../../types";

interface SideNavBarProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SideNavBar: FC<SideNavBarProps> = ({ activeIndex, onSelect }) => {
  const actorRef = getKioskActorRef();

  const handleClick = (categoryLabel: CategoryType, index: number) => {
    onSelect(index);

    actorRef.send({ type: "products.change", newProduct: categoryLabel });
  };

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] z-40 flex flex-col bg-[#0e0e0e] w-24 items-center py-8">
      <div className="mb-8 text-center">
        <div className="text-primary font-black text-xs uppercase tracking-widest mb-1">
          Menu
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full items-center">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            datatype={cat.label}
            onClick={() => handleClick(cat.id, i)}
            className={`rounded-2xl p-4 flex flex-col items-center gap-1 active:scale-90 duration-200 transition-all cursor-pointer ${
              activeIndex === i
                ? "bg-primary-container text-[#0e0e0e]"
                : "text-on-surface-variant hover:bg-surface-container-highest"
            }`}>
            <span className="material-symbols-outlined">{cat.icon}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto pb-4">
        <button className="bg-primary-container text-on-primary-container font-bold text-[10px] uppercase p-3 rounded-xl hover:rotate-2 transition-transform">
          Quick
          <br />
          Order
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;
