// src/colleges/colleges.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { eq, and, sql, SQL, asc, desc, like, gte, lte } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.provider';
import { colleges, courses } from '../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';

@Injectable()
export class CollegesService {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../db/schema')>,
  ) {}

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

    // ------------------------------
    // 1. Build WHERE conditions
    // ------------------------------
    const whereConditions: SQL[] = [];

    // Fuzzy search on name/location
    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      whereConditions.push(sql`(name LIKE ${term} OR location LIKE ${term})`);
    }

    if (stream && stream !== 'all') {
      whereConditions.push(eq(colleges.stream, stream));
    }

    if (category && category !== 'all') {
      whereConditions.push(eq(colleges.category, category));
    }

    if (state && state !== 'all') {
      whereConditions.push(like(colleges.location, `%${state}%`));
    }

    if (city && city !== 'all') {
      whereConditions.push(like(colleges.location, `%${city}%`));
    }

    if (maxFees !== undefined && !isNaN(maxFees)) {
      whereConditions.push(lte(colleges.annualFees, maxFees));
    }

    if (minRating !== undefined && !isNaN(minRating)) {
      whereConditions.push(gte(colleges.rating, minRating));
    }

    if (rankTier && rankTier !== 'all') {
      if (rankTier === 'top10') {
        whereConditions.push(lte(colleges.nirfRank, 10));
      } else if (rankTier === 'top30') {
        whereConditions.push(lte(colleges.nirfRank, 30));
      } else if (rankTier === 'top100') {
        whereConditions.push(lte(colleges.nirfRank, 100));
      }
    }

    if (naacGrade && naacGrade !== 'all') {
      whereConditions.push(eq(colleges.naacGrade, naacGrade));
    }

    // ------------------------------
    // 2. Course-level filters (EXISTS subquery)
    // ------------------------------
    let courseExistsCondition: SQL | undefined = undefined;

    // Build a subquery to check if any course matches the filters
    const courseFilters: SQL[] = [];
    if (courseKey && courseKey !== 'all') {
      courseFilters.push(eq(courses.key, courseKey));
    }
    if (minAvgPackage !== undefined && !isNaN(minAvgPackage)) {
      courseFilters.push(gte(courses.avgPackage, minAvgPackage));
    }

    if (courseFilters.length > 0) {
      // Build the EXISTS subquery
      const existsSubquery = sql`
        EXISTS (
          SELECT 1 FROM courses 
          WHERE courses.collegeId = colleges.id 
          AND ${and(...courseFilters)}
        )
      `;
      whereConditions.push(existsSubquery);
    }

    // Combine all conditions with AND
    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // ------------------------------
    // 3. Count total matching colleges
    // ------------------------------
    const countQuery = this.db
      .select({ total: sql<number>`count(*)` })
      .from(colleges)
      .$dynamic();

    if (whereClause) {
      countQuery.where(whereClause);
    }
    const [countResult] = await countQuery;
    const total = Number(countResult?.total) || 0;

    // ------------------------------
    // 4. Main query: fetch colleges with courses
    // ------------------------------
    // We'll fetch colleges and then courses separately to avoid complex JSON aggregation.
    // This is simpler and works reliably.

    const collegeQuery = this.db.select().from(colleges).$dynamic();

    if (whereClause) {
      collegeQuery.where(whereClause);
    }

    // Determine sorting
    let orderBy: any = undefined;
    const orderFn = sortBy === 'nirf' || sortBy === 'established' ? asc : desc;
    switch (sortBy) {
      case 'nirf':
        orderBy = asc(colleges.nirfRank);
        break;
      case 'fees_asc':
        orderBy = asc(colleges.annualFees);
        break;
      case 'fees_desc':
        orderBy = desc(colleges.annualFees);
        break;
      case 'rating':
        orderBy = desc(colleges.rating);
        break;
      case 'established':
        orderBy = desc(colleges.established);
        break;
      default:
        orderBy = asc(colleges.nirfRank);
    }

    const collegesResult = await collegeQuery
      .orderBy(orderBy)
      .limit(limit)
      .offset((page - 1) * limit);

    // ------------------------------
    // 5. Fetch courses for these colleges
    // ------------------------------
    const collegeIds = collegesResult.map((c) => c.id);
    let coursesMap: Record<number, any[]> = {};
    if (collegeIds.length > 0) {
      const allCourses = await this.db
        .select()
        .from(courses)
        .where(sql`collegeId IN (${collegeIds.join(',')})`);

      // Group courses by collegeId
      coursesMap = allCourses.reduce(
        (acc, curr) => {
          const key = curr.collegeId;
          if (!acc[key]) acc[key] = [];
          acc[key].push(curr);
          return acc;
        },
        {} as Record<number, any[]>,
      );
    }

    // Attach courses to colleges
    const collegesWithCourses = collegesResult.map((college) => ({
      ...college,
      courses: coursesMap[college.id] || [],
    }));

    // ------------------------------
    // 6. In-memory sorting (naac and avgPackage)
    // ------------------------------
    if (sortBy === 'naac') {
      const gradeWeights: Record<string, number> = { 'A++': 3, 'A+': 2, A: 1 };
      collegesWithCourses.sort((a, b) => {
        const weightA = gradeWeights[a.naacGrade ?? ''] || 0;
        const weightB = gradeWeights[b.naacGrade ?? ''] || 0;
        return weightB - weightA;
      });
    } else if (sortBy === 'avgPackage') {
      collegesWithCourses.sort((a, b) => {
        const maxA = Math.max(...a.courses.map((c) => c.avgPackage || 0), 0);
        const maxB = Math.max(...b.courses.map((c) => c.avgPackage || 0), 0);
        return maxB - maxA;
      });
    }

    return {
      data: collegesWithCourses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    // Fetch the college
    const [college] = await this.db
      .select()
      .from(colleges)
      .where(eq(colleges.id, id));

    if (!college) return null;

    // Fetch its courses
    const coursesResult = await this.db
      .select()
      .from(courses)
      .where(eq(courses.collegeId, id));

    return {
      ...college,
      courses: coursesResult,
    };
  }
}
