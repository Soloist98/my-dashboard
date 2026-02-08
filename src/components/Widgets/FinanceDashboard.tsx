import { useFinanceData } from '@/hooks/useFinanceData';
import type { FinanceItem } from '@/types';

function formatPrice(item: FinanceItem): string {
  if (item.price === null) return '--';
  if (item.unit === '$') {
    return item.price >= 1
      ? `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${item.price}`;
  }
  return `${item.price.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.unit}`;
}

function formatChange(change: number | null): string {
  if (change === null) return '--';
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** 刷新图标 SVG */
function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${spinning ? 'animate-spin' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

function PriceRow({ item }: { item: FinanceItem }) {
  const isUp = item.change !== null && item.change >= 0;
  const hasChange = item.change !== null;

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm font-medium text-white/90">{item.name}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm tabular-nums text-white/80">
          {formatPrice(item)}
        </span>
        <span
          className={`min-w-[4.5rem] text-right text-xs font-medium tabular-nums ${
            hasChange ? (isUp ? 'text-emerald-400' : 'text-red-400') : 'text-white/40'
          }`}
        >
          {formatChange(item.change)}
        </span>
      </div>
    </div>
  );
}

/** 加载骨架屏 */
function Skeleton() {
  return (
    <div className="space-y-3 py-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
          <div className="flex gap-3">
            <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FinanceDashboard() {
  const { items, loading, updatedAt, refresh } = useFinanceData();
  const showSkeleton = loading && items.length === 0;

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-xl backdrop-blur-xl">
      {/* 标题栏 */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
          金融信息
        </h3>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white/90 disabled:opacity-50"
          aria-label="刷新金融数据"
        >
          <RefreshIcon spinning={loading} />
        </button>
      </div>

      {/* 数据列表 */}
      {showSkeleton ? (
        <Skeleton />
      ) : (
        <div className="divide-y divide-white/5">
          {items.map((item) => (
            <PriceRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* 更新时间 */}
      {updatedAt && (
        <p className="mt-2 text-right text-[10px] text-white/40">
          {formatTime(updatedAt)}
        </p>
      )}
    </div>
  );
}
