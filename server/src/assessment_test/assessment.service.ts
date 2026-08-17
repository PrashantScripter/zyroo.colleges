// src/assessment/assessment.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq, asc } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.provider';
import { colleges, assessmentQuestions } from '../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import {
  CollegeDto,
  QuestionResponseDto,
  AssessmentResultDto,
} from './dto/assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../db/schema')>,
  ) {}

  async findAllColleges(): Promise<CollegeDto[]> {
    const results = await this.db
      .select({
        id: colleges.id,
        name: colleges.name,
        location: colleges.location,
        stream: colleges.stream,
      })
      .from(colleges)
      .orderBy(asc(colleges.id));

    return results;
  }

  async findQuestionsByCollegeId(
    collegeId: number,
  ): Promise<QuestionResponseDto[]> {
    const questions = await this.db
      .select({
        id: assessmentQuestions.id,
        text: assessmentQuestions.text,
        options: assessmentQuestions.options,
        correctOptionIndex: assessmentQuestions.correctOptionIndex,
        explanation: assessmentQuestions.explanation,
      })
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.collegeId, collegeId))
      .orderBy(asc(assessmentQuestions.id));

    return questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options as string[], // options is already typed as string[] from schema
      correctOptionIndex: q.correctOptionIndex,
      explanation: q.explanation,
    }));
  }

  async evaluateAssessment(
    collegeId: number,
    answers: Record<number, number>,
  ): Promise<AssessmentResultDto> {
    const questions = await this.db
      .select({
        id: assessmentQuestions.id,
        correctOptionIndex: assessmentQuestions.correctOptionIndex,
      })
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.collegeId, collegeId));

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
