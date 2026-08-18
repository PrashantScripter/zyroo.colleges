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
        status: "open" | "upcoming" | "closed";
        id: string;
        name: string;
        createdAt: Date | null;
        mode: string;
        updatedAt: Date | null;
        stream: string;
        conductingBody: string;
        eligibility: string;
        targetColleges: string;
    }[]>;
    findOne(id: string): Promise<{
        timeline: {
            registration: string;
            examDates: string;
        };
        status: "open" | "upcoming" | "closed";
        id: string;
        name: string;
        createdAt: Date | null;
        mode: string;
        updatedAt: Date | null;
        stream: string;
        conductingBody: string;
        eligibility: string;
        targetColleges: string;
    }>;
}
