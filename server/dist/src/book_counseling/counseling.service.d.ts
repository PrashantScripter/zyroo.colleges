import type { MySql2Database } from 'drizzle-orm/mysql2';
import { BookCounselingDto } from './dto/book-counseling.dto';
export declare class CounselingService {
    private db;
    private brevoApiKey;
    constructor(db: MySql2Database<typeof import('../db/schema')>);
    bookSession(dto: BookCounselingDto): Promise<{
        success: boolean;
        message: string;
        bookingId: {
            id: number;
        };
    }>;
    private sendEmail;
    private sendConfirmationEmail;
    private sendAdminNotification;
}
