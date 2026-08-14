import { PrismaService } from '../prisma/prisma.service';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: GetBlogsQueryDto): Promise<{
        data: unknown;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        image: string;
        title: string;
        description: string;
        content: string | null;
        author: string;
        authorType: string;
        tags: import("@prisma/client/runtime/client").JsonValue;
        likes: number;
        views: number;
        publishedAt: Date;
    }>;
    incrementViews(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        image: string;
        title: string;
        description: string;
        content: string | null;
        author: string;
        authorType: string;
        tags: import("@prisma/client/runtime/client").JsonValue;
        likes: number;
        views: number;
        publishedAt: Date;
    }>;
    create(data: CreateBlogDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        image: string;
        title: string;
        description: string;
        content: string | null;
        author: string;
        authorType: string;
        tags: import("@prisma/client/runtime/client").JsonValue;
        likes: number;
        views: number;
        publishedAt: Date;
    }>;
}
