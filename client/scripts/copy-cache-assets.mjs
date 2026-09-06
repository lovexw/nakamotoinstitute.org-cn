// 将 OpenNext 生成的预渲染缓存（.open-next/cache/<BUILD_ID>/）复制到
// 静态资源目录的 cdn-cgi/_next_cache/ 下，供 staticAssetsIncrementalCache 读取。
// 参考 https://opennext.js.org/cloudflare/caching（完全静态站点方案）
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cacheDir = path.join(root, ".open-next", "cache");
const assetsCacheDir = path.join(root, ".open-next", "assets", "cdn-cgi", "_next_cache");

if (!existsSync(cacheDir)) {
  console.error("No .open-next/cache directory found. Run opennextjs-cloudflare build first.");
  process.exit(1);
}

const buildId = readFileSync(path.join(root, ".next", "BUILD_ID"), "utf-8").trim();

mkdirSync(assetsCacheDir, { recursive: true });

// 清理旧构建的缓存目录，避免资产目录无限增长，也防止 worker 误读旧页面。
for (const entry of readdirSync(assetsCacheDir)) {
  if (entry !== buildId) {
    rmSync(path.join(assetsCacheDir, entry), { recursive: true, force: true });
    console.log(`Removed stale cache for build ${entry}`);
  }
}

cpSync(path.join(cacheDir, buildId), path.join(assetsCacheDir, buildId), {
  recursive: true,
});

console.log(`Copied cache assets for build ${buildId} into .open-next/assets/cdn-cgi/_next_cache/`);
