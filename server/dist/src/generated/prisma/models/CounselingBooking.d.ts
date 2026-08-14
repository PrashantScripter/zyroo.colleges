import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CounselingBookingModel = runtime.Types.Result.DefaultSelection<Prisma.$CounselingBookingPayload>;
export type AggregateCounselingBooking = {
    _count: CounselingBookingCountAggregateOutputType | null;
    _avg: CounselingBookingAvgAggregateOutputType | null;
    _sum: CounselingBookingSumAggregateOutputType | null;
    _min: CounselingBookingMinAggregateOutputType | null;
    _max: CounselingBookingMaxAggregateOutputType | null;
};
export type CounselingBookingAvgAggregateOutputType = {
    id: number | null;
};
export type CounselingBookingSumAggregateOutputType = {
    id: number | null;
};
export type CounselingBookingMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    targetCollege: string | null;
    stream: string | null;
    preferredDate: Date | null;
    preferredTime: string | null;
    concerns: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CounselingBookingMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    targetCollege: string | null;
    stream: string | null;
    preferredDate: Date | null;
    preferredTime: string | null;
    concerns: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CounselingBookingCountAggregateOutputType = {
    id: number;
    name: number;
    phone: number;
    email: number;
    targetCollege: number;
    stream: number;
    preferredDate: number;
    preferredTime: number;
    concerns: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CounselingBookingAvgAggregateInputType = {
    id?: true;
};
export type CounselingBookingSumAggregateInputType = {
    id?: true;
};
export type CounselingBookingMinAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    targetCollege?: true;
    stream?: true;
    preferredDate?: true;
    preferredTime?: true;
    concerns?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CounselingBookingMaxAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    targetCollege?: true;
    stream?: true;
    preferredDate?: true;
    preferredTime?: true;
    concerns?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CounselingBookingCountAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    targetCollege?: true;
    stream?: true;
    preferredDate?: true;
    preferredTime?: true;
    concerns?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CounselingBookingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CounselingBookingWhereInput;
    orderBy?: Prisma.CounselingBookingOrderByWithRelationInput | Prisma.CounselingBookingOrderByWithRelationInput[];
    cursor?: Prisma.CounselingBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CounselingBookingCountAggregateInputType;
    _avg?: CounselingBookingAvgAggregateInputType;
    _sum?: CounselingBookingSumAggregateInputType;
    _min?: CounselingBookingMinAggregateInputType;
    _max?: CounselingBookingMaxAggregateInputType;
};
export type GetCounselingBookingAggregateType<T extends CounselingBookingAggregateArgs> = {
    [P in keyof T & keyof AggregateCounselingBooking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCounselingBooking[P]> : Prisma.GetScalarType<T[P], AggregateCounselingBooking[P]>;
};
export type CounselingBookingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CounselingBookingWhereInput;
    orderBy?: Prisma.CounselingBookingOrderByWithAggregationInput | Prisma.CounselingBookingOrderByWithAggregationInput[];
    by: Prisma.CounselingBookingScalarFieldEnum[] | Prisma.CounselingBookingScalarFieldEnum;
    having?: Prisma.CounselingBookingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CounselingBookingCountAggregateInputType | true;
    _avg?: CounselingBookingAvgAggregateInputType;
    _sum?: CounselingBookingSumAggregateInputType;
    _min?: CounselingBookingMinAggregateInputType;
    _max?: CounselingBookingMaxAggregateInputType;
};
export type CounselingBookingGroupByOutputType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    targetCollege: string;
    stream: string;
    preferredDate: Date;
    preferredTime: string;
    concerns: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CounselingBookingCountAggregateOutputType | null;
    _avg: CounselingBookingAvgAggregateOutputType | null;
    _sum: CounselingBookingSumAggregateOutputType | null;
    _min: CounselingBookingMinAggregateOutputType | null;
    _max: CounselingBookingMaxAggregateOutputType | null;
};
export type GetCounselingBookingGroupByPayload<T extends CounselingBookingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CounselingBookingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CounselingBookingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CounselingBookingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CounselingBookingGroupByOutputType[P]>;
}>>;
export type CounselingBookingWhereInput = {
    AND?: Prisma.CounselingBookingWhereInput | Prisma.CounselingBookingWhereInput[];
    OR?: Prisma.CounselingBookingWhereInput[];
    NOT?: Prisma.CounselingBookingWhereInput | Prisma.CounselingBookingWhereInput[];
    id?: Prisma.IntFilter<"CounselingBooking"> | number;
    name?: Prisma.StringFilter<"CounselingBooking"> | string;
    phone?: Prisma.StringFilter<"CounselingBooking"> | string;
    email?: Prisma.StringFilter<"CounselingBooking"> | string;
    targetCollege?: Prisma.StringFilter<"CounselingBooking"> | string;
    stream?: Prisma.StringFilter<"CounselingBooking"> | string;
    preferredDate?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
    preferredTime?: Prisma.StringFilter<"CounselingBooking"> | string;
    concerns?: Prisma.StringNullableFilter<"CounselingBooking"> | string | null;
    userId?: Prisma.StringNullableFilter<"CounselingBooking"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
};
export type CounselingBookingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    targetCollege?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    preferredDate?: Prisma.SortOrder;
    preferredTime?: Prisma.SortOrder;
    concerns?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _relevance?: Prisma.CounselingBookingOrderByRelevanceInput;
};
export type CounselingBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.CounselingBookingWhereInput | Prisma.CounselingBookingWhereInput[];
    OR?: Prisma.CounselingBookingWhereInput[];
    NOT?: Prisma.CounselingBookingWhereInput | Prisma.CounselingBookingWhereInput[];
    name?: Prisma.StringFilter<"CounselingBooking"> | string;
    phone?: Prisma.StringFilter<"CounselingBooking"> | string;
    email?: Prisma.StringFilter<"CounselingBooking"> | string;
    targetCollege?: Prisma.StringFilter<"CounselingBooking"> | string;
    stream?: Prisma.StringFilter<"CounselingBooking"> | string;
    preferredDate?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
    preferredTime?: Prisma.StringFilter<"CounselingBooking"> | string;
    concerns?: Prisma.StringNullableFilter<"CounselingBooking"> | string | null;
    userId?: Prisma.StringNullableFilter<"CounselingBooking"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CounselingBooking"> | Date | string;
}, "id">;
export type CounselingBookingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    targetCollege?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    preferredDate?: Prisma.SortOrder;
    preferredTime?: Prisma.SortOrder;
    concerns?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CounselingBookingCountOrderByAggregateInput;
    _avg?: Prisma.CounselingBookingAvgOrderByAggregateInput;
    _max?: Prisma.CounselingBookingMaxOrderByAggregateInput;
    _min?: Prisma.CounselingBookingMinOrderByAggregateInput;
    _sum?: Prisma.CounselingBookingSumOrderByAggregateInput;
};
export type CounselingBookingScalarWhereWithAggregatesInput = {
    AND?: Prisma.CounselingBookingScalarWhereWithAggregatesInput | Prisma.CounselingBookingScalarWhereWithAggregatesInput[];
    OR?: Prisma.CounselingBookingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CounselingBookingScalarWhereWithAggregatesInput | Prisma.CounselingBookingScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"CounselingBooking"> | number;
    name?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    email?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    targetCollege?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    stream?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    preferredDate?: Prisma.DateTimeWithAggregatesFilter<"CounselingBooking"> | Date | string;
    preferredTime?: Prisma.StringWithAggregatesFilter<"CounselingBooking"> | string;
    concerns?: Prisma.StringNullableWithAggregatesFilter<"CounselingBooking"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"CounselingBooking"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CounselingBooking"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CounselingBooking"> | Date | string;
};
export type CounselingBookingCreateInput = {
    name: string;
    phone: string;
    email: string;
    targetCollege: string;
    stream: string;
    preferredDate: Date | string;
    preferredTime: string;
    concerns?: string | null;
    userId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CounselingBookingUncheckedCreateInput = {
    id?: number;
    name: string;
    phone: string;
    email: string;
    targetCollege: string;
    stream: string;
    preferredDate: Date | string;
    preferredTime: string;
    concerns?: string | null;
    userId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CounselingBookingUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCollege?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    preferredDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    preferredTime?: Prisma.StringFieldUpdateOperationsInput | string;
    concerns?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CounselingBookingUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCollege?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    preferredDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    preferredTime?: Prisma.StringFieldUpdateOperationsInput | string;
    concerns?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CounselingBookingCreateManyInput = {
    id?: number;
    name: string;
    phone: string;
    email: string;
    targetCollege: string;
    stream: string;
    preferredDate: Date | string;
    preferredTime: string;
    concerns?: string | null;
    userId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CounselingBookingUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCollege?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    preferredDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    preferredTime?: Prisma.StringFieldUpdateOperationsInput | string;
    concerns?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CounselingBookingUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCollege?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    preferredDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    preferredTime?: Prisma.StringFieldUpdateOperationsInput | string;
    concerns?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CounselingBookingOrderByRelevanceInput = {
    fields: Prisma.CounselingBookingOrderByRelevanceFieldEnum | Prisma.CounselingBookingOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type CounselingBookingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    targetCollege?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    preferredDate?: Prisma.SortOrder;
    preferredTime?: Prisma.SortOrder;
    concerns?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CounselingBookingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type CounselingBookingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    targetCollege?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    preferredDate?: Prisma.SortOrder;
    preferredTime?: Prisma.SortOrder;
    concerns?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CounselingBookingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    targetCollege?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    preferredDate?: Prisma.SortOrder;
    preferredTime?: Prisma.SortOrder;
    concerns?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CounselingBookingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type CounselingBookingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    targetCollege?: boolean;
    stream?: boolean;
    preferredDate?: boolean;
    preferredTime?: boolean;
    concerns?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["counselingBooking"]>;
export type CounselingBookingSelectScalar = {
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    targetCollege?: boolean;
    stream?: boolean;
    preferredDate?: boolean;
    preferredTime?: boolean;
    concerns?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CounselingBookingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "phone" | "email" | "targetCollege" | "stream" | "preferredDate" | "preferredTime" | "concerns" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["counselingBooking"]>;
export type $CounselingBookingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CounselingBooking";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        phone: string;
        email: string;
        targetCollege: string;
        stream: string;
        preferredDate: Date;
        preferredTime: string;
        concerns: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["counselingBooking"]>;
    composites: {};
};
export type CounselingBookingGetPayload<S extends boolean | null | undefined | CounselingBookingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload, S>;
export type CounselingBookingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CounselingBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CounselingBookingCountAggregateInputType | true;
};
export interface CounselingBookingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CounselingBooking'];
        meta: {
            name: 'CounselingBooking';
        };
    };
    findUnique<T extends CounselingBookingFindUniqueArgs>(args: Prisma.SelectSubset<T, CounselingBookingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CounselingBookingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CounselingBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CounselingBookingFindFirstArgs>(args?: Prisma.SelectSubset<T, CounselingBookingFindFirstArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CounselingBookingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CounselingBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CounselingBookingFindManyArgs>(args?: Prisma.SelectSubset<T, CounselingBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CounselingBookingCreateArgs>(args: Prisma.SelectSubset<T, CounselingBookingCreateArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CounselingBookingCreateManyArgs>(args?: Prisma.SelectSubset<T, CounselingBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends CounselingBookingDeleteArgs>(args: Prisma.SelectSubset<T, CounselingBookingDeleteArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CounselingBookingUpdateArgs>(args: Prisma.SelectSubset<T, CounselingBookingUpdateArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CounselingBookingDeleteManyArgs>(args?: Prisma.SelectSubset<T, CounselingBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CounselingBookingUpdateManyArgs>(args: Prisma.SelectSubset<T, CounselingBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends CounselingBookingUpsertArgs>(args: Prisma.SelectSubset<T, CounselingBookingUpsertArgs<ExtArgs>>): Prisma.Prisma__CounselingBookingClient<runtime.Types.Result.GetResult<Prisma.$CounselingBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CounselingBookingCountArgs>(args?: Prisma.Subset<T, CounselingBookingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CounselingBookingCountAggregateOutputType> : number>;
    aggregate<T extends CounselingBookingAggregateArgs>(args: Prisma.Subset<T, CounselingBookingAggregateArgs>): Prisma.PrismaPromise<GetCounselingBookingAggregateType<T>>;
    groupBy<T extends CounselingBookingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CounselingBookingGroupByArgs['orderBy'];
    } : {
        orderBy?: CounselingBookingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CounselingBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCounselingBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CounselingBookingFieldRefs;
}
export interface Prisma__CounselingBookingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CounselingBookingFieldRefs {
    readonly id: Prisma.FieldRef<"CounselingBooking", 'Int'>;
    readonly name: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly phone: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly email: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly targetCollege: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly stream: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly preferredDate: Prisma.FieldRef<"CounselingBooking", 'DateTime'>;
    readonly preferredTime: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly concerns: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly userId: Prisma.FieldRef<"CounselingBooking", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CounselingBooking", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CounselingBooking", 'DateTime'>;
}
export type CounselingBookingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where: Prisma.CounselingBookingWhereUniqueInput;
};
export type CounselingBookingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where: Prisma.CounselingBookingWhereUniqueInput;
};
export type CounselingBookingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where?: Prisma.CounselingBookingWhereInput;
    orderBy?: Prisma.CounselingBookingOrderByWithRelationInput | Prisma.CounselingBookingOrderByWithRelationInput[];
    cursor?: Prisma.CounselingBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CounselingBookingScalarFieldEnum | Prisma.CounselingBookingScalarFieldEnum[];
};
export type CounselingBookingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where?: Prisma.CounselingBookingWhereInput;
    orderBy?: Prisma.CounselingBookingOrderByWithRelationInput | Prisma.CounselingBookingOrderByWithRelationInput[];
    cursor?: Prisma.CounselingBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CounselingBookingScalarFieldEnum | Prisma.CounselingBookingScalarFieldEnum[];
};
export type CounselingBookingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where?: Prisma.CounselingBookingWhereInput;
    orderBy?: Prisma.CounselingBookingOrderByWithRelationInput | Prisma.CounselingBookingOrderByWithRelationInput[];
    cursor?: Prisma.CounselingBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CounselingBookingScalarFieldEnum | Prisma.CounselingBookingScalarFieldEnum[];
};
export type CounselingBookingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CounselingBookingCreateInput, Prisma.CounselingBookingUncheckedCreateInput>;
};
export type CounselingBookingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CounselingBookingCreateManyInput | Prisma.CounselingBookingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CounselingBookingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CounselingBookingUpdateInput, Prisma.CounselingBookingUncheckedUpdateInput>;
    where: Prisma.CounselingBookingWhereUniqueInput;
};
export type CounselingBookingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CounselingBookingUpdateManyMutationInput, Prisma.CounselingBookingUncheckedUpdateManyInput>;
    where?: Prisma.CounselingBookingWhereInput;
    limit?: number;
};
export type CounselingBookingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where: Prisma.CounselingBookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.CounselingBookingCreateInput, Prisma.CounselingBookingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CounselingBookingUpdateInput, Prisma.CounselingBookingUncheckedUpdateInput>;
};
export type CounselingBookingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
    where: Prisma.CounselingBookingWhereUniqueInput;
};
export type CounselingBookingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CounselingBookingWhereInput;
    limit?: number;
};
export type CounselingBookingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CounselingBookingSelect<ExtArgs> | null;
    omit?: Prisma.CounselingBookingOmit<ExtArgs> | null;
};
