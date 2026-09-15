import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import NewsShell from '@/components/news-shell';
import { listNews } from '@/lib/news-store';
export const dynamic='force-dynamic';

export const metadata: Metadata = { title: '新闻资讯｜智慧消防行业解读与安全科普｜壹壹壹壹', description: '关注智慧消防建设、烟感设备、校园与社区安全、消防控制室数字化管理。基于公开资料整理的行业解读与实用信息。' };

export default async function NewsPage() {
  const newsArticles = await listNews();
  const featured = newsArticles[0];
  return <NewsShell>
    <section className="news-intro c-shell"><p className="news-kicker">行业动态与消防知识</p><h1>新闻资讯</h1><p>关注智慧消防的应用与管理，了解设备、平台及日常防范工作。</p></section>
    <section className="news-content"><div className="c-shell">
      {featured&&<a className="news-feature" href={`/news/${featured.slug}`}><div>{featured.cover&&<img className="news-cover" src={featured.cover} alt={featured.title} />}<span className="news-category">{featured.category}</span><h2>{featured.title}</h2></div><div><p>{featured.summary}</p><span className="news-read">阅读文章 <ArrowUpRight size={20} /></span></div></a>}
      <div className="news-list-heading"><h2>全部文章</h2><span>{newsArticles.length} 篇文章</span></div>
      {!newsArticles.length&&<p>暂无已发布资讯，欢迎稍后再来。</p>}
      <div className="news-list">{newsArticles.map(article => <article key={article.slug}><div className="news-list-meta"><span className="news-category">{article.category}</span><time dateTime={article.publishedAt}>{article.publishedAt}</time></div><div><h3><a href={`/news/${article.slug}`}>{article.title}</a></h3><p>{article.summary}</p></div><a className="news-row-link" href={`/news/${article.slug}`} aria-label={`阅读：${article.title}`}><ArrowUpRight /></a></article>)}</div>
      <p className="news-editor-note">本栏目为公开资料整理与编辑解读，非原文转载。各篇附参考来源；历史实践的发生时间以来源原文为准。</p>
    </div></section>
  </NewsShell>;
}
