// src/assessment/assessment.module.ts
import { Module } from '@nestjs/common';
import { AssessmentsController } from './assessment.controller';
import { AssessmentsService } from './assessment.service';

@Module({
  imports: [], // PrismaModule is no longer needed; DbModule is Global
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
