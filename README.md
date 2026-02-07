# Self-Hosted Dashboard

基于 Cloudflare 部署的静态仪表盘，用于集中展示自托管虚拟机/应用等资源地址。

## 技术栈

- **React 18** + **TypeScript**
- **Vite** 构建，适合静态站点与 Cloudflare Pages
- **Tailwind CSS**，样式与逻辑分离
- 遵循 Clean Code / SOLID，组件职责单一

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 构建

```bash
npm run build
```

产物在 `dist/`，可直接用于静态托管。

## 部署到 Cloudflare Pages

1. **通过 Git（推荐）**  
   - 在 [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → 创建项目 → 连接 Git  
   - 构建命令：`npm run build`  
   - 输出目录：`dist`

2. **通过 Wrangler 上传**  
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=self-hosted-dashboard
   ```

## 配置自托管链接

编辑 `src/data/apps.ts` 中的 `apps` 数组，按需增删或修改应用的 `name`、`href`、`icon`。  
状态卡片数据在 `src/data/status.ts` 中配置，后续可改为从 API 拉取。

## 项目结构

```
src/
  components/   # UI 组件（Layout / Widgets / Apps / Search / Dock）
  data/         # 静态配置（apps、status）
  services/     # 纯逻辑（如 greeting）
  styles/       # 全局样式
  types/        # TypeScript 类型
```

## 许可

MIT
