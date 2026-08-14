import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

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

    // Build SQL WHERE clauses
    const whereClauses: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      whereClauses.push(
        `(title LIKE $${paramIndex} OR description LIKE $${paramIndex})`,
      );
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
      // MySQL JSON_CONTAINS to check if tag exists in JSON array
      whereClauses.push(`JSON_CONTAINS(tags, JSON_QUOTE($${paramIndex}))`);
      params.push(tag);
      paramIndex++;
    }

    const whereSQL =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const orderSQL = `ORDER BY ${sortBy} ${order.toUpperCase()}`;
    const offset = (page - 1) * limit;

    // Build raw SQL queries
    const querySQL = Prisma.sql`
      SELECT * FROM blogs
      ${Prisma.raw(whereSQL)}
      ${Prisma.raw(orderSQL)}
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countSQL = Prisma.sql`
      SELECT COUNT(*) as total FROM blogs
      ${Prisma.raw(whereSQL)}
    `;

    // Execute both queries in a transaction
    const [blogs, countResult] = await this.prisma.$transaction([
      this.prisma.$queryRaw(querySQL),
      this.prisma.$queryRaw(countSQL),
    ]);

    const total = Number((countResult as any)[0]?.total || 0);

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

  async findOne(id: number) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async incrementViews(id: number) {
    return this.prisma.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  // Admin create
  async create(data: CreateBlogDto) {
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
}
