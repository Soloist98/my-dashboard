import { useState } from 'react';
import type { AppItem } from '@/types';
import { BrandIcon } from '@/components/Icon/BrandIcon';

interface AppIconProps {
  app: AppItem;
  /** 紧凑模式（如右上角面板） */
  compact?: boolean;
}

const ICON_SIZE = 40;
const ICON_SIZE_COMPACT = 28;

export function AppIcon({ app, compact }: AppIconProps) {
  const [customImgFailed, setCustomImgFailed] = useState(false);
  const useCustomUrl = app.iconUrl && !customImgFailed;
  const size = compact ? ICON_SIZE_COMPACT : ICON_SIZE;
  const boxClass = compact
    ? 'flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 p-1 shadow backdrop-blur-sm'
    : 'flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 p-2 shadow-lg backdrop-blur-sm';
  const textClass = compact
    ? 'min-w-0 max-w-[7rem] truncate text-center text-xs font-medium text-white/95'
    : 'min-w-0 max-w-[11rem] truncate text-center text-sm font-medium text-white/95';

  const content = (
    <>
      <span className={boxClass}>
        {useCustomUrl ? (
          <img
            src={app.iconUrl}
            alt=""
            width={size}
            height={size}
            className="shrink-0 object-contain"
            loading="lazy"
            onError={() => setCustomImgFailed(true)}
          />
        ) : (
          <BrandIcon slug={app.icon} size={size} fallback={app.iconFallback} className="shrink-0" />
        )}
      </span>
      <span className={textClass}>
        {app.name}
      </span>
    </>
  );

  const className = compact
    ? 'flex flex-col items-center gap-1 rounded-xl p-2 transition hover:scale-105 hover:bg-white/10 active:scale-100'
    : 'flex flex-col items-center gap-2 rounded-2xl p-4 transition hover:scale-105 hover:bg-white/10 active:scale-100';

  if (app.href) {
    return (
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={className} title={app.name}>
        {content}
      </a>
    );
  }

  return <div className={className} title={app.name}>{content}</div>;
}
