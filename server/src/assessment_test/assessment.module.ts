import { Module } from '@nestjs/common';
import { AssessmentsController } from './assessment.controller';
import { AssessmentsService } from './assessment.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
