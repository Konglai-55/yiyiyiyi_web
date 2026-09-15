import {register} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';
register('./typescript-loader.mjs',import.meta.url);
const {initializeNews,initialBundledNews,validateArticle,listNews}=await import('../lib/news-store.ts');
const {newsStorageConfig,readNewsObject}=await import('../lib/news-object-storage.ts');
const {prefix}=await newsStorageConfig();
if(await readNewsObject(`${prefix}/catalog.json`)) {
  console.log(`Existing catalog preserved (${(await listNews(true)).length} articles). No changes.`);
  process.exit(0);
}
const args=process.argv.slice(2);
let articles;
if(args[0]==='--sqlite' && args[1]) {
  const db=new DatabaseSync(args[1],{readOnly:true});
  const rows=db.prepare('SELECT * FROM news').all();
  articles=rows.map(row=>({...validateArticle({...row,sections:JSON.parse(row.sections),source:JSON.parse(row.source),publishedAt:row.published_at}),updatedAt:row.updated_at,version:row.version}));
  db.close();
}else if(args[0]==='--json' && args[1]) {
  const data=JSON.parse(await readFile(args[1],'utf8'));
  articles=Array.isArray(data)?data:data.articles;
}else if(args[0]==='--bundled') articles=initialBundledNews();
else throw new Error('Choose an explicit source: --sqlite <D1 sqlite file>, --json <export>, or --bundled. Never replace existing news silently.');
await mkdir('.private/news-migration',{recursive:true});
await writeFile(`.private/news-migration/source-${Date.now()}.json`,JSON.stringify({articles},null,2),{mode:0o600});
await initializeNews(articles);
console.log(`Initialized private news catalog: ${articles.length} articles. Source snapshot saved under .private/news-migration/.`);
