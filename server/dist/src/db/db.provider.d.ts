import { Pool } from 'mysql2/promise';
import * as schema from './schema';
export declare const db: import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
    $client: Pool;
};
export declare const DRIZZLE: unique symbol;
