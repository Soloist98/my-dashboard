import { useState } from 'react';

/**
 * 使用 Simple Icons CDN 渲染品牌图标
 * slug 见 https://simpleicons.org；无图标或加载失败时显示 iconFallback
 */
interface BrandIconProps {
  /** Simple Icons 中的 slug，如 nextcloud、plex */
  slug: string;
  /** 图标尺寸（像素） */
  size?: number;
  /** 图标颜色（hex 或 CSS 关键字），不传则用品牌色 */
  color?: string;
  /** CDN 无此图标或加载失败时显示（如 emoji 或单字） */
  fallback?: string;
  className?: string;
}

const CDN_BASE = 'https://cdn.simpleicons.org';

export function BrandIcon({ slug, size = 56, color, fallback, className = '' }: BrandIconProps) {
  const [failed, setFailed] = useState(false);

  const params = new URLSearchParams();
  params.set('viewbox', 'auto');
  params.set('size', String(size));
  const url = color
    ? `${CDN_BASE}/${slug}/${color.replace('#', '')}?${params}`
    : `${CDN_BASE}/${slug}?${params}`;

  if (failed && fallback) {
    return (
      <span
        className={`flex items-center justify-center text-2xl ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {fallback}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
