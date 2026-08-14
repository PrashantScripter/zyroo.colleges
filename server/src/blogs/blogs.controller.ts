import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAll(@Query() query: GetBlogsQueryDto) {
    return this.blogsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Increment views when someone views the detail
    await this.blogsService.incrementViews(id);
    return this.blogsService.findOne(id);
  }
}
