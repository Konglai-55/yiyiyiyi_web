import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const file = '.dev.vars';
const existing = await readFile(file,'utf8');
if (/^ADMIN_PASSWORD_HASH=/m.test(existing)) { console.log('Admin credentials already configured; left unchanged.'); process.exit(0); }
const password = randomBytes(18).toString('base64url');
const salt = randomBytes(16).toString('hex');
const iterations = 100000;
const hash = pbkdf2Sync(password,salt,iterations,32,'sha256').toString('hex');
await writeFile(file,existing+`\nADMIN_PASSWORD_HASH=${salt}:${iterations}:${hash}\nADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}\n`);
await mkdir('.private',{recursive:true});
await writeFile('.private/后台登录.txt',`后台地址：/admin\n初始密码：${password}\n\n请妥善保管。不要上传此文件或 .dev.vars 到公开仓库。\n部署时将 .dev.vars 配置为服务器端 secrets，并配置持久化 DB。\n`);
console.log('Generated credentials in .private/后台登录.txt (not printed).');
