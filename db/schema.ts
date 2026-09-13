import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const news = sqliteTable('news', {
  slug: text('slug').primaryKey(), title: text('title').notNull(), category: text('category').notNull(),
  summary: text('summary').notNull(), sections: text('sections').notNull(), source: text('source').notNull(),
  cover: text('cover').notNull().default(''), status: text('status').notNull().default('draft'),
  publishedAt: text('published_at').notNull(), updatedAt: text('updated_at').notNull(), version: integer('version').notNull().default(1),
},t=>[index('news_status_date').on(t.status,t.publishedAt)]);
export const settings = sqliteTable('settings',{key:text('key').primaryKey(),value:text('value').notNull()});
export const sessions = sqliteTable('admin_sessions',{token:text('token').primaryKey(),expires:integer('expires').notNull()});
export const rateLimits = sqliteTable('rate_limits',{key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
export const views = sqliteTable('page_views',{
  id:text('id').primaryKey(), day:text('day').notNull(), path:text('path').notNull(), visitor:text('visitor').notNull(),
  device:text('device').notNull(), referrer:text('referrer').notNull(), created:integer('created').notNull(),
},t=>[index('views_day_path').on(t.day,t.path)]);
