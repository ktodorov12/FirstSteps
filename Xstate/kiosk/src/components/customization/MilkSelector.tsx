import type { FC } from "react";
import type { MilkOption } from "../../types";

interface MilkSelectorProps {
  options: MilkOption[];
  selected: string;
  onSelect: (id: string) => void;
}

const MilkSelector: FC<MilkSelectorProps> = ({ options, selected, onSelect }) => {
  return (
    <section>
      <h4 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
        Select Milk Base
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              selected === opt.id
                ? "bg-surface-container border-2 border-primary-container"
                : "bg-surface-container-low border-2 border-transparent"
            }`}>
            <span className="font-medium text-on-surface">{opt.label}</span>
            {opt.extraCost > 0 ? (
              <span className="text-primary-dim font-bold text-sm">
                +${opt.extraCost.toFixed(2)}
              </span>
            ) : (
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === opt.id ? "bg-primary border-primary" : "border-outline"
                }`}>
                {selected === opt.id && (
                  <div className="w-2 h-2 bg-on-primary rounded-full" />
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MilkSelector;
