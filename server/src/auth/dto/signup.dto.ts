import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/client';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsEnum(Role, {
    message:
      'Please select a valid profile type (STUDENT, COUNSELOR, PARENT, COLLEGE_REP)',
  })
  role!: Role;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Picture must be a valid URL address' })
  picture?: string;
}
