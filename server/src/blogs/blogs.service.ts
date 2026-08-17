// src/blogs/blogs.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq, desc, asc, and, sql, SQL } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.provider';
import { blogs } from '../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../db/schema')>,
  ) {}

  async findAll(query: GetBlogsQueryDto) {
    const {
      search,
      category,
      author,
      tag,
      sortBy = 'publishedAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = query;

    // Build dynamic WHERE conditions
    const whereConditions: (SQL | undefined)[] = [];

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      whereConditions.push(
        sql`(title LIKE ${term} OR description LIKE ${term})`,
      );
    }

    if (category) {
      whereConditions.push(eq(blogs.category, category));
    }

    if (author) {
      whereConditions.push(eq(blogs.author, author));
    }

    if (tag) {
      // Use JSON_CONTAINS with raw SQL
      whereConditions.push(sql`JSON_CONTAINS(tags, JSON_QUOTE(${tag}))`);
    }

    // Build the final WHERE clause
    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Count total records (with the same filters)
    const countQuery = this.db
      .select({ total: sql<number>`count(*)` })
      .from(blogs)
      .$dynamic();

    if (whereClause) {
      countQuery.where(whereClause);
    }

    const [countResult] = await countQuery;
    const total = Number(countResult?.total) || 0;

    // Main query with sorting and pagination
    const orderFn = order === 'asc' ? asc : desc;
    const orderByCol =
      sortBy === 'publishedAt'
        ? blogs.publishedAt
        : sortBy === 'likes'
          ? blogs.likes
          : blogs.views;

    const dataQuery = this.db.select().from(blogs).$dynamic();

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

  async findOne(id: number) {
    const result = await this.db.select().from(blogs).where(eq(blogs.id, id));

    if (result.length === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return result[0];
  }

  async incrementViews(id: number) {
    await this.db
      .update(blogs)
      .set({ views: sql`views + 1` })
      .where(eq(blogs.id, id));

    // Return the updated blog
    const [updated] = await this.db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id));
    return updated;
  }

  async create(data: CreateBlogDto) {
    await this.db.insert(blogs).values({
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

    // Fetch the newly created blog (optional)
    const [newBlog] = await this.db
      .select()
      .from(blogs)
      .where(eq(blogs.title, data.title))
      .orderBy(desc(blogs.createdAt))
      .limit(1);
    return newBlog;
  }
}
