# Layout Lab

一个按难度递进、支持中英文切换的前端布局知识学习系统。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

`dist/` 可直接发布到 GitHub Pages。应用使用 Hash 路由，因此部署在仓库子路径时也能正确刷新。

## 部署到 GitHub Pages

项目是纯静态前端，构建产物 `dist/` 由 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 自动发布：

1. 仓库 `Settings → Pages → Build and deployment → Source` 选择 **GitHub Actions**。
2. 推送到 `main`（或在 Actions 页面手动 `Run workflow`）触发构建：
   `npm ci → npm run build → 上传 dist → 发布 Pages`。
3. 站点地址为 `https://<用户名>.github.io/<仓库名>/`，本项目即 `https://boveyh.github.io/vis-work/`。

`vite.config.ts` 中 `base: "./"` 让资源使用相对路径，因此部署在仓库子路径下也能正确加载；
配合 `HashRouter`，直接访问或刷新任意 `#/zh/...`、`#/en/...` 链接都不会 404。

## 关于 Live Server

`index.html` 是 Vite 的入口模板，它引用的是 `/src/main.tsx`（TypeScript + JSX）。
Live Server 只做静态托管、不做编译，因此直接用它打开根目录下的 `index.html` 会白屏
（浏览器得到 `Content-Type: application/octet-stream` 的原始 JSX，模块脚本被拒绝执行）。

- 本地开发请使用 `npm run dev`（Vite 编译并热更新）。
- 想在浏览器里看构建产物：`npm run build` 后点 Go Live —— 本仓库已把 Live Server 根目录配置为 `dist`，地址是 `http://127.0.0.1:5501/`；
  未改配置时则是 `http://127.0.0.1:5500/dist/index.html`。
- 直接双击 `dist/index.html`（`file://`）同样打不开，ES module 在 `file://` 下会被 CORS 拦截。

## 仓库内的预览配置（`.vscode/`）

- `settings.json`：Live Server 的根目录固定为 `/dist`，端口改为 `5501`，因此点 Go Live 服务的是构建产物而不是源码。
  （改完设置后需要**重启 Live Server**：状态栏点 `Port:` 或 `Ctrl+Shift+P → Live Server: Stop Live Server`，再点 Go Live。）
- `tasks.json`：三个任务 —— `dev`（默认构建任务，`Ctrl+Shift+B` 直接跑）、`build`、`preview`（先构建再预览生产版本）。
- `launch.json`：`F5` 直接开浏览器预览/调试 —— Edge 或 Chrome 打开 `5173`（开发服务器），以及 Edge 打开 `4173`（生产构建）。

