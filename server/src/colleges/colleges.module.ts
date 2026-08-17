// src/colleges/colleges.module.ts
import { Module } from '@nestjs/common';
import { CollegesController } from './colleges.controller';
import { CollegesService } from './colleges.service';

@Module({
  imports: [], // DbModule is global, no need to import
  controllers: [CollegesController],
  providers: [CollegesService],
})
export class CollegesModule {}
