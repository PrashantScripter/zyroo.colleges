import { PrismaService } from '../prisma/prisma.service';
import { CollegeDto, QuestionResponseDto, AssessmentResultDto } from './dto/assessment.dto';
export declare class AssessmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllColleges(): Promise<CollegeDto[]>;
    findQuestionsByCollegeId(collegeId: number): Promise<QuestionResponseDto[]>;
    evaluateAssessment(collegeId: number, answers: Record<number, number>): Promise<AssessmentResultDto>;
}
