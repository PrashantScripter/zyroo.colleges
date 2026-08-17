import { Strategy } from 'passport-jwt';
import type { MySql2Database } from 'drizzle-orm/mysql2';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private db;
    constructor(db: MySql2Database<typeof import('../../db/schema')>);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        picture: string | null;
        role: "STUDENT" | "COUNSELOR" | "PARENT" | "COLLEGE_REP" | null;
        createdAt: Date | null;
    }>;
}
export {};
