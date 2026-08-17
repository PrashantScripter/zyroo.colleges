import { BlogsService } from './blogs.service';
import { GetBlogsQueryDto } from './dto/get-blogs-query.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
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
}
