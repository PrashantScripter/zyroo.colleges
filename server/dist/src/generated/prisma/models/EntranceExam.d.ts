import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type EntranceExamModel = runtime.Types.Result.DefaultSelection<Prisma.$EntranceExamPayload>;
export type AggregateEntranceExam = {
    _count: EntranceExamCountAggregateOutputType | null;
    _min: EntranceExamMinAggregateOutputType | null;
    _max: EntranceExamMaxAggregateOutputType | null;
};
export type EntranceExamMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    stream: string | null;
    conductingBody: string | null;
    mode: string | null;
    status: $Enums.ExamStatus | null;
    registrationTimeline: string | null;
    examDatesTimeline: string | null;
    eligibility: string | null;
    targetColleges: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EntranceExamMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    stream: string | null;
    conductingBody: string | null;
    mode: string | null;
    status: $Enums.ExamStatus | null;
    registrationTimeline: string | null;
    examDatesTimeline: string | null;
    eligibility: string | null;
    targetColleges: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EntranceExamCountAggregateOutputType = {
    id: number;
    name: number;
    stream: number;
    conductingBody: number;
    mode: number;
    status: number;
    registrationTimeline: number;
    examDatesTimeline: number;
    eligibility: number;
    targetColleges: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EntranceExamMinAggregateInputType = {
    id?: true;
    name?: true;
    stream?: true;
    conductingBody?: true;
    mode?: true;
    status?: true;
    registrationTimeline?: true;
    examDatesTimeline?: true;
    eligibility?: true;
    targetColleges?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EntranceExamMaxAggregateInputType = {
    id?: true;
    name?: true;
    stream?: true;
    conductingBody?: true;
    mode?: true;
    status?: true;
    registrationTimeline?: true;
    examDatesTimeline?: true;
    eligibility?: true;
    targetColleges?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EntranceExamCountAggregateInputType = {
    id?: true;
    name?: true;
    stream?: true;
    conductingBody?: true;
    mode?: true;
    status?: true;
    registrationTimeline?: true;
    examDatesTimeline?: true;
    eligibility?: true;
    targetColleges?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EntranceExamAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntranceExamWhereInput;
    orderBy?: Prisma.EntranceExamOrderByWithRelationInput | Prisma.EntranceExamOrderByWithRelationInput[];
    cursor?: Prisma.EntranceExamWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EntranceExamCountAggregateInputType;
    _min?: EntranceExamMinAggregateInputType;
    _max?: EntranceExamMaxAggregateInputType;
};
export type GetEntranceExamAggregateType<T extends EntranceExamAggregateArgs> = {
    [P in keyof T & keyof AggregateEntranceExam]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntranceExam[P]> : Prisma.GetScalarType<T[P], AggregateEntranceExam[P]>;
};
export type EntranceExamGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntranceExamWhereInput;
    orderBy?: Prisma.EntranceExamOrderByWithAggregationInput | Prisma.EntranceExamOrderByWithAggregationInput[];
    by: Prisma.EntranceExamScalarFieldEnum[] | Prisma.EntranceExamScalarFieldEnum;
    having?: Prisma.EntranceExamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntranceExamCountAggregateInputType | true;
    _min?: EntranceExamMinAggregateInputType;
    _max?: EntranceExamMaxAggregateInputType;
};
export type EntranceExamGroupByOutputType = {
    id: string;
    name: string;
    stream: string;
    conductingBody: string;
    mode: string;
    status: $Enums.ExamStatus;
    registrationTimeline: string;
    examDatesTimeline: string;
    eligibility: string;
    targetColleges: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EntranceExamCountAggregateOutputType | null;
    _min: EntranceExamMinAggregateOutputType | null;
    _max: EntranceExamMaxAggregateOutputType | null;
};
export type GetEntranceExamGroupByPayload<T extends EntranceExamGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntranceExamGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntranceExamGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntranceExamGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntranceExamGroupByOutputType[P]>;
}>>;
export type EntranceExamWhereInput = {
    AND?: Prisma.EntranceExamWhereInput | Prisma.EntranceExamWhereInput[];
    OR?: Prisma.EntranceExamWhereInput[];
    NOT?: Prisma.EntranceExamWhereInput | Prisma.EntranceExamWhereInput[];
    id?: Prisma.StringFilter<"EntranceExam"> | string;
    name?: Prisma.StringFilter<"EntranceExam"> | string;
    stream?: Prisma.StringFilter<"EntranceExam"> | string;
    conductingBody?: Prisma.StringFilter<"EntranceExam"> | string;
    mode?: Prisma.StringFilter<"EntranceExam"> | string;
    status?: Prisma.EnumExamStatusFilter<"EntranceExam"> | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFilter<"EntranceExam"> | string;
    examDatesTimeline?: Prisma.StringFilter<"EntranceExam"> | string;
    eligibility?: Prisma.StringFilter<"EntranceExam"> | string;
    targetColleges?: Prisma.StringFilter<"EntranceExam"> | string;
    createdAt?: Prisma.DateTimeFilter<"EntranceExam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntranceExam"> | Date | string;
};
export type EntranceExamOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    conductingBody?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    registrationTimeline?: Prisma.SortOrder;
    examDatesTimeline?: Prisma.SortOrder;
    eligibility?: Prisma.SortOrder;
    targetColleges?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _relevance?: Prisma.EntranceExamOrderByRelevanceInput;
};
export type EntranceExamWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EntranceExamWhereInput | Prisma.EntranceExamWhereInput[];
    OR?: Prisma.EntranceExamWhereInput[];
    NOT?: Prisma.EntranceExamWhereInput | Prisma.EntranceExamWhereInput[];
    name?: Prisma.StringFilter<"EntranceExam"> | string;
    stream?: Prisma.StringFilter<"EntranceExam"> | string;
    conductingBody?: Prisma.StringFilter<"EntranceExam"> | string;
    mode?: Prisma.StringFilter<"EntranceExam"> | string;
    status?: Prisma.EnumExamStatusFilter<"EntranceExam"> | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFilter<"EntranceExam"> | string;
    examDatesTimeline?: Prisma.StringFilter<"EntranceExam"> | string;
    eligibility?: Prisma.StringFilter<"EntranceExam"> | string;
    targetColleges?: Prisma.StringFilter<"EntranceExam"> | string;
    createdAt?: Prisma.DateTimeFilter<"EntranceExam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntranceExam"> | Date | string;
}, "id">;
export type EntranceExamOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    conductingBody?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    registrationTimeline?: Prisma.SortOrder;
    examDatesTimeline?: Prisma.SortOrder;
    eligibility?: Prisma.SortOrder;
    targetColleges?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EntranceExamCountOrderByAggregateInput;
    _max?: Prisma.EntranceExamMaxOrderByAggregateInput;
    _min?: Prisma.EntranceExamMinOrderByAggregateInput;
};
export type EntranceExamScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntranceExamScalarWhereWithAggregatesInput | Prisma.EntranceExamScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntranceExamScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntranceExamScalarWhereWithAggregatesInput | Prisma.EntranceExamScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    name?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    stream?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    conductingBody?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    mode?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    status?: Prisma.EnumExamStatusWithAggregatesFilter<"EntranceExam"> | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    examDatesTimeline?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    eligibility?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    targetColleges?: Prisma.StringWithAggregatesFilter<"EntranceExam"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EntranceExam"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EntranceExam"> | Date | string;
};
export type EntranceExamCreateInput = {
    id: string;
    name: string;
    stream: string;
    conductingBody: string;
    mode: string;
    status: $Enums.ExamStatus;
    registrationTimeline: string;
    examDatesTimeline: string;
    eligibility: string;
    targetColleges: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntranceExamUncheckedCreateInput = {
    id: string;
    name: string;
    stream: string;
    conductingBody: string;
    mode: string;
    status: $Enums.ExamStatus;
    registrationTimeline: string;
    examDatesTimeline: string;
    eligibility: string;
    targetColleges: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntranceExamUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    conductingBody?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    examDatesTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    eligibility?: Prisma.StringFieldUpdateOperationsInput | string;
    targetColleges?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntranceExamUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    conductingBody?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    examDatesTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    eligibility?: Prisma.StringFieldUpdateOperationsInput | string;
    targetColleges?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntranceExamCreateManyInput = {
    id: string;
    name: string;
    stream: string;
    conductingBody: string;
    mode: string;
    status: $Enums.ExamStatus;
    registrationTimeline: string;
    examDatesTimeline: string;
    eligibility: string;
    targetColleges: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntranceExamUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    conductingBody?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    examDatesTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    eligibility?: Prisma.StringFieldUpdateOperationsInput | string;
    targetColleges?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntranceExamUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    stream?: Prisma.StringFieldUpdateOperationsInput | string;
    conductingBody?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus;
    registrationTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    examDatesTimeline?: Prisma.StringFieldUpdateOperationsInput | string;
    eligibility?: Prisma.StringFieldUpdateOperationsInput | string;
    targetColleges?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntranceExamOrderByRelevanceInput = {
    fields: Prisma.EntranceExamOrderByRelevanceFieldEnum | Prisma.EntranceExamOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type EntranceExamCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    conductingBody?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    registrationTimeline?: Prisma.SortOrder;
    examDatesTimeline?: Prisma.SortOrder;
    eligibility?: Prisma.SortOrder;
    targetColleges?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EntranceExamMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    conductingBody?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    registrationTimeline?: Prisma.SortOrder;
    examDatesTimeline?: Prisma.SortOrder;
    eligibility?: Prisma.SortOrder;
    targetColleges?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EntranceExamMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    stream?: Prisma.SortOrder;
    conductingBody?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    registrationTimeline?: Prisma.SortOrder;
    examDatesTimeline?: Prisma.SortOrder;
    eligibility?: Prisma.SortOrder;
    targetColleges?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EnumExamStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExamStatus;
};
export type EntranceExamSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    stream?: boolean;
    conductingBody?: boolean;
    mode?: boolean;
    status?: boolean;
    registrationTimeline?: boolean;
    examDatesTimeline?: boolean;
    eligibility?: boolean;
    targetColleges?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["entranceExam"]>;
export type EntranceExamSelectScalar = {
    id?: boolean;
    name?: boolean;
    stream?: boolean;
    conductingBody?: boolean;
    mode?: boolean;
    status?: boolean;
    registrationTimeline?: boolean;
    examDatesTimeline?: boolean;
    eligibility?: boolean;
    targetColleges?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EntranceExamOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "stream" | "conductingBody" | "mode" | "status" | "registrationTimeline" | "examDatesTimeline" | "eligibility" | "targetColleges" | "createdAt" | "updatedAt", ExtArgs["result"]["entranceExam"]>;
export type $EntranceExamPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EntranceExam";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        stream: string;
        conductingBody: string;
        mode: string;
        status: $Enums.ExamStatus;
        registrationTimeline: string;
        examDatesTimeline: string;
        eligibility: string;
        targetColleges: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["entranceExam"]>;
    composites: {};
};
export type EntranceExamGetPayload<S extends boolean | null | undefined | EntranceExamDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload, S>;
export type EntranceExamCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntranceExamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntranceExamCountAggregateInputType | true;
};
export interface EntranceExamDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EntranceExam'];
        meta: {
            name: 'EntranceExam';
        };
    };
    findUnique<T extends EntranceExamFindUniqueArgs>(args: Prisma.SelectSubset<T, EntranceExamFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EntranceExamFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntranceExamFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EntranceExamFindFirstArgs>(args?: Prisma.SelectSubset<T, EntranceExamFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EntranceExamFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntranceExamFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EntranceExamFindManyArgs>(args?: Prisma.SelectSubset<T, EntranceExamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EntranceExamCreateArgs>(args: Prisma.SelectSubset<T, EntranceExamCreateArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EntranceExamCreateManyArgs>(args?: Prisma.SelectSubset<T, EntranceExamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends EntranceExamDeleteArgs>(args: Prisma.SelectSubset<T, EntranceExamDeleteArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EntranceExamUpdateArgs>(args: Prisma.SelectSubset<T, EntranceExamUpdateArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EntranceExamDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntranceExamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EntranceExamUpdateManyArgs>(args: Prisma.SelectSubset<T, EntranceExamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends EntranceExamUpsertArgs>(args: Prisma.SelectSubset<T, EntranceExamUpsertArgs<ExtArgs>>): Prisma.Prisma__EntranceExamClient<runtime.Types.Result.GetResult<Prisma.$EntranceExamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EntranceExamCountArgs>(args?: Prisma.Subset<T, EntranceExamCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntranceExamCountAggregateOutputType> : number>;
    aggregate<T extends EntranceExamAggregateArgs>(args: Prisma.Subset<T, EntranceExamAggregateArgs>): Prisma.PrismaPromise<GetEntranceExamAggregateType<T>>;
    groupBy<T extends EntranceExamGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntranceExamGroupByArgs['orderBy'];
    } : {
        orderBy?: EntranceExamGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntranceExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntranceExamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EntranceExamFieldRefs;
}
export interface Prisma__EntranceExamClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EntranceExamFieldRefs {
    readonly id: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly name: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly stream: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly conductingBody: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly mode: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly status: Prisma.FieldRef<"EntranceExam", 'ExamStatus'>;
    readonly registrationTimeline: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly examDatesTimeline: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly eligibility: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly targetColleges: Prisma.FieldRef<"EntranceExam", 'String'>;
    readonly createdAt: Prisma.FieldRef<"EntranceExam", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EntranceExam", 'DateTime'>;
}
export type EntranceExamFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where: Prisma.EntranceExamWhereUniqueInput;
};
export type EntranceExamFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where: Prisma.EntranceExamWhereUniqueInput;
};
export type EntranceExamFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where?: Prisma.EntranceExamWhereInput;
    orderBy?: Prisma.EntranceExamOrderByWithRelationInput | Prisma.EntranceExamOrderByWithRelationInput[];
    cursor?: Prisma.EntranceExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntranceExamScalarFieldEnum | Prisma.EntranceExamScalarFieldEnum[];
};
export type EntranceExamFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where?: Prisma.EntranceExamWhereInput;
    orderBy?: Prisma.EntranceExamOrderByWithRelationInput | Prisma.EntranceExamOrderByWithRelationInput[];
    cursor?: Prisma.EntranceExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntranceExamScalarFieldEnum | Prisma.EntranceExamScalarFieldEnum[];
};
export type EntranceExamFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where?: Prisma.EntranceExamWhereInput;
    orderBy?: Prisma.EntranceExamOrderByWithRelationInput | Prisma.EntranceExamOrderByWithRelationInput[];
    cursor?: Prisma.EntranceExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntranceExamScalarFieldEnum | Prisma.EntranceExamScalarFieldEnum[];
};
export type EntranceExamCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntranceExamCreateInput, Prisma.EntranceExamUncheckedCreateInput>;
};
export type EntranceExamCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EntranceExamCreateManyInput | Prisma.EntranceExamCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EntranceExamUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntranceExamUpdateInput, Prisma.EntranceExamUncheckedUpdateInput>;
    where: Prisma.EntranceExamWhereUniqueInput;
};
export type EntranceExamUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EntranceExamUpdateManyMutationInput, Prisma.EntranceExamUncheckedUpdateManyInput>;
    where?: Prisma.EntranceExamWhereInput;
    limit?: number;
};
export type EntranceExamUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where: Prisma.EntranceExamWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntranceExamCreateInput, Prisma.EntranceExamUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EntranceExamUpdateInput, Prisma.EntranceExamUncheckedUpdateInput>;
};
export type EntranceExamDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
    where: Prisma.EntranceExamWhereUniqueInput;
};
export type EntranceExamDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntranceExamWhereInput;
    limit?: number;
};
export type EntranceExamDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntranceExamSelect<ExtArgs> | null;
    omit?: Prisma.EntranceExamOmit<ExtArgs> | null;
};
