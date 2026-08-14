import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';
import { Prisma, ExamStatus } from '../generated/prisma/client';

@Injectable()
export class EntranceExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(queryDto: GetEntranceExamsDto) {
    const { search, stream, status, mode } = queryDto;

    const where: Prisma.EntranceExamWhereInput = {};

    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      where.OR = [
        { name: { contains: searchTerm } },
        { conductingBody: { contains: searchTerm } },
      ];
    }

    if (stream && stream !== 'all') {
      where.stream = stream;
    }

    if (status && status !== 'all') {
      where.status = status as ExamStatus;
    }

    if (mode && mode !== 'all') {
      where.mode = { contains: mode };
    }

    const exams = await this.prisma.entranceExam.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return exams.map((exam) => this.transformToFrontendShape(exam));
  }

  async findOne(id: string) {
    const exam = await this.prisma.entranceExam.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException(`Entrance exam with ID "${id}" not found`);
    }

    return this.transformToFrontendShape(exam);
  }

  // Maps flat database record to nested object expected by frontend components
  private transformToFrontendShape(exam: Prisma.EntranceExamGetPayload<{}>) {
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
