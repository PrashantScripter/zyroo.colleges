import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsUrl()
  image!: string;

  @IsString()
  category!: string;

  @IsString()
  author!: string;

  @IsString()
  authorType!: string;

  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  likes?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  views?: number;

  @IsOptional()
  @Type(() => Date)
  publishedAt?: Date;
}
