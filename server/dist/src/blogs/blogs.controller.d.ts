import { BlogsService } from './blogs.service';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
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
}
