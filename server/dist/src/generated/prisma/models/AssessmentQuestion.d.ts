import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AssessmentQuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$AssessmentQuestionPayload>;
export type AggregateAssessmentQuestion = {
    _count: AssessmentQuestionCountAggregateOutputType | null;
    _avg: AssessmentQuestionAvgAggregateOutputType | null;
    _sum: AssessmentQuestionSumAggregateOutputType | null;
    _min: AssessmentQuestionMinAggregateOutputType | null;
    _max: AssessmentQuestionMaxAggregateOutputType | null;
};
export type AssessmentQuestionAvgAggregateOutputType = {
    id: number | null;
    collegeId: number | null;
    correctOptionIndex: number | null;
};
export type AssessmentQuestionSumAggregateOutputType = {
    id: number | null;
    collegeId: number | null;
    correctOptionIndex: number | null;
};
export type AssessmentQuestionMinAggregateOutputType = {
    id: number | null;
    collegeId: number | null;
    text: string | null;
    correctOptionIndex: number | null;
    explanation: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssessmentQuestionMaxAggregateOutputType = {
    id: number | null;
    collegeId: number | null;
    text: string | null;
    correctOptionIndex: number | null;
    explanation: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssessmentQuestionCountAggregateOutputType = {
    id: number;
    collegeId: number;
    text: number;
    options: number;
    correctOptionIndex: number;
    explanation: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AssessmentQuestionAvgAggregateInputType = {
    id?: true;
    collegeId?: true;
    correctOptionIndex?: true;
};
export type AssessmentQuestionSumAggregateInputType = {
    id?: true;
    collegeId?: true;
    correctOptionIndex?: true;
};
export type AssessmentQuestionMinAggregateInputType = {
    id?: true;
    collegeId?: true;
    text?: true;
    correctOptionIndex?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssessmentQuestionMaxAggregateInputType = {
    id?: true;
    collegeId?: true;
    text?: true;
    correctOptionIndex?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssessmentQuestionCountAggregateInputType = {
    id?: true;
    collegeId?: true;
    text?: true;
    options?: true;
    correctOptionIndex?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AssessmentQuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssessmentQuestionWhereInput;
    orderBy?: Prisma.AssessmentQuestionOrderByWithRelationInput | Prisma.AssessmentQuestionOrderByWithRelationInput[];
    cursor?: Prisma.AssessmentQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AssessmentQuestionCountAggregateInputType;
    _avg?: AssessmentQuestionAvgAggregateInputType;
    _sum?: AssessmentQuestionSumAggregateInputType;
    _min?: AssessmentQuestionMinAggregateInputType;
    _max?: AssessmentQuestionMaxAggregateInputType;
};
export type GetAssessmentQuestionAggregateType<T extends AssessmentQuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateAssessmentQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssessmentQuestion[P]> : Prisma.GetScalarType<T[P], AggregateAssessmentQuestion[P]>;
};
export type AssessmentQuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssessmentQuestionWhereInput;
    orderBy?: Prisma.AssessmentQuestionOrderByWithAggregationInput | Prisma.AssessmentQuestionOrderByWithAggregationInput[];
    by: Prisma.AssessmentQuestionScalarFieldEnum[] | Prisma.AssessmentQuestionScalarFieldEnum;
    having?: Prisma.AssessmentQuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssessmentQuestionCountAggregateInputType | true;
    _avg?: AssessmentQuestionAvgAggregateInputType;
    _sum?: AssessmentQuestionSumAggregateInputType;
    _min?: AssessmentQuestionMinAggregateInputType;
    _max?: AssessmentQuestionMaxAggregateInputType;
};
export type AssessmentQuestionGroupByOutputType = {
    id: number;
    collegeId: number;
    text: string;
    options: runtime.JsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AssessmentQuestionCountAggregateOutputType | null;
    _avg: AssessmentQuestionAvgAggregateOutputType | null;
    _sum: AssessmentQuestionSumAggregateOutputType | null;
    _min: AssessmentQuestionMinAggregateOutputType | null;
    _max: AssessmentQuestionMaxAggregateOutputType | null;
};
export type GetAssessmentQuestionGroupByPayload<T extends AssessmentQuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssessmentQuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssessmentQuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssessmentQuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssessmentQuestionGroupByOutputType[P]>;
}>>;
export type AssessmentQuestionWhereInput = {
    AND?: Prisma.AssessmentQuestionWhereInput | Prisma.AssessmentQuestionWhereInput[];
    OR?: Prisma.AssessmentQuestionWhereInput[];
    NOT?: Prisma.AssessmentQuestionWhereInput | Prisma.AssessmentQuestionWhereInput[];
    id?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    collegeId?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    text?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    options?: Prisma.JsonFilter<"AssessmentQuestion">;
    correctOptionIndex?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    explanation?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    createdAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
    college?: Prisma.XOR<Prisma.CollegeScalarRelationFilter, Prisma.CollegeWhereInput>;
};
export type AssessmentQuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    college?: Prisma.CollegeOrderByWithRelationInput;
    _relevance?: Prisma.AssessmentQuestionOrderByRelevanceInput;
};
export type AssessmentQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.AssessmentQuestionWhereInput | Prisma.AssessmentQuestionWhereInput[];
    OR?: Prisma.AssessmentQuestionWhereInput[];
    NOT?: Prisma.AssessmentQuestionWhereInput | Prisma.AssessmentQuestionWhereInput[];
    collegeId?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    text?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    options?: Prisma.JsonFilter<"AssessmentQuestion">;
    correctOptionIndex?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    explanation?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    createdAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
    college?: Prisma.XOR<Prisma.CollegeScalarRelationFilter, Prisma.CollegeWhereInput>;
}, "id">;
export type AssessmentQuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AssessmentQuestionCountOrderByAggregateInput;
    _avg?: Prisma.AssessmentQuestionAvgOrderByAggregateInput;
    _max?: Prisma.AssessmentQuestionMaxOrderByAggregateInput;
    _min?: Prisma.AssessmentQuestionMinOrderByAggregateInput;
    _sum?: Prisma.AssessmentQuestionSumOrderByAggregateInput;
};
export type AssessmentQuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssessmentQuestionScalarWhereWithAggregatesInput | Prisma.AssessmentQuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssessmentQuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssessmentQuestionScalarWhereWithAggregatesInput | Prisma.AssessmentQuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"AssessmentQuestion"> | number;
    collegeId?: Prisma.IntWithAggregatesFilter<"AssessmentQuestion"> | number;
    text?: Prisma.StringWithAggregatesFilter<"AssessmentQuestion"> | string;
    options?: Prisma.JsonWithAggregatesFilter<"AssessmentQuestion">;
    correctOptionIndex?: Prisma.IntWithAggregatesFilter<"AssessmentQuestion"> | number;
    explanation?: Prisma.StringWithAggregatesFilter<"AssessmentQuestion"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AssessmentQuestion"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AssessmentQuestion"> | Date | string;
};
export type AssessmentQuestionCreateInput = {
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    college: Prisma.CollegeCreateNestedOneWithoutAssessmentQuestionsInput;
};
export type AssessmentQuestionUncheckedCreateInput = {
    id?: number;
    collegeId: number;
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssessmentQuestionUpdateInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    college?: Prisma.CollegeUpdateOneRequiredWithoutAssessmentQuestionsNestedInput;
};
export type AssessmentQuestionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    collegeId?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionCreateManyInput = {
    id?: number;
    collegeId: number;
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssessmentQuestionUpdateManyMutationInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    collegeId?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionListRelationFilter = {
    every?: Prisma.AssessmentQuestionWhereInput;
    some?: Prisma.AssessmentQuestionWhereInput;
    none?: Prisma.AssessmentQuestionWhereInput;
};
export type AssessmentQuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AssessmentQuestionOrderByRelevanceInput = {
    fields: Prisma.AssessmentQuestionOrderByRelevanceFieldEnum | Prisma.AssessmentQuestionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AssessmentQuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssessmentQuestionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
};
export type AssessmentQuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssessmentQuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssessmentQuestionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collegeId?: Prisma.SortOrder;
    correctOptionIndex?: Prisma.SortOrder;
};
export type AssessmentQuestionCreateNestedManyWithoutCollegeInput = {
    create?: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput> | Prisma.AssessmentQuestionCreateWithoutCollegeInput[] | Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput[];
    connectOrCreate?: Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput | Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput[];
    createMany?: Prisma.AssessmentQuestionCreateManyCollegeInputEnvelope;
    connect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
};
export type AssessmentQuestionUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput> | Prisma.AssessmentQuestionCreateWithoutCollegeInput[] | Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput[];
    connectOrCreate?: Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput | Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput[];
    createMany?: Prisma.AssessmentQuestionCreateManyCollegeInputEnvelope;
    connect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
};
export type AssessmentQuestionUpdateManyWithoutCollegeNestedInput = {
    create?: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput> | Prisma.AssessmentQuestionCreateWithoutCollegeInput[] | Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput[];
    connectOrCreate?: Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput | Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput[];
    upsert?: Prisma.AssessmentQuestionUpsertWithWhereUniqueWithoutCollegeInput | Prisma.AssessmentQuestionUpsertWithWhereUniqueWithoutCollegeInput[];
    createMany?: Prisma.AssessmentQuestionCreateManyCollegeInputEnvelope;
    set?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    disconnect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    delete?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    connect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    update?: Prisma.AssessmentQuestionUpdateWithWhereUniqueWithoutCollegeInput | Prisma.AssessmentQuestionUpdateWithWhereUniqueWithoutCollegeInput[];
    updateMany?: Prisma.AssessmentQuestionUpdateManyWithWhereWithoutCollegeInput | Prisma.AssessmentQuestionUpdateManyWithWhereWithoutCollegeInput[];
    deleteMany?: Prisma.AssessmentQuestionScalarWhereInput | Prisma.AssessmentQuestionScalarWhereInput[];
};
export type AssessmentQuestionUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput> | Prisma.AssessmentQuestionCreateWithoutCollegeInput[] | Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput[];
    connectOrCreate?: Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput | Prisma.AssessmentQuestionCreateOrConnectWithoutCollegeInput[];
    upsert?: Prisma.AssessmentQuestionUpsertWithWhereUniqueWithoutCollegeInput | Prisma.AssessmentQuestionUpsertWithWhereUniqueWithoutCollegeInput[];
    createMany?: Prisma.AssessmentQuestionCreateManyCollegeInputEnvelope;
    set?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    disconnect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    delete?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    connect?: Prisma.AssessmentQuestionWhereUniqueInput | Prisma.AssessmentQuestionWhereUniqueInput[];
    update?: Prisma.AssessmentQuestionUpdateWithWhereUniqueWithoutCollegeInput | Prisma.AssessmentQuestionUpdateWithWhereUniqueWithoutCollegeInput[];
    updateMany?: Prisma.AssessmentQuestionUpdateManyWithWhereWithoutCollegeInput | Prisma.AssessmentQuestionUpdateManyWithWhereWithoutCollegeInput[];
    deleteMany?: Prisma.AssessmentQuestionScalarWhereInput | Prisma.AssessmentQuestionScalarWhereInput[];
};
export type AssessmentQuestionCreateWithoutCollegeInput = {
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssessmentQuestionUncheckedCreateWithoutCollegeInput = {
    id?: number;
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssessmentQuestionCreateOrConnectWithoutCollegeInput = {
    where: Prisma.AssessmentQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput>;
};
export type AssessmentQuestionCreateManyCollegeInputEnvelope = {
    data: Prisma.AssessmentQuestionCreateManyCollegeInput | Prisma.AssessmentQuestionCreateManyCollegeInput[];
    skipDuplicates?: boolean;
};
export type AssessmentQuestionUpsertWithWhereUniqueWithoutCollegeInput = {
    where: Prisma.AssessmentQuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssessmentQuestionUpdateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedUpdateWithoutCollegeInput>;
    create: Prisma.XOR<Prisma.AssessmentQuestionCreateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedCreateWithoutCollegeInput>;
};
export type AssessmentQuestionUpdateWithWhereUniqueWithoutCollegeInput = {
    where: Prisma.AssessmentQuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssessmentQuestionUpdateWithoutCollegeInput, Prisma.AssessmentQuestionUncheckedUpdateWithoutCollegeInput>;
};
export type AssessmentQuestionUpdateManyWithWhereWithoutCollegeInput = {
    where: Prisma.AssessmentQuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.AssessmentQuestionUpdateManyMutationInput, Prisma.AssessmentQuestionUncheckedUpdateManyWithoutCollegeInput>;
};
export type AssessmentQuestionScalarWhereInput = {
    AND?: Prisma.AssessmentQuestionScalarWhereInput | Prisma.AssessmentQuestionScalarWhereInput[];
    OR?: Prisma.AssessmentQuestionScalarWhereInput[];
    NOT?: Prisma.AssessmentQuestionScalarWhereInput | Prisma.AssessmentQuestionScalarWhereInput[];
    id?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    collegeId?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    text?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    options?: Prisma.JsonFilter<"AssessmentQuestion">;
    correctOptionIndex?: Prisma.IntFilter<"AssessmentQuestion"> | number;
    explanation?: Prisma.StringFilter<"AssessmentQuestion"> | string;
    createdAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AssessmentQuestion"> | Date | string;
};
export type AssessmentQuestionCreateManyCollegeInput = {
    id?: number;
    text: string;
    options: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex: number;
    explanation: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssessmentQuestionUpdateWithoutCollegeInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionUncheckedUpdateWithoutCollegeInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionUncheckedUpdateManyWithoutCollegeInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    correctOptionIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssessmentQuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    collegeId?: boolean;
    text?: boolean;
    options?: boolean;
    correctOptionIndex?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    college?: boolean | Prisma.CollegeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assessmentQuestion"]>;
export type AssessmentQuestionSelectScalar = {
    id?: boolean;
    collegeId?: boolean;
    text?: boolean;
    options?: boolean;
    correctOptionIndex?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AssessmentQuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "collegeId" | "text" | "options" | "correctOptionIndex" | "explanation" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentQuestion"]>;
export type AssessmentQuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    college?: boolean | Prisma.CollegeDefaultArgs<ExtArgs>;
};
export type $AssessmentQuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AssessmentQuestion";
    objects: {
        college: Prisma.$CollegePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        collegeId: number;
        text: string;
        options: runtime.JsonValue;
        correctOptionIndex: number;
        explanation: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["assessmentQuestion"]>;
    composites: {};
};
export type AssessmentQuestionGetPayload<S extends boolean | null | undefined | AssessmentQuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload, S>;
export type AssessmentQuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssessmentQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssessmentQuestionCountAggregateInputType | true;
};
export interface AssessmentQuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AssessmentQuestion'];
        meta: {
            name: 'AssessmentQuestion';
        };
    };
    findUnique<T extends AssessmentQuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AssessmentQuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AssessmentQuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, AssessmentQuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AssessmentQuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssessmentQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AssessmentQuestionFindManyArgs>(args?: Prisma.SelectSubset<T, AssessmentQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AssessmentQuestionCreateArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionCreateArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AssessmentQuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, AssessmentQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AssessmentQuestionDeleteArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AssessmentQuestionUpdateArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AssessmentQuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssessmentQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AssessmentQuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AssessmentQuestionUpsertArgs>(args: Prisma.SelectSubset<T, AssessmentQuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__AssessmentQuestionClient<runtime.Types.Result.GetResult<Prisma.$AssessmentQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AssessmentQuestionCountArgs>(args?: Prisma.Subset<T, AssessmentQuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssessmentQuestionCountAggregateOutputType> : number>;
    aggregate<T extends AssessmentQuestionAggregateArgs>(args: Prisma.Subset<T, AssessmentQuestionAggregateArgs>): Prisma.PrismaPromise<GetAssessmentQuestionAggregateType<T>>;
    groupBy<T extends AssessmentQuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssessmentQuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: AssessmentQuestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssessmentQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AssessmentQuestionFieldRefs;
}
export interface Prisma__AssessmentQuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    college<T extends Prisma.CollegeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CollegeDefaultArgs<ExtArgs>>): Prisma.Prisma__CollegeClient<runtime.Types.Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AssessmentQuestionFieldRefs {
    readonly id: Prisma.FieldRef<"AssessmentQuestion", 'Int'>;
    readonly collegeId: Prisma.FieldRef<"AssessmentQuestion", 'Int'>;
    readonly text: Prisma.FieldRef<"AssessmentQuestion", 'String'>;
    readonly options: Prisma.FieldRef<"AssessmentQuestion", 'Json'>;
    readonly correctOptionIndex: Prisma.FieldRef<"AssessmentQuestion", 'Int'>;
    readonly explanation: Prisma.FieldRef<"AssessmentQuestion", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AssessmentQuestion", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AssessmentQuestion", 'DateTime'>;
}
export type AssessmentQuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where: Prisma.AssessmentQuestionWhereUniqueInput;
};
export type AssessmentQuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where: Prisma.AssessmentQuestionWhereUniqueInput;
};
export type AssessmentQuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where?: Prisma.AssessmentQuestionWhereInput;
    orderBy?: Prisma.AssessmentQuestionOrderByWithRelationInput | Prisma.AssessmentQuestionOrderByWithRelationInput[];
    cursor?: Prisma.AssessmentQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssessmentQuestionScalarFieldEnum | Prisma.AssessmentQuestionScalarFieldEnum[];
};
export type AssessmentQuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where?: Prisma.AssessmentQuestionWhereInput;
    orderBy?: Prisma.AssessmentQuestionOrderByWithRelationInput | Prisma.AssessmentQuestionOrderByWithRelationInput[];
    cursor?: Prisma.AssessmentQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssessmentQuestionScalarFieldEnum | Prisma.AssessmentQuestionScalarFieldEnum[];
};
export type AssessmentQuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where?: Prisma.AssessmentQuestionWhereInput;
    orderBy?: Prisma.AssessmentQuestionOrderByWithRelationInput | Prisma.AssessmentQuestionOrderByWithRelationInput[];
    cursor?: Prisma.AssessmentQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssessmentQuestionScalarFieldEnum | Prisma.AssessmentQuestionScalarFieldEnum[];
};
export type AssessmentQuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssessmentQuestionCreateInput, Prisma.AssessmentQuestionUncheckedCreateInput>;
};
export type AssessmentQuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AssessmentQuestionCreateManyInput | Prisma.AssessmentQuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AssessmentQuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssessmentQuestionUpdateInput, Prisma.AssessmentQuestionUncheckedUpdateInput>;
    where: Prisma.AssessmentQuestionWhereUniqueInput;
};
export type AssessmentQuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AssessmentQuestionUpdateManyMutationInput, Prisma.AssessmentQuestionUncheckedUpdateManyInput>;
    where?: Prisma.AssessmentQuestionWhereInput;
    limit?: number;
};
export type AssessmentQuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where: Prisma.AssessmentQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssessmentQuestionCreateInput, Prisma.AssessmentQuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AssessmentQuestionUpdateInput, Prisma.AssessmentQuestionUncheckedUpdateInput>;
};
export type AssessmentQuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
    where: Prisma.AssessmentQuestionWhereUniqueInput;
};
export type AssessmentQuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssessmentQuestionWhereInput;
    limit?: number;
};
export type AssessmentQuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentQuestionSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentQuestionOmit<ExtArgs> | null;
    include?: Prisma.AssessmentQuestionInclude<ExtArgs> | null;
};
