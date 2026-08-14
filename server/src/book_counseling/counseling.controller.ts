import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CounselingService } from './counseling.service';
import { BookCounselingDto } from './dto/book-counseling.dto';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Post('book')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async bookSession(@Body() dto: BookCounselingDto) {
    return this.counselingService.bookSession(dto);
  }
}
