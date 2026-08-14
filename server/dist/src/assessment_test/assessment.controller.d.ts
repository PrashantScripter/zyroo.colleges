import { AssessmentsService } from './assessment.service';
import { CollegeDto, QuestionResponseDto, SubmitAssessmentDto, AssessmentResultDto } from './dto/assessment.dto';
export declare class AssessmentsController {
    private readonly assessmentsService;
    constructor(assessmentsService: AssessmentsService);
    getColleges(): Promise<CollegeDto[]>;
    getQuestionsByCollege(collegeId: number): Promise<QuestionResponseDto[]>;
    submitAssessment(dto: SubmitAssessmentDto): Promise<AssessmentResultDto>;
}
