"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegesService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_provider_1 = require("../db/db.provider");
const schema_1 = require("../db/schema");
let CollegesService = class CollegesService {
    db;
    constructor(db) {
        this.db = db;
    }
    async findAll(query) {
        const { search, stream, category, state, city, courseKey, maxFees, minAvgPackage, rankTier, naacGrade, minRating, sortBy = 'nirf', page = 1, limit = 10, } = query;
        const whereConditions = [];
        if (search && search.trim() !== '') {
            const term = `%${search.trim()}%`;
            whereConditions.push((0, drizzle_orm_1.sql) `(name LIKE ${term} OR location LIKE ${term})`);
        }
        if (stream && stream !== 'all') {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.colleges.stream, stream));
        }
        if (category && category !== 'all') {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.colleges.category, category));
        }
        if (state && state !== 'all') {
            whereConditions.push((0, drizzle_orm_1.like)(schema_1.colleges.location, `%${state}%`));
        }
        if (city && city !== 'all') {
            whereConditions.push((0, drizzle_orm_1.like)(schema_1.colleges.location, `%${city}%`));
        }
        if (maxFees !== undefined && !isNaN(maxFees)) {
            whereConditions.push((0, drizzle_orm_1.lte)(schema_1.colleges.annualFees, maxFees));
        }
        if (minRating !== undefined && !isNaN(minRating)) {
            whereConditions.push((0, drizzle_orm_1.gte)(schema_1.colleges.rating, minRating));
        }
        if (rankTier && rankTier !== 'all') {
            if (rankTier === 'top10') {
                whereConditions.push((0, drizzle_orm_1.lte)(schema_1.colleges.nirfRank, 10));
            }
            else if (rankTier === 'top30') {
                whereConditions.push((0, drizzle_orm_1.lte)(schema_1.colleges.nirfRank, 30));
            }
            else if (rankTier === 'top100') {
                whereConditions.push((0, drizzle_orm_1.lte)(schema_1.colleges.nirfRank, 100));
            }
        }
        if (naacGrade && naacGrade !== 'all') {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.colleges.naacGrade, naacGrade));
        }
        let courseExistsCondition = undefined;
        const courseFilters = [];
        if (courseKey && courseKey !== 'all') {
            courseFilters.push((0, drizzle_orm_1.eq)(schema_1.courses.key, courseKey));
        }
        if (minAvgPackage !== undefined && !isNaN(minAvgPackage)) {
            courseFilters.push((0, drizzle_orm_1.gte)(schema_1.courses.avgPackage, minAvgPackage));
        }
        if (courseFilters.length > 0) {
            const existsSubquery = (0, drizzle_orm_1.sql) `
        EXISTS (
          SELECT 1 FROM courses 
          WHERE courses.collegeId = colleges.id 
          AND ${(0, drizzle_orm_1.and)(...courseFilters)}
        )
      `;
            whereConditions.push(existsSubquery);
        }
        const whereClause = whereConditions.length > 0 ? (0, drizzle_orm_1.and)(...whereConditions) : undefined;
        const countQuery = this.db
            .select({ total: (0, drizzle_orm_1.sql) `count(*)` })
            .from(schema_1.colleges)
            .$dynamic();
        if (whereClause) {
            countQuery.where(whereClause);
        }
        const [countResult] = await countQuery;
        const total = Number(countResult?.total) || 0;
        const collegeQuery = this.db.select().from(schema_1.colleges).$dynamic();
        if (whereClause) {
            collegeQuery.where(whereClause);
        }
        let orderBy = undefined;
        const orderFn = sortBy === 'nirf' || sortBy === 'established' ? drizzle_orm_1.asc : drizzle_orm_1.desc;
        switch (sortBy) {
            case 'nirf':
                orderBy = (0, drizzle_orm_1.asc)(schema_1.colleges.nirfRank);
                break;
            case 'fees_asc':
                orderBy = (0, drizzle_orm_1.asc)(schema_1.colleges.annualFees);
                break;
            case 'fees_desc':
                orderBy = (0, drizzle_orm_1.desc)(schema_1.colleges.annualFees);
                break;
            case 'rating':
                orderBy = (0, drizzle_orm_1.desc)(schema_1.colleges.rating);
                break;
            case 'established':
                orderBy = (0, drizzle_orm_1.desc)(schema_1.colleges.established);
                break;
            default:
                orderBy = (0, drizzle_orm_1.asc)(schema_1.colleges.nirfRank);
        }
        const collegesResult = await collegeQuery
            .orderBy(orderBy)
            .limit(limit)
            .offset((page - 1) * limit);
        const collegeIds = collegesResult.map((c) => c.id);
        let coursesMap = {};
        if (collegeIds.length > 0) {
            const allCourses = await this.db
                .select()
                .from(schema_1.courses)
                .where((0, drizzle_orm_1.sql) `collegeId IN (${collegeIds.join(',')})`);
            coursesMap = allCourses.reduce((acc, curr) => {
                const key = curr.collegeId;
                if (!acc[key])
                    acc[key] = [];
                acc[key].push(curr);
                return acc;
            }, {});
        }
        const collegesWithCourses = collegesResult.map((college) => ({
            ...college,
            courses: coursesMap[college.id] || [],
        }));
        if (sortBy === 'naac') {
            const gradeWeights = { 'A++': 3, 'A+': 2, A: 1 };
            collegesWithCourses.sort((a, b) => {
                const weightA = gradeWeights[a.naacGrade ?? ''] || 0;
                const weightB = gradeWeights[b.naacGrade ?? ''] || 0;
                return weightB - weightA;
            });
        }
        else if (sortBy === 'avgPackage') {
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
    async findOne(id) {
        const [college] = await this.db
            .select()
            .from(schema_1.colleges)
            .where((0, drizzle_orm_1.eq)(schema_1.colleges.id, id));
        if (!college)
            return null;
        const coursesResult = await this.db
            .select()
            .from(schema_1.courses)
            .where((0, drizzle_orm_1.eq)(schema_1.courses.collegeId, id));
        return {
            ...college,
            courses: coursesResult,
        };
    }
};
exports.CollegesService = CollegesService;
exports.CollegesService = CollegesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_provider_1.DRIZZLE)),
    __metadata("design:paramtypes", [Function])
], CollegesService);
//# sourceMappingURL=colleges.service.js.map