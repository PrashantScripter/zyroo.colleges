// src/counseling/counseling.module.ts
import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';

@Module({
  imports: [], // DbModule is global, no need to import
  controllers: [CounselingController],
  providers: [CounselingService],
  exports: [CounselingService],
})
export class CounselingModule {}
