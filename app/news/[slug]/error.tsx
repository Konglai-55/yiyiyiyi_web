'use client';
export default function NewsError({reset}:{reset:()=>void}) {return <main style={{padding:'120px 8%',minHeight:'70vh'}}><h1>文章暂时无法加载</h1><p>请稍后重试，不会影响已保存的文章。</p><button onClick={reset}>重新加载</button><p><a href="/news">返回新闻列表</a></p></main>;}
