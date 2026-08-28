# 中本聪研究所中文版 - 重构与部署计划

## 项目目标
将 nakamotoinstitute.org 完全中文化，并部署到 Cloudflare Pages

## 架构策略
原项目 = FastAPI 后端 + Next.js 前端
重构为 = 纯静态 Next.js 站点（数据预提取为静态 JSON）

## 翻译工作清单

### ✅ 第一阶段：基础设施（已完成）
- [x] UI 界面字符串 (client/locales/zh-cn/common.json)
- [x] 8 个核心内容页面 (client/content/pages/zh-cn/)

### 🔄 第二阶段：核心内容翻译
- [ ] Mempool 文章 (76 篇)
- [ ] 图书馆文档 (140 篇)
- [ ] 中本聪邮件 (72 封)
- [ ] 中本聪论坛帖子 (3,845 篇 - 选取核心帖子)
- [ ] 中本聪语录 (162 条)
- [ ] 作者简介 (97 位)
- [ ] 播客描述

### 📦 第三阶段：静态化重构
- [ ] 从后端数据提取为静态 JSON
- [ ] 修改前端 API 层读取本地数据
- [ ] 配置 next static export

### 🚀 第四阶段：Cloudflare 部署
- [ ] wrangler 配置
- [ ] GitHub Actions 自动部署
- [ ] 自定义域名配置

## 文件命名规则
- 内容文件: `<slug>.zh-cn.md`
- 存放位置:
  - Mempool: server/content/mempool/
  - Library: server/content/library/
  - Pages: client/content/pages/zh-cn/
  - UI strings: client/locales/zh-cn/
