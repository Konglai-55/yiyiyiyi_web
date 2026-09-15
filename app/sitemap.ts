import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { newsArticles } from '@/lib/news';
import { listNews } from '@/lib/news-store';
export const dynamic = 'force-dynamic';
const siteUrl = 'https://yiyiyiyi.xn--fiqs8s';
type SitemapArticle = { slug: string; status: string; publishedAt: string; updatedAt: string };
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = ['', '/products', '/products/smoke', '/contact'].map(path => ({url:`${siteUrl}${path}`,lastModified:now,changeFrequency:path===''?'weekly' as const:'monthly' as const,priority:path===''?1:0.7}));
  const cases = projects.map(project => ({url:`${siteUrl}/cases/${project.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:0.75}));
  const fallbackDate = '2026-09-10';
  let articles: SitemapArticle[] = newsArticles.map(article => ({ slug: article.slug, status: 'published', publishedAt: fallbackDate, updatedAt: fallbackDate }));
  try { articles = await listNews(); } catch { /* The public sitemap remains usable during a storage restart. */ }
  const news = [{url:`${siteUrl}/news`,lastModified:now,changeFrequency:'weekly' as const,priority:0.8},...articles.filter(article=>article.status==='published').map(article=>({url:`${siteUrl}/news/${article.slug}`,lastModified:new Date(article.updatedAt||article.publishedAt),changeFrequency:'monthly' as const,priority:0.65}))];
  return [...staticPages,...cases,...news];
}
