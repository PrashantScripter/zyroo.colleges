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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_provider_1 = require("../db/db.provider");
const schema_1 = require("../db/schema");
let BlogsService = class BlogsService {
    db;
    constructor(db) {
        this.db = db;
    }
    async findAll(query) {
        const { search, category, author, tag, sortBy = 'publishedAt', order = 'desc', page = 1, limit = 10, } = query;
        const whereConditions = [];
        if (search && search.trim()) {
            const term = `%${search.trim()}%`;
            whereConditions.push((0, drizzle_orm_1.sql) `(title LIKE ${term} OR description LIKE ${term})`);
        }
        if (category) {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.blogs.category, category));
        }
        if (author) {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.blogs.author, author));
        }
        if (tag) {
            whereConditions.push((0, drizzle_orm_1.sql) `JSON_CONTAINS(tags, JSON_QUOTE(${tag}))`);
        }
        const whereClause = whereConditions.length > 0 ? (0, drizzle_orm_1.and)(...whereConditions) : undefined;
        const countQuery = this.db
            .select({ total: (0, drizzle_orm_1.sql) `count(*)` })
            .from(schema_1.blogs)
            .$dynamic();
        if (whereClause) {
            countQuery.where(whereClause);
        }
        const [countResult] = await countQuery;
        const total = Number(countResult?.total) || 0;
        const orderFn = order === 'asc' ? drizzle_orm_1.asc : drizzle_orm_1.desc;
        const orderByCol = sortBy === 'publishedAt'
            ? schema_1.blogs.publishedAt
            : sortBy === 'likes'
                ? schema_1.blogs.likes
                : schema_1.blogs.views;
        const dataQuery = this.db.select().from(schema_1.blogs).$dynamic();
        if (whereClause) {
            dataQuery.where(whereClause);
        }
        const blogsResult = await dataQuery
            .orderBy(orderFn(orderByCol))
            .limit(limit)
            .offset((page - 1) * limit);
        return {
            data: blogsResult,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const result = await this.db.select().from(schema_1.blogs).where((0, drizzle_orm_1.eq)(schema_1.blogs.id, id));
        if (result.length === 0) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return result[0];
    }
    async incrementViews(id) {
        await this.db
            .update(schema_1.blogs)
            .set({ views: (0, drizzle_orm_1.sql) `views + 1` })
            .where((0, drizzle_orm_1.eq)(schema_1.blogs.id, id));
        const [updated] = await this.db
            .select()
            .from(schema_1.blogs)
            .where((0, drizzle_orm_1.eq)(schema_1.blogs.id, id));
        return updated;
    }
    async create(data) {
        await this.db.insert(schema_1.blogs).values({
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
        });
        const [newBlog] = await this.db
            .select()
            .from(schema_1.blogs)
            .where((0, drizzle_orm_1.eq)(schema_1.blogs.title, data.title))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.blogs.createdAt))
            .limit(1);
        return newBlog;
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_provider_1.DRIZZLE)),
    __metadata("design:paramtypes", [Function])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map