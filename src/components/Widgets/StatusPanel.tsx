import { StatusCard } from './StatusCard';
import type { StatusWidget } from '@/types';

interface StatusPanelProps {
  widgets: StatusWidget[];
}

export function StatusPanel({ widgets }: StatusPanelProps) {
  return (
    <section className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2">
      {widgets.map((widget) => (
        <StatusCard key={widget.id} widget={widget} />
      ))}
    </section>
  );
}
