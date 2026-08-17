import { CounselingService } from './counseling.service';
import { BookCounselingDto } from './dto/book-counseling.dto';
export declare class CounselingController {
    private readonly counselingService;
    constructor(counselingService: CounselingService);
    bookSession(dto: BookCounselingDto): Promise<{
        success: boolean;
        message: string;
        bookingId: {
            id: number;
        };
    }>;
}
