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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../generated/prisma/client");
let BlogsService = class BlogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, category, author, tag, sortBy = 'publishedAt', order = 'desc', page = 1, limit = 10, } = query;
        const whereClauses = [];
        const params = [];
        let paramIndex = 1;
        if (search && search.trim()) {
            const term = `%${search.trim()}%`;
            whereClauses.push(`(title LIKE $${paramIndex} OR description LIKE $${paramIndex})`);
            params.push(term);
            paramIndex++;
        }
        if (category) {
            whereClauses.push(`category = $${paramIndex}`);
            params.push(category);
            paramIndex++;
        }
        if (author) {
            whereClauses.push(`author = $${paramIndex}`);
            params.push(author);
            paramIndex++;
        }
        if (tag) {
            whereClauses.push(`JSON_CONTAINS(tags, JSON_QUOTE($${paramIndex}))`);
            params.push(tag);
            paramIndex++;
        }
        const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
        const orderSQL = `ORDER BY ${sortBy} ${order.toUpperCase()}`;
        const offset = (page - 1) * limit;
        const querySQL = client_1.Prisma.sql `
      SELECT * FROM blogs
      ${client_1.Prisma.raw(whereSQL)}
      ${client_1.Prisma.raw(orderSQL)}
      LIMIT ${limit} OFFSET ${offset}
    `;
        const countSQL = client_1.Prisma.sql `
      SELECT COUNT(*) as total FROM blogs
      ${client_1.Prisma.raw(whereSQL)}
    `;
        const [blogs, countResult] = await this.prisma.$transaction([
            this.prisma.$queryRaw(querySQL),
            this.prisma.$queryRaw(countSQL),
        ]);
        const total = Number(countResult[0]?.total || 0);
        return {
            data: blogs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }
    async incrementViews(id) {
        return this.prisma.blog.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    }
    async create(data) {
        return this.prisma.blog.create({
            data: {
                title: data.title,
                description: data.description,
                content: data.content,
                image: data.image,
                category: data.category,
                author: data.author,
                authorType: data.authorType,
                tags: data.tags,
                likes: data.likes ?? 0,
                views: data.views ?? 0,
                publishedAt: data.publishedAt ?? new Date(),
            },
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map