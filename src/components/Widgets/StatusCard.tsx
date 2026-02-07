import type { StatusWidget } from '@/types';

interface StatusCardProps {
  widget: StatusWidget;
}

export function StatusCard({ widget }: StatusCardProps) {
  return (
    <article
      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-xl"
      style={{ backgroundColor: 'var(--glass-bg)' }}
    >
      <h3 className="mb-3 text-sm font-medium text-white/90">{widget.title}</h3>
      <ul className="space-y-1.5 text-sm text-white/80">
        {widget.items.map((item) => (
          <li key={item.label} className="flex justify-between">
            <span className="text-white/60">{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
