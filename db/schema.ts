// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
export {};
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const companies=sqliteTable('companies',{id:text('id').primaryKey(),cnpj:text('cnpj').unique(),payload:text('payload').notNull(),version:integer('version').notNull().default(1)});
export const activities=sqliteTable('activities',{id:text('id').primaryKey(),companyId:text('company_id').notNull().references(()=>companies.id),payload:text('payload').notNull(),version:integer('version').notNull().default(1)});
export const followups=sqliteTable('followups',{id:text('id').primaryKey(),companyId:text('company_id').notNull().references(()=>companies.id),payload:text('payload').notNull()});
export const deals=sqliteTable('deals',{id:text('id').primaryKey(),companyId:text('company_id').notNull().references(()=>companies.id),payload:text('payload').notNull(),version:integer('version').notNull().default(1)});
export const orders=sqliteTable('orders',{id:text('id').primaryKey(),dealId:text('deal_id').notNull().unique().references(()=>deals.id),companyId:text('company_id').notNull().references(()=>companies.id),payload:text('payload').notNull()});
export const events=sqliteTable('events',{id:text('id').primaryKey(),companyId:text('company_id').notNull().references(()=>companies.id),payload:text('payload').notNull()});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),payload:text('payload').notNull()});
export const imports=sqliteTable('imports',{id:text('id').primaryKey(),payload:text('payload').notNull()});
