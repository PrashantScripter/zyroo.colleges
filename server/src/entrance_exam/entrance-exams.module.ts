// src/entrance-exam/entrance-exams.module.ts
import { Module } from '@nestjs/common';
import { EntranceExamsController } from './entrance-exams.controller';
import { EntranceExamsService } from './entrance-exams.service';

@Module({
  imports: [], // DbModule is global; if not, add DbModule
  controllers: [EntranceExamsController],
  providers: [EntranceExamsService],
  exports: [EntranceExamsService],
})
export class EntranceExamsModule {}
