import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookCounselingDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  targetCollege!: string;

  @IsString()
  @IsNotEmpty()
  stream!: string;

  @IsDateString()
  @IsNotEmpty()
  preferredDate!: string;

  @IsString()
  @IsNotEmpty()
  preferredTime!: string;

  @IsOptional()
  @IsString()
  concerns?: string;

  @IsOptional()
  userId?: string; // if user is logged in
}
