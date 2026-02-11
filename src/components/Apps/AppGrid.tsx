import { useState, useCallback } from 'react';
import { CollapsibleCategory } from './CollapsibleCategory';
import { FinanceDashboard } from '@/components/Widgets/FinanceDashboard';
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
      {/* 桌面端：三栏布局（需要至少 1280px）*/}
      <div className="hidden xl:grid grid-cols-[minmax(240px,280px)_1fr_minmax(240px,280px)] gap-6 items-start max-w-[1600px] mx-auto">
        {/* 左侧：金融仪表盘 */}
        <aside className="flex min-w-0 justify-center sticky top-6" aria-label="金融信息">
          <div className="w-full">
            <FinanceDashboard />
          </div>
        </aside>

        {/* 主区域 */}
        <section className="min-w-0 flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {mainCategories.map((category) => (
              <div key={category.id}>
                <CollapsibleCategory
                  category={category}
                  expanded={expanded[category.id] ?? true}
                  onToggle={() => toggle(category.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 右侧：Linux-Servers */}
        {linuxServersCategory ? (
          <aside
            className="flex min-w-0 justify-center sticky top-6"
            aria-label={linuxServersCategory.title}
          >
            <div className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 shadow-xl backdrop-blur-xl">
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

      {/* 平板端：两栏布局（768px-1279px）*/}
      <div className="hidden md:xl:hidden md:grid grid-cols-[minmax(0,280px)_1fr] gap-6 items-start max-w-[1200px] mx-auto">
        {/* 左侧：金融仪表盘 */}
        <aside className="flex min-w-0 justify-center sticky top-6" aria-label="金融信息">
          <div className="w-full">
            <FinanceDashboard />
          </div>
        </aside>

        {/* 主区域 */}
        <section className="min-w-0 flex justify-center">
          <div className="w-full max-w-3xl space-y-6">
            {mainCategories.map((category) => (
              <div key={category.id}>
                <CollapsibleCategory
                  category={category}
                  expanded={expanded[category.id] ?? true}
                  onToggle={() => toggle(category.id)}
                />
              </div>
            ))}
            {/* Linux-Servers 放在主区域底部 */}
            {linuxServersCategory && (
              <div className="rounded-2xl border border-white/10 bg-black/40 px-3 py-3 shadow-xl backdrop-blur-xl">
                <CollapsibleCategory
                  category={linuxServersCategory}
                  expanded={expanded[linuxServersCategory.id] ?? true}
                  onToggle={() => toggle(linuxServersCategory.id)}
                  compact
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 移动端：单栏布局 */}
      <div className="md:hidden space-y-6 max-w-2xl mx-auto">
        {/* 金融仪表盘 */}
        <FinanceDashboard />

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
