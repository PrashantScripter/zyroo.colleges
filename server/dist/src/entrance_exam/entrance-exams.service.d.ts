import { PrismaService } from '../prisma/prisma.service';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';
import { ExamStatus } from '../generated/prisma/client';
export declare class EntranceExamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        status: ExamStatus;
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
        status: ExamStatus;
        eligibility: string;
        targetColleges: string;
    }>;
    private transformToFrontendShape;
}
