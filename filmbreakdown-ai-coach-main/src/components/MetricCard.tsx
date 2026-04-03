interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
}

export function MetricCard({ label, value, change }: MetricCardProps) {
  return (
    <div className="rounded-[14px] p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-semibold text-foreground mt-1 tracking-tight">{value}</p>
      {change && <p className="text-xs text-muted-foreground mt-2">{change}</p>}
    </div>
  );
}
