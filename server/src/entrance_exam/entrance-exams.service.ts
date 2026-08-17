// src/entrance-exam/entrance-exams.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq, like, and, SQL, desc, sql } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.provider';
import { entranceExams, examStatusValues } from '../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';

// Type for the exam record as returned from the database
type ExamRecord = typeof entranceExams.$inferSelect;

@Injectable()
export class EntranceExamsService {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../db/schema')>,
  ) {}

  async findAll(queryDto: GetEntranceExamsDto) {
    const { search, stream, status, mode } = queryDto;

    // Build WHERE conditions
    const whereConditions: SQL[] = [];

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      whereConditions.push(
        sql`(name LIKE ${term} OR conductingBody LIKE ${term})`,
      );
    }

    if (stream && stream !== 'all') {
      whereConditions.push(eq(entranceExams.stream, stream));
    }

    if (status && status !== 'all') {
      // Validate that status is one of the allowed enum values
      if (examStatusValues.includes(status as any)) {
        whereConditions.push(eq(entranceExams.status, status as any));
      }
    }

    if (mode && mode !== 'all') {
      whereConditions.push(like(entranceExams.mode, `%${mode}%`));
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Query exams
    const exams = await this.db
      .select()
      .from(entranceExams)
      .where(whereClause)
      .orderBy(desc(entranceExams.createdAt));

    // Transform each exam to the frontend shape
    return exams.map((exam) => this.transformToFrontendShape(exam));
  }

  async findOne(id: string) {
    const [exam] = await this.db
      .select()
      .from(entranceExams)
      .where(eq(entranceExams.id, id));

    if (!exam) {
      throw new NotFoundException(`Entrance exam with ID "${id}" not found`);
    }

    return this.transformToFrontendShape(exam);
  }

  // Maps flat database record to nested object expected by frontend components
  private transformToFrontendShape(exam: ExamRecord) {
    const { registrationTimeline, examDatesTimeline, ...rest } = exam;
    return {
      ...rest,
      timeline: {
        registration: registrationTimeline,
        examDates: examDatesTimeline,
      },
    };
  }
}
