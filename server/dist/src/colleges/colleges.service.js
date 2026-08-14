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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CollegesService = class CollegesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, stream, category, state, city, courseKey, maxFees, minAvgPackage, rankTier, naacGrade, minRating, sortBy = 'nirf', page = 1, limit = 10, } = query;
        const where = {};
        if (search && search.trim() !== '') {
            const searchTerm = search.trim();
            where.OR = [
                { name: { contains: searchTerm } },
                { location: { contains: searchTerm } },
            ];
        }
        if (stream && stream !== 'all') {
            where.stream = { equals: stream };
        }
        if (category && category !== 'all') {
            where.category = { equals: category };
        }
        if (state && state !== 'all') {
            where.location = { contains: state };
        }
        if (city && city !== 'all') {
            where.location = {
                ...(typeof where.location === 'object' ? where.location : {}),
                contains: city,
            };
        }
        if (maxFees !== undefined && !isNaN(maxFees)) {
            where.annualFees = { lte: maxFees };
        }
        if (minRating !== undefined && !isNaN(minRating)) {
            where.rating = { gte: minRating };
        }
        if (rankTier && rankTier !== 'all') {
            if (rankTier === 'top10')
                where.nirfRank = { lte: 10 };
            else if (rankTier === 'top30')
                where.nirfRank = { lte: 30 };
            else if (rankTier === 'top100')
                where.nirfRank = { lte: 100 };
        }
        if (naacGrade && naacGrade !== 'all') {
            where.naacGrade = { equals: naacGrade };
        }
        const courseWhere = {};
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
        let orderBy;
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
        const skip = (page - 1) * limit;
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
        if (sortBy === 'naac') {
            const gradeWeights = { 'A++': 3, 'A+': 2, A: 1 };
            colleges.sort((a, b) => {
                const weightA = gradeWeights[a.naacGrade ?? ''] || 0;
                const weightB = gradeWeights[b.naacGrade ?? ''] || 0;
                return weightB - weightA;
            });
        }
        else if (sortBy === 'avgPackage') {
            colleges.sort((a, b) => {
                const maxPackageA = Math.max(...a.courses.map((c) => c.avgPackage || 0), 0);
                const maxPackageB = Math.max(...b.courses.map((c) => c.avgPackage || 0), 0);
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
    async findOne(id) {
        return this.prisma.college.findUnique({
            where: { id },
            include: {
                courses: true,
            },
        });
    }
};
exports.CollegesService = CollegesService;
exports.CollegesService = CollegesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CollegesService);
//# sourceMappingURL=colleges.service.js.map