// src/auth/dto/signup.dto.ts
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { roleValues, Role } from '../../db/schema'; // Import both the array and the type

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsEnum(roleValues, {
    // Use the runtime array here
    message:
      'Please select a valid profile type (STUDENT, COUNSELOR, PARENT, COLLEGE_REP)',
  })
  role!: Role; // Use the type for TypeScript

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Picture must be a valid URL address' })
  picture?: string;
}
