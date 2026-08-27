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
| UI 字符串（141 个 key） | `client/locales/zh-CN/common.json` | ✅ 完成 |
| 默认语言已切换为简体中文 | `client/i18n.ts`（`defaultLocale = "zh-cn"`） | ✅ 完成 |
| 核心页面 8 篇（关于、速成课程、RPOW、Hal Finney 等） | `client/content/pages/zh-CN/` | ✅ 完成 |
| Mempool 文章（127 篇待译） | `server/content/mempool/*.zh-cn.md` | ⏳ 已有 2 篇 |
| 图书馆藏书（139 本待译） | `server/content/library/*.zh-cn.md` | ⏳ 已有 1 本 |
| 播客节目说明 | `server/content/podcast_episodes/` | ⏳ 未开始 |
| 中本聪语录（quotes.json） | `server/data/quotes.json` | ⏳ 未开始 |

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

前端通过 [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) 适配器部署为 Cloudflare Worker。

```bash
cd client
pnpm build     # 需要先启动本地 API（见上）
pnpm deploy    # opennextjs-cloudflare build && wrangler deploy
```

首次部署前：

1. `npx wrangler login` 登录 Cloudflare 账号；
2. 如需绑定自定义域名，在 `client/wrangler.jsonc` 中添加 `routes` 或在 Cloudflare 控制台配置；
3. 构建时务必保证 API 可访问（数据在构建时固化进静态页面）。

## 翻译协作指南

### 翻译 Mempool 文章

复制 `server/content/mempool/<slug>.en.md` 为 `<slug>.zh-cn.md`，翻译正文与 front matter 中的 `title`、`excerpt`，保留 `authors`、`date`、`slug`、`original_url` 等字段不变。完成后重启 API 并重新 `content initialize` 即可在 `/mempool/<slug>/` 看到中文版。

### 翻译图书馆藏书

同理：复制 `server/content/library/<slug>.en.md` 为 `<slug>.zh-cn.md`。书籍为长篇内容，建议按章节（node）逐步翻译。

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
