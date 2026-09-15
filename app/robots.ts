import type { MetadataRoute } from 'next';
const siteUrl = 'https://yiyiyiyi.xn--fiqs8s';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }], sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
