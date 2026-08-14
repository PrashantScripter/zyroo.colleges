import { Module } from '@nestjs/common';
import { EntranceExamsController } from './entrance-exams.controller';
import { EntranceExamsService } from './entrance-exams.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntranceExamsController],
  providers: [EntranceExamsService],
  exports: [EntranceExamsService],
})
export class EntranceExamsModule {}
