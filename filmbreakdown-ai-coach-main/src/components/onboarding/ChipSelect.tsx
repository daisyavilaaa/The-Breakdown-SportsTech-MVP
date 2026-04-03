import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  max?: number;
  customValues?: string[];
}

export function ChipSelect({ options, selected, onToggle, max, customValues = [] }: ChipSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const isCustom = customValues.includes(option);
        const isDisabled = !isSelected && max !== undefined && selected.length >= max;

        return (
          <button
            key={option}
            type="button"
            disabled={isDisabled}
            onClick={() => onToggle(option)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 border",
              isSelected
                ? "bg-foreground/10 border-foreground/20 text-foreground"
                : isDisabled
                  ? "bg-secondary/50 border-border/50 text-muted-foreground/40 cursor-not-allowed"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-foreground/20",
              isCustom && "italic"
            )}
          >
            <span className="flex items-center gap-1.5">
              {isSelected && <Check className="h-3 w-3" />}
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
