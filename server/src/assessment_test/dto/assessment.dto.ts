import { IsNotEmpty, IsNumber, IsObject, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CollegeDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  stream!: string;
}

export class QuestionResponseDto {
  id!: number;
  text!: string;
  options!: string[];
  correctOptionIndex!: number;
  explanation!: string;
}

export class GetQuestionsParamDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  collegeId!: number;
}

export class SubmitAssessmentDto {
  @IsNumber()
  @Min(1)
  collegeId!: number;

  @IsObject()
  @IsNotEmpty()
  answers!: Record<number, number>; // Map of questionId -> selectedOptionIndex
}

export class AssessmentResultDto {
  correct!: number;
  total!: number;
  percentage!: number;
}
