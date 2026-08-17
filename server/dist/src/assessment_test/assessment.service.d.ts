import type { MySql2Database } from 'drizzle-orm/mysql2';
import { CollegeDto, QuestionResponseDto, AssessmentResultDto } from './dto/assessment.dto';
export declare class AssessmentsService {
    private db;
    constructor(db: MySql2Database<typeof import('../db/schema')>);
    findAllColleges(): Promise<CollegeDto[]>;
    findQuestionsByCollegeId(collegeId: number): Promise<QuestionResponseDto[]>;
    evaluateAssessment(collegeId: number, answers: Record<number, number>): Promise<AssessmentResultDto>;
}
