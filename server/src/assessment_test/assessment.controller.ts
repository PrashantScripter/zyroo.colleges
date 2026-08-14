import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AssessmentsService } from './assessment.service';
import {
  CollegeDto,
  QuestionResponseDto,
  SubmitAssessmentDto,
  AssessmentResultDto,
} from './dto/assessment.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get('colleges')
  async getColleges(): Promise<CollegeDto[]> {
    return this.assessmentsService.findAllColleges();
  }

  @Get('questions/:collegeId')
  async getQuestionsByCollege(
    @Param('collegeId', ParseIntPipe) collegeId: number,
  ): Promise<QuestionResponseDto[]> {
    return this.assessmentsService.findQuestionsByCollegeId(collegeId);
  }

  @Post('submit')
  @HttpCode(HttpStatus.OK)
  async submitAssessment(
    @Body() dto: SubmitAssessmentDto,
  ): Promise<AssessmentResultDto> {
    return this.assessmentsService.evaluateAssessment(
      dto.collegeId,
      dto.answers,
    );
  }
}
