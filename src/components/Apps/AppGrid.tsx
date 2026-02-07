import { useState, useCallback } from 'react';
import { CollapsibleCategory } from './CollapsibleCategory';
import type { AppCategory } from '@/types';

const LINUX_SERVERS_ID = 'linux-servers';

interface AppGridProps {
  categories: AppCategory[];
}

function getDefaultExpanded(categories: AppCategory[]): Record<string, boolean> {
  return Object.fromEntries(categories.map((c) => [c.id, true]));
}

export function AppGrid({ categories }: AppGridProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    getDefaultExpanded(categories)
  );

  const mainCategories = categories.filter((c) => c.id !== LINUX_SERVERS_ID);
  const linuxServersCategory = categories.find((c) => c.id === LINUX_SERVERS_ID);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className="grid grid-cols-[1fr_min(100%,56rem)_1fr] gap-8 items-start w-full px-4 py-6">
      {/* 左侧占位，保持主内容视觉居中 */}
      <div className="hidden min-[900px]:block" aria-hidden />

      {/* 主区域：保持原有居中（仅占中间列），不改变三个分组的居中位置 */}
      <section className="min-w-0 space-y-6">
        {mainCategories.map((category) => (
          <div key={category.id}>
            <CollapsibleCategory
              category={category}
              expanded={expanded[category.id] ?? true}
              onToggle={() => toggle(category.id)}
            />
          </div>
        ))}
      </section>

      {/* 右侧：Linux-Servers，纵向对齐第一个分组，横向在「主内容右缘～最右侧」之间居中 */}
      {linuxServersCategory ? (
        <aside
          className="hidden min-[900px]:flex min-w-0 justify-center"
          aria-label={linuxServersCategory.title}
        >
          <div className="w-64 shrink-0 rounded-2xl border border-white/10 bg-black/40 px-3 py-3 shadow-xl backdrop-blur-xl">
            <CollapsibleCategory
              category={linuxServersCategory}
              expanded={expanded[linuxServersCategory.id] ?? true}
              onToggle={() => toggle(linuxServersCategory.id)}
              compact
            />
          </div>
        </aside>
      ) : (
        <div className="hidden min-[900px]:block" aria-hidden />
      )}
    </div>
  );
}
