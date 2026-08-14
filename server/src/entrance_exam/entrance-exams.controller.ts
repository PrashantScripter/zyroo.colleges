import { Controller, Get, Query, Param } from '@nestjs/common';
import { EntranceExamsService } from './entrance-exams.service';
import { GetEntranceExamsDto } from './dto/get-entrance-exams.dto';

@Controller('entrance-exams')
export class EntranceExamsController {
  constructor(private readonly entranceExamsService: EntranceExamsService) {}

  @Get()
  async findAll(@Query() queryDto: GetEntranceExamsDto) {
    return this.entranceExamsService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entranceExamsService.findOne(id);
  }
}
