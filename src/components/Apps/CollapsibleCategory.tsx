import { AppIcon } from './AppIcon';
import type { AppCategory } from '@/types';

interface CollapsibleCategoryProps {
  category: AppCategory;
  expanded: boolean;
  onToggle: () => void;
  /** 紧凑布局（如右上角面板）时为 true */
  compact?: boolean;
}

export function CollapsibleCategory({ category, expanded, onToggle, compact }: CollapsibleCategoryProps) {
  return (
    <div className={compact ? 'w-full' : undefined}>
      <button
        type="button"
        onClick={onToggle}
        className="mb-2 flex w-full items-center justify-between gap-2 text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
        aria-expanded={expanded}
      >
        <span>{category.title}</span>
        <span
          className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      {expanded && (
        <div
          className={
            compact
              ? 'grid grid-cols-2 gap-1.5'
              : 'grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
          }
        >
          {category.items.map((app) => (
            <AppIcon key={app.id} app={app} compact={compact} />
          ))}
        </div>
      )}
    </div>
  );
}
