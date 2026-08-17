export declare class GetBlogsQueryDto {
    search?: string;
    category?: string;
    author?: string;
    tag?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
