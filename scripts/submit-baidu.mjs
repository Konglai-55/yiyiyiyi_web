import { register } from 'node:module';
register('./typescript-loader.mjs', import.meta.url);
const { listNews } = await import('../lib/news-store.ts');

const site = (process.env.APP_ORIGIN || 'https://yiyiyiyi.xn--fiqs8s').replace(/\/$/, '');
const token = process.env.BAIDU_PUSH_TOKEN?.trim();
const requestedSlug = process.argv[2]?.trim();

if (!token) {
  console.error('缺少 BAIDU_PUSH_TOKEN。请在百度搜索资源平台验证站点后，把主动推送 token 配置到部署环境。');
  process.exit(1);
}

const staticUrls = ['', '/products', '/products/smoke', '/contact', '/news'];
const caseSlugs = [
  'beijing-dashilan', 'beijing-tianqiao', 'fengtai-shuangshao', 'jinan-guanglu',
  'baidu-handan', 'handan-campus', 'nanjing-yijiangmen', 'shijiazhuang-no12',
];
const articles = (await listNews()).filter(article => article.status === 'published');
const selectedArticles = requestedSlug ? articles.filter(article => article.slug === requestedSlug) : articles;
if (requestedSlug && selectedArticles.length === 0) {
  console.error(`未找到已发布文章：${requestedSlug}`);
  process.exit(1);
}

const urls = [
  ...staticUrls.map(path => `${site}${path}`),
  ...caseSlugs.map(slug => `${site}/cases/${slug}`),
  ...selectedArticles.map(article => `${site}/news/${article.slug}`),
];

const response = await fetch(`https://data.zz.baidu.com/urls?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: urls.join('\n'),
});
const body = await response.text();
if (!response.ok) {
  console.error(`百度主动推送失败（HTTP ${response.status}）：${body}`);
  process.exit(1);
}
console.log(`已向百度提交 ${urls.length} 个 URL：${body}`);
