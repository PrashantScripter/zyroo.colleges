import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BlogModel = runtime.Types.Result.DefaultSelection<Prisma.$BlogPayload>;
export type AggregateBlog = {
    _count: BlogCountAggregateOutputType | null;
    _avg: BlogAvgAggregateOutputType | null;
    _sum: BlogSumAggregateOutputType | null;
    _min: BlogMinAggregateOutputType | null;
    _max: BlogMaxAggregateOutputType | null;
};
export type BlogAvgAggregateOutputType = {
    id: number | null;
    likes: number | null;
    views: number | null;
};
export type BlogSumAggregateOutputType = {
    id: number | null;
    likes: number | null;
    views: number | null;
};
export type BlogMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    content: string | null;
    image: string | null;
    category: string | null;
    author: string | null;
    authorType: string | null;
    likes: number | null;
    views: number | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BlogMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    content: string | null;
    image: string | null;
    category: string | null;
    author: string | null;
    authorType: string | null;
    likes: number | null;
    views: number | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BlogCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    content: number;
    image: number;
    category: number;
    author: number;
    authorType: number;
    tags: number;
    likes: number;
    views: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BlogAvgAggregateInputType = {
    id?: true;
    likes?: true;
    views?: true;
};
export type BlogSumAggregateInputType = {
    id?: true;
    likes?: true;
    views?: true;
};
export type BlogMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    content?: true;
    image?: true;
    category?: true;
    author?: true;
    authorType?: true;
    likes?: true;
    views?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BlogMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    content?: true;
    image?: true;
    category?: true;
    author?: true;
    authorType?: true;
    likes?: true;
    views?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BlogCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    content?: true;
    image?: true;
    category?: true;
    author?: true;
    authorType?: true;
    tags?: true;
    likes?: true;
    views?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BlogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput | Prisma.BlogOrderByWithRelationInput[];
    cursor?: Prisma.BlogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BlogCountAggregateInputType;
    _avg?: BlogAvgAggregateInputType;
    _sum?: BlogSumAggregateInputType;
    _min?: BlogMinAggregateInputType;
    _max?: BlogMaxAggregateInputType;
};
export type GetBlogAggregateType<T extends BlogAggregateArgs> = {
    [P in keyof T & keyof AggregateBlog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBlog[P]> : Prisma.GetScalarType<T[P], AggregateBlog[P]>;
};
export type BlogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithAggregationInput | Prisma.BlogOrderByWithAggregationInput[];
    by: Prisma.BlogScalarFieldEnum[] | Prisma.BlogScalarFieldEnum;
    having?: Prisma.BlogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BlogCountAggregateInputType | true;
    _avg?: BlogAvgAggregateInputType;
    _sum?: BlogSumAggregateInputType;
    _min?: BlogMinAggregateInputType;
    _max?: BlogMaxAggregateInputType;
};
export type BlogGroupByOutputType = {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image: string;
    category: string;
    author: string;
    authorType: string;
    tags: runtime.JsonValue;
    likes: number;
    views: number;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: BlogCountAggregateOutputType | null;
    _avg: BlogAvgAggregateOutputType | null;
    _sum: BlogSumAggregateOutputType | null;
    _min: BlogMinAggregateOutputType | null;
    _max: BlogMaxAggregateOutputType | null;
};
export type GetBlogGroupByPayload<T extends BlogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BlogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BlogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BlogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BlogGroupByOutputType[P]>;
}>>;
export type BlogWhereInput = {
    AND?: Prisma.BlogWhereInput | Prisma.BlogWhereInput[];
    OR?: Prisma.BlogWhereInput[];
    NOT?: Prisma.BlogWhereInput | Prisma.BlogWhereInput[];
    id?: Prisma.IntFilter<"Blog"> | number;
    title?: Prisma.StringFilter<"Blog"> | string;
    description?: Prisma.StringFilter<"Blog"> | string;
    content?: Prisma.StringNullableFilter<"Blog"> | string | null;
    image?: Prisma.StringFilter<"Blog"> | string;
    category?: Prisma.StringFilter<"Blog"> | string;
    author?: Prisma.StringFilter<"Blog"> | string;
    authorType?: Prisma.StringFilter<"Blog"> | string;
    tags?: Prisma.JsonFilter<"Blog">;
    likes?: Prisma.IntFilter<"Blog"> | number;
    views?: Prisma.IntFilter<"Blog"> | number;
    publishedAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
};
export type BlogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    author?: Prisma.SortOrder;
    authorType?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _relevance?: Prisma.BlogOrderByRelevanceInput;
};
export type BlogWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.BlogWhereInput | Prisma.BlogWhereInput[];
    OR?: Prisma.BlogWhereInput[];
    NOT?: Prisma.BlogWhereInput | Prisma.BlogWhereInput[];
    title?: Prisma.StringFilter<"Blog"> | string;
    description?: Prisma.StringFilter<"Blog"> | string;
    content?: Prisma.StringNullableFilter<"Blog"> | string | null;
    image?: Prisma.StringFilter<"Blog"> | string;
    category?: Prisma.StringFilter<"Blog"> | string;
    author?: Prisma.StringFilter<"Blog"> | string;
    authorType?: Prisma.StringFilter<"Blog"> | string;
    tags?: Prisma.JsonFilter<"Blog">;
    likes?: Prisma.IntFilter<"Blog"> | number;
    views?: Prisma.IntFilter<"Blog"> | number;
    publishedAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Blog"> | Date | string;
}, "id">;
export type BlogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    author?: Prisma.SortOrder;
    authorType?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BlogCountOrderByAggregateInput;
    _avg?: Prisma.BlogAvgOrderByAggregateInput;
    _max?: Prisma.BlogMaxOrderByAggregateInput;
    _min?: Prisma.BlogMinOrderByAggregateInput;
    _sum?: Prisma.BlogSumOrderByAggregateInput;
};
export type BlogScalarWhereWithAggregatesInput = {
    AND?: Prisma.BlogScalarWhereWithAggregatesInput | Prisma.BlogScalarWhereWithAggregatesInput[];
    OR?: Prisma.BlogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BlogScalarWhereWithAggregatesInput | Prisma.BlogScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Blog"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    content?: Prisma.StringNullableWithAggregatesFilter<"Blog"> | string | null;
    image?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    category?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    author?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    authorType?: Prisma.StringWithAggregatesFilter<"Blog"> | string;
    tags?: Prisma.JsonWithAggregatesFilter<"Blog">;
    likes?: Prisma.IntWithAggregatesFilter<"Blog"> | number;
    views?: Prisma.IntWithAggregatesFilter<"Blog"> | number;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"Blog"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Blog"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Blog"> | Date | string;
};
export type BlogCreateInput = {
    title: string;
    description: string;
    content?: string | null;
    image: string;
    category: string;
    author: string;
    authorType: string;
    tags: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: number;
    views?: number;
    publishedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogUncheckedCreateInput = {
    id?: number;
    title: string;
    description: string;
    content?: string | null;
    image: string;
    category: string;
    author: string;
    authorType: string;
    tags: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: number;
    views?: number;
    publishedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.StringFieldUpdateOperationsInput | string;
    authorType?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.StringFieldUpdateOperationsInput | string;
    authorType?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogCreateManyInput = {
    id?: number;
    title: string;
    description: string;
    content?: string | null;
    image: string;
    category: string;
    author: string;
    authorType: string;
    tags: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: number;
    views?: number;
    publishedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.StringFieldUpdateOperationsInput | string;
    authorType?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.StringFieldUpdateOperationsInput | string;
    authorType?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogOrderByRelevanceInput = {
    fields: Prisma.BlogOrderByRelevanceFieldEnum | Prisma.BlogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type BlogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    author?: Prisma.SortOrder;
    authorType?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
};
export type BlogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    author?: Prisma.SortOrder;
    authorType?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    author?: Prisma.SortOrder;
    authorType?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
};
export type BlogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    content?: boolean;
    image?: boolean;
    category?: boolean;
    author?: boolean;
    authorType?: boolean;
    tags?: boolean;
    likes?: boolean;
    views?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["blog"]>;
export type BlogSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    content?: boolean;
    image?: boolean;
    category?: boolean;
    author?: boolean;
    authorType?: boolean;
    tags?: boolean;
    likes?: boolean;
    views?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BlogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "content" | "image" | "category" | "author" | "authorType" | "tags" | "likes" | "views" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["blog"]>;
export type $BlogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Blog";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        description: string;
        content: string | null;
        image: string;
        category: string;
        author: string;
        authorType: string;
        tags: runtime.JsonValue;
        likes: number;
        views: number;
        publishedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["blog"]>;
    composites: {};
};
export type BlogGetPayload<S extends boolean | null | undefined | BlogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BlogPayload, S>;
export type BlogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BlogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BlogCountAggregateInputType | true;
};
export interface BlogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Blog'];
        meta: {
            name: 'Blog';
        };
    };
    findUnique<T extends BlogFindUniqueArgs>(args: Prisma.SelectSubset<T, BlogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BlogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BlogFindFirstArgs>(args?: Prisma.SelectSubset<T, BlogFindFirstArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BlogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BlogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BlogFindManyArgs>(args?: Prisma.SelectSubset<T, BlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BlogCreateArgs>(args: Prisma.SelectSubset<T, BlogCreateArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BlogCreateManyArgs>(args?: Prisma.SelectSubset<T, BlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends BlogDeleteArgs>(args: Prisma.SelectSubset<T, BlogDeleteArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BlogUpdateArgs>(args: Prisma.SelectSubset<T, BlogUpdateArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BlogDeleteManyArgs>(args?: Prisma.SelectSubset<T, BlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BlogUpdateManyArgs>(args: Prisma.SelectSubset<T, BlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends BlogUpsertArgs>(args: Prisma.SelectSubset<T, BlogUpsertArgs<ExtArgs>>): Prisma.Prisma__BlogClient<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BlogCountArgs>(args?: Prisma.Subset<T, BlogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BlogCountAggregateOutputType> : number>;
    aggregate<T extends BlogAggregateArgs>(args: Prisma.Subset<T, BlogAggregateArgs>): Prisma.PrismaPromise<GetBlogAggregateType<T>>;
    groupBy<T extends BlogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BlogGroupByArgs['orderBy'];
    } : {
        orderBy?: BlogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BlogFieldRefs;
}
export interface Prisma__BlogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BlogFieldRefs {
    readonly id: Prisma.FieldRef<"Blog", 'Int'>;
    readonly title: Prisma.FieldRef<"Blog", 'String'>;
    readonly description: Prisma.FieldRef<"Blog", 'String'>;
    readonly content: Prisma.FieldRef<"Blog", 'String'>;
    readonly image: Prisma.FieldRef<"Blog", 'String'>;
    readonly category: Prisma.FieldRef<"Blog", 'String'>;
    readonly author: Prisma.FieldRef<"Blog", 'String'>;
    readonly authorType: Prisma.FieldRef<"Blog", 'String'>;
    readonly tags: Prisma.FieldRef<"Blog", 'Json'>;
    readonly likes: Prisma.FieldRef<"Blog", 'Int'>;
    readonly views: Prisma.FieldRef<"Blog", 'Int'>;
    readonly publishedAt: Prisma.FieldRef<"Blog", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Blog", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Blog", 'DateTime'>;
}
export type BlogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where: Prisma.BlogWhereUniqueInput;
};
export type BlogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where: Prisma.BlogWhereUniqueInput;
};
export type BlogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput | Prisma.BlogOrderByWithRelationInput[];
    cursor?: Prisma.BlogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogScalarFieldEnum | Prisma.BlogScalarFieldEnum[];
};
export type BlogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput | Prisma.BlogOrderByWithRelationInput[];
    cursor?: Prisma.BlogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogScalarFieldEnum | Prisma.BlogScalarFieldEnum[];
};
export type BlogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput | Prisma.BlogOrderByWithRelationInput[];
    cursor?: Prisma.BlogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogScalarFieldEnum | Prisma.BlogScalarFieldEnum[];
};
export type BlogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlogCreateInput, Prisma.BlogUncheckedCreateInput>;
};
export type BlogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BlogCreateManyInput | Prisma.BlogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BlogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlogUpdateInput, Prisma.BlogUncheckedUpdateInput>;
    where: Prisma.BlogWhereUniqueInput;
};
export type BlogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BlogUpdateManyMutationInput, Prisma.BlogUncheckedUpdateManyInput>;
    where?: Prisma.BlogWhereInput;
    limit?: number;
};
export type BlogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where: Prisma.BlogWhereUniqueInput;
    create: Prisma.XOR<Prisma.BlogCreateInput, Prisma.BlogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BlogUpdateInput, Prisma.BlogUncheckedUpdateInput>;
};
export type BlogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    where: Prisma.BlogWhereUniqueInput;
};
export type BlogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogWhereInput;
    limit?: number;
};
export type BlogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogSelect<ExtArgs> | null;
    omit?: Prisma.BlogOmit<ExtArgs> | null;
};
