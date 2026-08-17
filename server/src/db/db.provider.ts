// src/db/db.provider.ts
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool, Pool } from 'mysql2/promise';
import * as schema from './schema';

// Create a connection pool using your DATABASE_URL
const pool: Pool = createPool({
  uri: process.env.DATABASE_URL,
});

// Initialize Drizzle with the pool and schema
export const db = drizzle(pool, { schema, mode: 'default' });

// Injection token for NestJS DI
export const DRIZZLE = Symbol('DRIZZLE');
