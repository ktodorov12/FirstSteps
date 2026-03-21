import type { FC } from "react";
import type { SyrupFlavor } from "../../types";

interface SyrupChipsProps {
  flavors: SyrupFlavor[];
  selected: string[];
  onToggle: (id: string) => void;
}

const SyrupChips: FC<SyrupChipsProps> = ({ flavors, selected, onToggle }) => {
  return (
    <section>
      <h4 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
        Add Syrup Flavors
      </h4>
      <div className="flex flex-wrap gap-3">
        {flavors.map((flavor) => {
          const isSelected = selected.includes(flavor.id);
          return (
            <button
              key={flavor.id}
              onClick={() => onToggle(flavor.id)}
              className={`px-6 py-3 rounded-full font-medium border-2 border-transparent transition-all ${
                isSelected
                  ? "bg-primary-container text-on-primary-fixed"
                  : "bg-surface-container-lowest text-on-surface-variant"
              }`}>
              {flavor.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SyrupChips;
