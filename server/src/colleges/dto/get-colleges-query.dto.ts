import {
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetCollegesQueryDto {
  // ---------------------------------------------------------------------------
  // Search & Basic Filters
  // ---------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  search?: string; // Fuzzy match on College.name

  @IsOptional()
  @IsString()
  stream?: string; // Maps to College.stream

  @IsOptional()
  @IsString()
  category?: string; // Maps to College.category (e.g., "government", "private", "deemed")

  @IsOptional()
  @IsString()
  state?: string; // Filter against state portion of College.location

  @IsOptional()
  @IsString()
  city?: string; // Filter against city portion of College.location

  // ---------------------------------------------------------------------------
  // Course-Level Specific Filters (Relational Course Model)
  // ---------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  courseKey?: string; // Maps to Course.key (e.g., "cse", "ece")

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxFees?: number; // Filter against College.annualFees or Course.fees

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minAvgPackage?: number; // Filter against Course.avgPackage (in LPA)

  // ---------------------------------------------------------------------------
  // Ranking, Accreditation & Performance Metrics
  // ---------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  rankTier?: string; // 'top10' | 'top30' | 'top100' | 'all' (maps to College.nirfRank)

  @IsOptional()
  @IsString()
  naacGrade?: string; // Maps to College.naacGrade (e.g., "A++", "A+")

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number; // Filter against College.rating

  // ---------------------------------------------------------------------------
  // Sorting & Pagination
  // ---------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  @IsIn([
    'nirf',
    'naac',
    'fees_asc',
    'fees_desc',
    'rating',
    'avgPackage',
    'established',
  ])
  sortBy?: string; // Dynamic sort field selection

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
