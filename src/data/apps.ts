import type { AppCategory } from '@/types';

/**
 * 按分类配置的应用清单（Update 1.0）
 * icon 使用 Simple Icons 的 slug，见 https://simpleicons.org
 */
export const appCategories: AppCategory[] = [
  {
    id: 'self-hosted',
    title: 'Self-hosted 应用',
    items: [
      { id: 'truenas', name: 'TrueNas', href: 'http://192.168.31.165', icon: 'truenas' },
      { id: 'openwrt', name: 'OpenWrt', href: 'http://192.168.31.18/cgi-bin/luci/', icon: 'openwrt' },
      { id: 'n8n', name: 'N8N', href: 'http://192.168.31.185:5678/', icon: 'n8n' },
      { id: 'homeassistant', name: 'HomeAssistant', href: 'http://192.168.31.50:8123/', icon: 'homeassistant' },
      { id: 'jellyfin', name: 'JellyFin', href: 'http://192.168.31.165:30000/web/index.html#/home.html', icon: 'jellyfin' },
    ],
  },
  {
    id: 'linux-servers',
    title: 'Linux-Servers',
    items: [
      { id: 'server-165', name: '192.168.31.165', icon: 'linux' },
      { id: 'server-18', name: '192.168.31.18', icon: 'linux' },
      { id: 'server-185', name: '192.168.31.185', icon: 'linux' },
      { id: 'server-50', name: '192.168.31.50', icon: 'linux' },
    ],
  },
  {
    id: 'ai',
    title: 'AI 网站',
    items: [
      {
        id: 'deepseek',
        name: 'DeepSeek',
        href: 'https://chat.deepseek.com/',
        icon: 'openai',
        iconUrl: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/deepseek-color.png',
        iconFallback: 'DS',
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        href: 'https://chat.openai.com/',
        icon: 'openai',
        iconUrl: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/openai.png',
        iconFallback: 'GPT',
      },
    ],
  },
  {
    id: 'common',
    title: '常用网站',
    items: [
      { id: 'w3', name: 'W3 首页', href: 'https://w3.huawei.com/', icon: 'huawei' },
      { id: 'v2ex', name: 'V2EX', href: 'https://www.v2ex.com/', icon: 'v2ex' },
      { id: 'cloudflare', name: 'Cloudflare', href: 'https://dash.cloudflare.com/', icon: 'cloudflare' },
    ],
  },
];
