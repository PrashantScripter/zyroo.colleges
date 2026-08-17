import type { MySql2Database } from 'drizzle-orm/mysql2';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogsService {
    private db;
    constructor(db: MySql2Database<typeof import('../db/schema')>);
    findAll(query: GetBlogsQueryDto): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            content: string | null;
            image: string;
            category: string;
            author: string;
            authorType: string;
            tags: string[];
            likes: number;
            views: number;
            publishedAt: Date | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        content: string | null;
        image: string;
        category: string;
        author: string;
        authorType: string;
        tags: string[];
        likes: number;
        views: number;
        publishedAt: Date | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    incrementViews(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        content: string | null;
        image: string;
        category: string;
        author: string;
        authorType: string;
        tags: string[];
        likes: number;
        views: number;
        publishedAt: Date | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    create(data: CreateBlogDto): Promise<{
        id: number;
        title: string;
        description: string;
        content: string | null;
        image: string;
        category: string;
        author: string;
        authorType: string;
        tags: string[];
        likes: number;
        views: number;
        publishedAt: Date | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
}
