# 中本聪研究院中文版（nakamotoinstitute.org 中文重构计划）

> 本仓库是 [Satoshi Nakamoto Institute](https://nakamotoinstitute.org) 的中文化重构项目。
> 我们的使命：把关于中本聪与比特币的一切——白皮书、邮件、论坛帖子、Mempool 文库、图书馆藏书、播客——完整地带给中文世界。

## 项目结构

- `client/` — Next.js 16 前端（i18next 国际化，支持 `zh-cn` 等 15 种语言）
- `server/` — FastAPI 无头 CMS（PostgreSQL + Alembic），内容来自 `server/content/` 下的 Markdown 与 `server/data/` 下的 JSON
- 全站页面均为构建时静态生成（SSG），Cloudflare 只需部署前端产物；API 服务器仅在**构建时**需要。

## 中文化进度

| 内容 | 位置 | 状态 |
| --- | --- | --- |
| UI 字符串 | `client/locales/zh-CN/common.json` | ✅ 完成 |
| 默认语言已切换为简体中文 | `client/i18n.ts`（`defaultLocale = "zh-cn"`） | ✅ 完成 |
| 核心页面 8 篇（关于、速成课程、RPOW、Hal Finney 等） | `client/content/pages/zh-CN/` | ✅ 完成 |
| Mempool 文章（76 篇） | `server/content/mempool/*.zh-cn.md` | ✅ 全部完成（含抽检校对） |
| 图书馆藏书 140 篇（含白皮书全文） | `server/content/library/*.zh-cn.md` | ✅ 全部完成 |
| 图书馆两本书（《渐进，然后突然》《货币生产的伦理学》） | `server/content/library_books/*/zh-cn/` | ✅ 全部完成（新增 `<书>/<locale>/` 目录约定） |
| 播客节目（2 档 29 集） | `server/content/podcasts/`、`server/content/podcast_episodes/` | ✅ 完成 |
| 中本聪语录（162 条）与分类 | `server/data/quotes.json`、`quote_categories.json` | ✅ 完成 |
| "致敬大胆断言"（47 条） | `server/data/skeptics.json` | ✅ 完成 |
| Mempool 系列简介 | `server/content/mempool_series/*.zh-cn.md` | ✅ 完成 |
| 剩余 QA 校对（对照英文源逐批复核已恢复的译文） | `server/content/{mempool,library}/` | ⏳ 进行中（约 12/158 篇已校） |

**范围说明**：中本聪的邮件（72 封）与论坛帖（3845 条）为历史原始文献，遵循学术惯例保留英文原文，不提供翻译；这两类内容在上游站也没有翻译机制。作者页只有姓名（上游即如此），无需翻译。

## 本地开发环境

### 1. 启动数据库与服务端

```bash
# 安装 PostgreSQL 16（macOS）
brew install postgresql@16
brew services start postgresql@16
createuser -d sni && createdb -d sni sni   # 或用超级用户直接建库

# 安装 uv（Python 包管理）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 初始化服务端
cd server
uv sync
export SQLALCHEMY_DATABASE_URI="postgresql+psycopg://$(whoami)@127.0.0.1:5432/sni"
export ENVIRONMENT=LOCAL
export SATOSHI_REDIRECT=false
uv run python -m alembic upgrade head     # 建表
uv run python cli.py content initialize   # 导入全部内容
uv run uvicorn sni.main:app --port 8000   # API 跑在 :8000
```

可选：下载 PDF/ePub 等文档文件到 `server/static/docs/`（[sni-docs.zip](https://cdn.nakamotoinstitute.org/docs/sni-docs.zip)），本地即可预览文档下载。

### 2. 启动前端

```bash
cd client
pnpm i
pnpm dev       # http://localhost:3000，默认语言已是简体中文
```

## 部署到 Cloudflare

前端通过 [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) 适配器部署为**全静态** Cloudflare Worker：所有页面在构建时预渲染，Worker 只负责从静态资产与预渲染缓存中返回页面（`staticAssetsIncrementalCache`），无需 R2/KV/DO。

```bash
cd client
pnpm run deploy   # 清空 .next -> opennextjs-cloudflare build -> 复制预渲染缓存 -> wrangler deploy
pnpm run preview  # 本地 wrangler dev 验证
```

要点（踩过的坑，改动前必读）：

1. **构建前必须启动本地 API**（数据在构建时固化进静态页面）；
2. **`pnpm build` 会先清空 `.next`**：Next.js 的 fetch 缓存（`.next/cache/fetch-cache`）会在多次构建间复用陈旧的 API 响应，导致预渲染页面停留在旧内容——这是本项目曾经"中文页面只有 5 篇"的根因；
3. `scripts/copy-cache-assets.mjs` 会把 `.open-next/cache/<BUILD_ID>/` 复制进静态资产并**清理旧构建的缓存目录**，勿删；
4. `client/.env.local` 使用 `VERCEL_ENV=preview`：`production` 值会把 `/satoshi/*` 重定向到 `satoshi.<域名>` 子域名（上游多域名架构），在 workers.dev 单域部署下必须用 `preview`，satoshi 版块才直接由 Worker 服务；
5. **绑定正式域名**：在 Cloudflare 控制台为该 Worker 添加自定义域名（或 `client/wrangler.jsonc` 加 `routes`）；届时若想启用 satoshi 子域名架构，再把 `.env.local` 的 `VERCEL_ENV` 改回 `production` 并设置 `VERCEL_PROJECT_PRODUCTION_URL`；
6. CI 部署：`.github/workflows/deploy.yml` 支持在 GitHub Actions 中构建并部署，需在仓库变量中设 `DEPLOY_VIA_CI=true` 并配置 `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` secrets；默认关闭，本地 `pnpm run deploy` 是主要途径。

## 翻译协作指南

### 翻译 Mempool 文章

复制 `server/content/mempool/<slug>.en.md` 为 `<slug>.zh-cn.md`，翻译正文与 front matter 中的 `title`、`excerpt`，保留 `authors`、`date`、`slug`、`original_url` 等字段不变。完成后重启 API 并重新 `content initialize` 即可在 `/mempool/<slug>/` 看到中文版。

### 翻译图书馆藏书

同理：复制 `server/content/library/<slug>.en.md` 为 `<slug>.zh-cn.md`。

**两本多章节书**（`gradually-then-suddenly`、`the-ethics-of-money-production`）使用目录约定：

```
server/content/library_books/<书名>/
├── manifest.md            # 英文 manifest（canonical，不动）
├── content/<node>.md      # 英文章节
└── zh-cn/
    ├── manifest.md        # 中文 manifest（title + 完整 nodes 列表 + translators）
    └── content/<node>.md  # 中文章节；缺失的章节自动回退英文
```

导入器会为每个 locale 子目录建一份 `DocumentTranslation` 及其全部章节节点，为其他语言（如 `ja/`）翻译新书时沿用此结构即可。

### 翻译固定页面

`client/content/pages/zh-CN/` 下新增同名 `.md` 即可。

### 翻译 UI 字符串

`client/locales/zh-CN/common.json`，新增 key 需与 `locales/en/common.json` 保持一致。

### 术语表（建议统一）

| 英文 | 中文 |
| --- | --- |
| Bitcoin | 比特币 |
| whitepaper | 白皮书 |
| proof-of-work | 工作量证明 |
| hoard/hoarding | 囤积 |
| mempool | 内存池（Mempool） |
| hyperbitcoinization | 超级比特币化 |
| altcoin | 山寨币 |
| store of value | 价值储存 |
| unit of account | 记账单位 |
| medium of exchange | 交换媒介 |
| fractional reserve banking | 部分准备金银行制度 |
| Cypherpunks | 密码朋克 |
| Satoshi Nakamoto | 中本聪 |
