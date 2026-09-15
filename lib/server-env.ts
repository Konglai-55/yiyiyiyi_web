type Environment = Record<string,string | undefined> & {DB?: D1Database};
let workerConfig: Promise<{env?: Environment}> | undefined;

// A static cloudflare:workers import would crash the Node production entry point.
export async function config() {
  workerConfig ??= import('cloudflare:workers').then(worker=>({env:worker.env as unknown as Environment})).catch(() => ({}));
  const worker = await workerConfig;
  return { ...(typeof process !== 'undefined' ? process.env : {}), ...worker.env } as Environment;
}

type SqlValue = string | number | null;
export interface Statement {
  bind(...values: SqlValue[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{results: T[]}>;
  run(): Promise<{meta: {changes: number}}>;
}
export interface Database {
  prepare(sql: string): Statement;
  batch(statements: Statement[]): Promise<{results: Record<string, unknown>[]; meta: {changes: number}}[]>;
}
const runtimeImport = (name: string) => import(/* @vite-ignore */ name);
let nodeDatabase: Promise<Database> | undefined;
async function openNodeDatabase(): Promise<Database> {
  const env = await config();
  // Production must use a persistent volume, not a disposable release folder.
  if (!env.ADMIN_DATA_DIR) throw new Error('ADMIN_DATA_DIR must point to a persistent directory for Node startup');
  const { mkdir, chmod } = await runtimeImport('node:fs/promises') as typeof import('node:fs/promises');
  const path = await runtimeImport('node:path') as typeof import('node:path');
  const { DatabaseSync } = await runtimeImport('node:sqlite') as typeof import('node:sqlite');
  if (!path.isAbsolute(env.ADMIN_DATA_DIR)) throw new Error('ADMIN_DATA_DIR must be absolute');
  const dir = env.ADMIN_DATA_DIR;
  await mkdir(dir, {recursive: true, mode: 0o700});
  const file = path.join(dir, 'admin.sqlite');
  const sqlite = new DatabaseSync(file);
  await chmod(file, 0o600);
  sqlite.exec(`
    PRAGMA busy_timeout=5000;
    PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS admin_sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS page_views (
      id TEXT PRIMARY KEY, day TEXT NOT NULL, path TEXT NOT NULL, visitor TEXT NOT NULL,
      device TEXT NOT NULL, referrer TEXT NOT NULL, created INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS views_day_path ON page_views(day,path);
  `);
  class NodeStatement implements Statement {
    constructor(readonly sql: string, readonly values: SqlValue[] = []) {}
    bind(...values: SqlValue[]) { return new NodeStatement(this.sql, values); }
    async first<T>() { return (sqlite.prepare(this.sql).get(...this.values) ?? null) as T | null; }
    async all<T>() { return {results: sqlite.prepare(this.sql).all(...this.values) as T[]}; }
    async run() { return {meta: {changes: Number(sqlite.prepare(this.sql).run(...this.values).changes)}}; }
  }
  return {
    prepare: sql => new NodeStatement(sql),
    async batch(statements) {
      sqlite.exec('BEGIN IMMEDIATE');
      try {
        // Synchronous transaction: other requests cannot interleave on this connection.
        const results = statements.map(statement => {
          if (!(statement instanceof NodeStatement)) throw new Error('Foreign database statement');
          const prepared = sqlite.prepare(statement.sql);
          // Current batch callers use SELECT or plain DML; avoid columns(), unavailable in Node 22.13.
          if (/^\s*SELECT\b/i.test(statement.sql)) return {results: prepared.all(...statement.values), meta: {changes: 0}};
          return {results: [], meta: {changes: Number(prepared.run(...statement.values).changes)}};
        });
        sqlite.exec('COMMIT');
        return results;
      } catch (error) { sqlite.exec('ROLLBACK'); throw error; }
    },
  };
}
export async function db(): Promise<Database> {
  const binding = (await config()).DB;
  if (binding) return binding as unknown as Database;
  nodeDatabase ??= openNodeDatabase().catch(error => { nodeDatabase = undefined; throw error; });
  return nodeDatabase;
}
