import {DatabaseSync} from 'node:sqlite';
import {resolve,join,isAbsolute} from 'node:path';
import {mkdir,chmod} from 'node:fs/promises';
const dir=process.env.ADMIN_DATA_DIR;
if(!dir||!isAbsolute(dir))throw new Error('Set ADMIN_DATA_DIR to the persistent data directory');
const output=resolve(process.argv[2]||join(dir,'backups',`admin-${Date.now()}.sqlite`));
const source=join(dir,'admin.sqlite');
if(output===resolve(source))throw new Error('Backup cannot overwrite the live database');
await mkdir(resolve(output,'..'),{recursive:true,mode:0o700});
const db=new DatabaseSync(source,{readOnly:true});
// VACUUM INTO creates a consistent snapshot including WAL contents, supported in Node 22.13.
db.exec(`VACUUM INTO '${output.replaceAll("'","''")}'`);
db.close();await chmod(output,0o600);
console.log('Consistent admin database backup created:',output);
