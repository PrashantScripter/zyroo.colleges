import { EntranceExamsService } from './entrance-exams.service';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';
export declare class EntranceExamsController {
    private readonly entranceExamsService;
    constructor(entranceExamsService: EntranceExamsService);
    findAll(queryDto: GetEntranceExamsDto): Promise<{
        timeline: {
            registration: string;
            examDates: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        stream: string;
        conductingBody: string;
        mode: string;
        status: import("../generated/prisma/enums").ExamStatus;
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
        createdAt: Date;
        updatedAt: Date;
        stream: string;
        conductingBody: string;
        mode: string;
        status: import("../generated/prisma/enums").ExamStatus;
        eligibility: string;
        targetColleges: string;
    }>;
}
