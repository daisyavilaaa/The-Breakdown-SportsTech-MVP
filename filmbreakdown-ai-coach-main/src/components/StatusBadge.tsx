import { cn } from "@/lib/utils";

type Status = "submitted" | "in-review" | "completed";

const statusConfig: Record<Status, { label: string; className: string }> = {
  submitted: {
    label: "Submitted",
    className: "bg-muted text-muted-foreground",
  },
  "in-review": {
    label: "In Review",
    className: "bg-primary/10 text-primary",
  },
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wide", config.className)}>
      {config.label}
    </span>
  );
}
