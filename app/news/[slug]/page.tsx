import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsShell from '@/components/news-shell';
import { listNews, type ManagedArticle } from '@/lib/news-store';
import { cache } from 'react';
export const dynamic='force-dynamic';

type Props = { params: Promise<{ slug: string }> };
const availableNews = cache(async (slug: string): Promise<{article:ManagedArticle|null;related:ManagedArticle[]}> => {
  const related=await listNews();
  return {article:related.find(a=>a.slug===slug)??null,related};
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await availableNews(slug);
  return article ? { title: `${article.title}｜新闻资讯｜壹壹壹壹`, description: article.summary } : { title: '文章未找到' };
}
export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const { article, related: newsArticles } = await availableNews(slug);
  if (!article) notFound();
  const newsDate = article.publishedAt;
  return <NewsShell>
    <header className="news-article-header c-shell"><nav aria-label="面包屑"><a href="/">首页</a><span>/</span><a href="/news">新闻资讯</a><span>/</span><span>{article.category}</span></nav><p className="news-kicker">{article.category}</p><h1>{article.title}</h1><div className="news-byline">壹壹壹壹网站编辑整理 <span>发布于 <time dateTime={newsDate}>{newsDate}</time></span></div></header>
    <div className="news-reading"><div className="c-shell news-reading-grid"><aside className="news-toc"><h2>本文内容</h2><nav aria-label="文章目录">{article.sections.map((section,index)=><a key={section.title} href={`#section-${index}`}>{section.title}</a>)}</nav><a className="news-back" href="/news">返回全部资讯</a></aside>
      <article className="news-body">{article.cover&&<img className="news-cover" src={article.cover} alt={article.title} />}<p className="news-lead">{article.summary}</p>{article.sections.map((section,index)=><section key={index} id={`section-${index}`}><h2>{section.title}</h2><p style={{whiteSpace:'pre-wrap'}}>{section.text}</p></section>)}
        {article.source.url&&<div className="news-source"><h2>参考来源</h2><p>{article.source.publisher}</p><a href={article.source.url} target="_blank" rel="noopener noreferrer">{article.source.title || article.source.url} ↗</a><p>涉及安装、值守与应急安排，应结合适用要求及现场实际落实。</p></div>}
        <nav className="news-related" aria-label="继续阅读"><h2>继续阅读</h2>{newsArticles.filter(item=>item.slug!==slug).slice(0,2).map(item=><a href={`/news/${item.slug}`} key={item.slug}>{item.title}<span>阅读文章 ↗</span></a>)}</nav>
      </article></div></div>
  </NewsShell>;
}
