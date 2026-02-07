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
    <div className="w-full px-4 py-6">
      {/* 桌面端：三栏布局 */}
      <div className="hidden min-[900px]:grid grid-cols-[1fr_min(100%,56rem)_1fr] gap-8 items-start">
        {/* 左侧占位，保持主内容视觉居中 */}
        <div aria-hidden />

        {/* 主区域 */}
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

        {/* 右侧：Linux-Servers */}
        {linuxServersCategory ? (
          <aside
            className="flex min-w-0 justify-center"
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
          <div aria-hidden />
        )}
      </div>

      {/* 移动端：单栏布局，Linux-Servers 放在最下面 */}
      <div className="min-[900px]:hidden space-y-6">
        {mainCategories.map((category) => (
          <div key={category.id}>
            <CollapsibleCategory
              category={category}
              expanded={expanded[category.id] ?? true}
              onToggle={() => toggle(category.id)}
            />
          </div>
        ))}
        {linuxServersCategory && (
          <div>
            <CollapsibleCategory
              category={linuxServersCategory}
              expanded={expanded[linuxServersCategory.id] ?? true}
              onToggle={() => toggle(linuxServersCategory.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
