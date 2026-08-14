import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CollegesModule } from './colleges/colleges.module';
import { EntranceExamsModule } from './entrance_exam/entrance-exams.module';
import { AssessmentsModule } from './assessment_test/assessment.module';
import { BlogsModule } from './blogs/blogs.module';
import { CounselingModule } from './book_counseling/counseling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes process.env available everywhere
    }),
    PrismaModule,
    AuthModule,
    CollegesModule,
    EntranceExamsModule,
    AssessmentsModule,
    BlogsModule,
    CounselingModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
