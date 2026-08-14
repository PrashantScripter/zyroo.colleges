import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';

@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAll(@Query() query: GetCollegesQueryDto) {
    return this.collegesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const college = await this.collegesService.findOne(id);
    if (!college) {
      throw new NotFoundException(`College with ID ${id} not found`);
    }
    return college;
  }
}
