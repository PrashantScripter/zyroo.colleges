export declare class CreateBlogDto {
    title: string;
    description: string;
    content?: string;
    image: string;
    category: string;
    author: string;
    authorType: string;
    tags: string[];
    likes?: number;
    views?: number;
    publishedAt?: Date;
}
