import { PrismaService } from '../prisma/prisma.service';
import { BookCounselingDto } from './dto/book-counseling.dto';
export declare class CounselingService {
    private prisma;
    private brevoApiKey;
    constructor(prisma: PrismaService);
    bookSession(dto: BookCounselingDto): Promise<{
        success: boolean;
        message: string;
        bookingId: number;
    }>;
    private sendEmail;
    private sendConfirmationEmail;
    private sendAdminNotification;
}
