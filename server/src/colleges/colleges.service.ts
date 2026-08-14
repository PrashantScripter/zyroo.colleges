import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class CollegesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetCollegesQueryDto) {
    const {
      search,
      stream,
      category,
      state,
      city,
      courseKey,
      maxFees,
      minAvgPackage,
      rankTier,
      naacGrade,
      minRating,
      sortBy = 'nirf',
      page = 1,
      limit = 10,
    } = query;

    // 1. Build College Where Filters
    const where: Prisma.CollegeWhereInput = {};

    // Fuzzy search across Name and Location
    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      where.OR = [
        { name: { contains: searchTerm } },
        { location: { contains: searchTerm } },
      ];
    }

    // Stream & Category Filters
    if (stream && stream !== 'all') {
      where.stream = { equals: stream };
    }

    if (category && category !== 'all') {
      where.category = { equals: category };
    }

    // Location Filters (State & City)
    if (state && state !== 'all') {
      where.location = { contains: state };
    }

    if (city && city !== 'all') {
      where.location = {
        ...(typeof where.location === 'object' ? where.location : {}),
        contains: city,
      };
    }

    // Annual Fees Filter
    if (maxFees !== undefined && !isNaN(maxFees)) {
      where.annualFees = { lte: maxFees };
    }

    // Rating Filter
    if (minRating !== undefined && !isNaN(minRating)) {
      where.rating = { gte: minRating };
    }

    // NIRF Rank Tier Filter
    if (rankTier && rankTier !== 'all') {
      if (rankTier === 'top10') where.nirfRank = { lte: 10 };
      else if (rankTier === 'top30') where.nirfRank = { lte: 30 };
      else if (rankTier === 'top100') where.nirfRank = { lte: 100 };
    }

    // NAAC Grade Filter
    if (naacGrade && naacGrade !== 'all') {
      where.naacGrade = { equals: naacGrade };
    }

    // 2. Build Relational Course Filters
    const courseWhere: Prisma.CourseWhereInput = {};

    if (courseKey && courseKey !== 'all') {
      courseWhere.key = { equals: courseKey };
    }

    if (minAvgPackage !== undefined && !isNaN(minAvgPackage)) {
      courseWhere.avgPackage = { gte: minAvgPackage };
    }

    if (Object.keys(courseWhere).length > 0) {
      where.courses = {
        some: courseWhere,
      };
    }

    // 3. Determine Database Sorting
    let orderBy: Prisma.CollegeOrderByWithRelationInput | undefined;

    switch (sortBy) {
      case 'nirf':
        orderBy = { nirfRank: 'asc' };
        break;
      case 'fees_asc':
        orderBy = { annualFees: 'asc' };
        break;
      case 'fees_desc':
        orderBy = { annualFees: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'established':
        orderBy = { established: 'desc' };
        break;
      default:
        orderBy = { nirfRank: 'asc' };
    }

    // 4. Calculate Pagination Offset
    const skip = (page - 1) * limit;

    // 5. Query Database
    const [colleges, total] = await Promise.all([
      this.prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          courses: true,
        },
      }),
      this.prisma.college.count({ where }),
    ]);

    // 6. Custom In-Memory Sorting
    if (sortBy === 'naac') {
      const gradeWeights: Record<string, number> = { 'A++': 3, 'A+': 2, A: 1 };
      colleges.sort((a, b) => {
        const weightA = gradeWeights[a.naacGrade ?? ''] || 0;
        const weightB = gradeWeights[b.naacGrade ?? ''] || 0;
        return weightB - weightA;
      });
    } else if (sortBy === 'avgPackage') {
      colleges.sort((a, b) => {
        const maxPackageA = Math.max(
          ...a.courses.map((c) => c.avgPackage || 0),
          0,
        );
        const maxPackageB = Math.max(
          ...b.courses.map((c) => c.avgPackage || 0),
          0,
        );
        return maxPackageB - maxPackageA;
      });
    }

    return {
      data: colleges,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
      },
    });
  }
}
