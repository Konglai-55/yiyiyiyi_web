import {readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {DatabaseSync} from 'node:sqlite';
const directory='.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
for(const name of await readdir(directory)) {
  if(!name.endsWith('.sqlite')||name==='metadata.sqlite')continue;
  const db=new DatabaseSync(join(directory,name),{readOnly:true});
  const tables=db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('File:',join(directory,name));
  if(tables.some(t=>t.name==='news'))console.log(JSON.stringify(db.prepare('SELECT slug,status,version FROM news').all()));
  if(tables.some(t=>t.name==='page_views'))console.log('Historic pageviews:',db.prepare('SELECT COUNT(*) AS total FROM page_views').get().total);
  db.close();
}
