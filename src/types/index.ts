/**
 * 自托管应用/资源项
 */
export interface AppItem {
  id: string;
  name: string;
  /** 不填则仅展示、不可点击（如 Linux-Servers 仅展示 IP） */
  href?: string;
  /** Simple Icons slug；CDN 无此图标时可配合 iconFallback 显示。当 iconUrl 存在时可不填 */
  icon: string;
  /** 自定义图标 URL（优先于 icon），用于品牌官方图等 */
  iconUrl?: string;
  /** 图标加载失败时显示（如 emoji 或单字），用于 Simple Icons 未收录的品牌 */
  iconFallback?: string;
  description?: string;
}

/**
 * 应用分类（用于按类别分组展示）
 */
export interface AppCategory {
  id: string;
  title: string;
  items: AppItem[];
}

/**
 * 状态卡片数据
 */
export interface StatusWidget {
  id: string;
  title: string;
  items: Array<{ label: string; value: string }>;
}
