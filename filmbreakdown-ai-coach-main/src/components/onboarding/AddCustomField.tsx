import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddCustomFieldProps {
  placeholder: string;
  onAdd: (value: string) => void;
  maxLength?: number;
}

export function AddCustomField({ placeholder, onAdd, maxLength = 80 }: AddCustomFieldProps) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue("");
      setOpen(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
      >
        <Plus className="h-3 w-3" />
        {placeholder}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder={placeholder}
        className="h-8 text-xs bg-secondary border-border"
      />
      <button
        type="button"
        onClick={handleAdd}
        className="px-3 py-1.5 rounded-md text-xs font-medium bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/15 transition-colors"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setValue(""); }}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
