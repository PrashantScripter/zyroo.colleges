import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust import path if needed
import {
  CollegeDto,
  QuestionResponseDto,
  AssessmentResultDto,
} from './dto/assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllColleges(): Promise<CollegeDto[]> {
    return this.prisma.college.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        location: true,
        stream: true,
      },
    });
  }

  async findQuestionsByCollegeId(
    collegeId: number,
  ): Promise<QuestionResponseDto[]> {
    const questions = await this.prisma.assessmentQuestion.findMany({
      where: { collegeId },
      orderBy: { id: 'asc' },
    });

    return questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options as string[],
      correctOptionIndex: q.correctOptionIndex,
      explanation: q.explanation,
    }));
  }

  async evaluateAssessment(
    collegeId: number,
    answers: Record<number, number>,
  ): Promise<AssessmentResultDto> {
    const questions = await this.prisma.assessmentQuestion.findMany({
      where: { collegeId },
      select: {
        id: true,
        correctOptionIndex: true,
      },
    });

    if (questions.length === 0) {
      throw new NotFoundException(
        `No assessment questions found for College ID ${collegeId}`,
      );
    }

    let correctCount = 0;
    questions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (
        selectedOption !== undefined &&
        selectedOption === q.correctOptionIndex
      ) {
        correctCount++;
      }
    });

    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    return {
      correct: correctCount,
      total,
      percentage,
    };
  }
}
