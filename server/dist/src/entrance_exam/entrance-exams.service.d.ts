import type { MySql2Database } from 'drizzle-orm/mysql2';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';
export declare class EntranceExamsService {
    private db;
    constructor(db: MySql2Database<typeof import('../db/schema')>);
    findAll(queryDto: GetEntranceExamsDto): Promise<{
        timeline: {
            registration: string;
            examDates: string;
        };
        id: string;
        name: string;
        createdAt: Date | null;
        mode: string;
        updatedAt: Date | null;
        stream: string;
        conductingBody: string;
        status: "open" | "upcoming" | "closed";
        eligibility: string;
        targetColleges: string;
    }[]>;
    findOne(id: string): Promise<{
        timeline: {
            registration: string;
            examDates: string;
        };
        id: string;
        name: string;
        createdAt: Date | null;
        mode: string;
        updatedAt: Date | null;
        stream: string;
        conductingBody: string;
        status: "open" | "upcoming" | "closed";
        eligibility: string;
        targetColleges: string;
    }>;
    private transformToFrontendShape;
}
