import { env } from 'cloudflare:workers';
export function config() {
  return env as unknown as {DB:D1Database; S3_ENDPOINT:string; S3_BUCKET:string; S3_REGION:string; S3_PUBLIC_URL:string; S3_ACCESS_KEY_ID:string; S3_SECRET_ACCESS_KEY:string; ADMIN_PASSWORD_HASH:string; ADMIN_SESSION_SECRET:string};
}
export function db() { const binding=config().DB; if(!binding) throw new Error('Database is not configured'); return binding; }
