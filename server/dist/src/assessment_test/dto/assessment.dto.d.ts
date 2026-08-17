export declare class CollegeDto {
    id: number;
    name: string;
    location: string;
    stream: string;
}
export declare class QuestionResponseDto {
    id: number;
    text: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}
export declare class GetQuestionsParamDto {
    collegeId: number;
}
export declare class SubmitAssessmentDto {
    collegeId: number;
    answers: Record<number, number>;
}
export declare class AssessmentResultDto {
    correct: number;
    total: number;
    percentage: number;
}
