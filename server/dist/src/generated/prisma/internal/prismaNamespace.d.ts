import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly College: "College";
    readonly Course: "Course";
    readonly AssessmentQuestion: "AssessmentQuestion";
    readonly EntranceExam: "EntranceExam";
    readonly Blog: "Blog";
    readonly CounselingBooking: "CounselingBooking";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "college" | "course" | "assessmentQuestion" | "entranceExam" | "blog" | "counselingBooking";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        College: {
            payload: Prisma.$CollegePayload<ExtArgs>;
            fields: Prisma.CollegeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CollegeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CollegeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                findFirst: {
                    args: Prisma.CollegeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CollegeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                findMany: {
                    args: Prisma.CollegeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>[];
                };
                create: {
                    args: Prisma.CollegeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                createMany: {
                    args: Prisma.CollegeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.CollegeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                update: {
                    args: Prisma.CollegeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                deleteMany: {
                    args: Prisma.CollegeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CollegeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.CollegeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CollegePayload>;
                };
                aggregate: {
                    args: Prisma.CollegeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCollege>;
                };
                groupBy: {
                    args: Prisma.CollegeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CollegeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CollegeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CollegeCountAggregateOutputType> | number;
                };
            };
        };
        Course: {
            payload: Prisma.$CoursePayload<ExtArgs>;
            fields: Prisma.CourseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CourseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                findFirst: {
                    args: Prisma.CourseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                findMany: {
                    args: Prisma.CourseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
                };
                create: {
                    args: Prisma.CourseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                createMany: {
                    args: Prisma.CourseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.CourseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                update: {
                    args: Prisma.CourseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                deleteMany: {
                    args: Prisma.CourseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CourseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.CourseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                aggregate: {
                    args: Prisma.CourseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCourse>;
                };
                groupBy: {
                    args: Prisma.CourseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CourseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseCountAggregateOutputType> | number;
                };
            };
        };
        AssessmentQuestion: {
            payload: Prisma.$AssessmentQuestionPayload<ExtArgs>;
            fields: Prisma.AssessmentQuestionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssessmentQuestionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssessmentQuestionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                findFirst: {
                    args: Prisma.AssessmentQuestionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssessmentQuestionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                findMany: {
                    args: Prisma.AssessmentQuestionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>[];
                };
                create: {
                    args: Prisma.AssessmentQuestionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                createMany: {
                    args: Prisma.AssessmentQuestionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AssessmentQuestionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                update: {
                    args: Prisma.AssessmentQuestionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                deleteMany: {
                    args: Prisma.AssessmentQuestionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssessmentQuestionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AssessmentQuestionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssessmentQuestionPayload>;
                };
                aggregate: {
                    args: Prisma.AssessmentQuestionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssessmentQuestion>;
                };
                groupBy: {
                    args: Prisma.AssessmentQuestionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssessmentQuestionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssessmentQuestionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssessmentQuestionCountAggregateOutputType> | number;
                };
            };
        };
        EntranceExam: {
            payload: Prisma.$EntranceExamPayload<ExtArgs>;
            fields: Prisma.EntranceExamFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EntranceExamFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EntranceExamFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                findFirst: {
                    args: Prisma.EntranceExamFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EntranceExamFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                findMany: {
                    args: Prisma.EntranceExamFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>[];
                };
                create: {
                    args: Prisma.EntranceExamCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                createMany: {
                    args: Prisma.EntranceExamCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EntranceExamDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                update: {
                    args: Prisma.EntranceExamUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                deleteMany: {
                    args: Prisma.EntranceExamDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EntranceExamUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EntranceExamUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntranceExamPayload>;
                };
                aggregate: {
                    args: Prisma.EntranceExamAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEntranceExam>;
                };
                groupBy: {
                    args: Prisma.EntranceExamGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntranceExamGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EntranceExamCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntranceExamCountAggregateOutputType> | number;
                };
            };
        };
        Blog: {
            payload: Prisma.$BlogPayload<ExtArgs>;
            fields: Prisma.BlogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BlogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BlogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                findFirst: {
                    args: Prisma.BlogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BlogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                findMany: {
                    args: Prisma.BlogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>[];
                };
                create: {
                    args: Prisma.BlogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                createMany: {
                    args: Prisma.BlogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.BlogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                update: {
                    args: Prisma.BlogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                deleteMany: {
                    args: Prisma.BlogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BlogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.BlogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                aggregate: {
                    args: Prisma.BlogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlog>;
                };
                groupBy: {
                    args: Prisma.BlogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BlogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogCountAggregateOutputType> | number;
                };
            };
        };
        CounselingBooking: {
            payload: Prisma.$CounselingBookingPayload<ExtArgs>;
            fields: Prisma.CounselingBookingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CounselingBookingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CounselingBookingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                findFirst: {
                    args: Prisma.CounselingBookingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CounselingBookingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                findMany: {
                    args: Prisma.CounselingBookingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>[];
                };
                create: {
                    args: Prisma.CounselingBookingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                createMany: {
                    args: Prisma.CounselingBookingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.CounselingBookingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                update: {
                    args: Prisma.CounselingBookingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                deleteMany: {
                    args: Prisma.CounselingBookingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CounselingBookingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.CounselingBookingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CounselingBookingPayload>;
                };
                aggregate: {
                    args: Prisma.CounselingBookingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCounselingBooking>;
                };
                groupBy: {
                    args: Prisma.CounselingBookingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CounselingBookingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CounselingBookingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CounselingBookingCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly picture: "picture";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CollegeScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly location: "location";
    readonly stream: "stream";
    readonly category: "category";
    readonly nirfRank: "nirfRank";
    readonly naacGrade: "naacGrade";
    readonly annualFees: "annualFees";
    readonly rating: "rating";
    readonly image: "image";
    readonly established: "established";
    readonly campusSize: "campusSize";
    readonly phdFacultyPct: "phdFacultyPct";
    readonly ratingAcademics: "ratingAcademics";
    readonly ratingPlacements: "ratingPlacements";
    readonly ratingInfrastructure: "ratingInfrastructure";
    readonly ratingCampusLife: "ratingCampusLife";
    readonly facilities: "facilities";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CollegeScalarFieldEnum = (typeof CollegeScalarFieldEnum)[keyof typeof CollegeScalarFieldEnum];
export declare const CourseScalarFieldEnum: {
    readonly id: "id";
    readonly collegeId: "collegeId";
    readonly key: "key";
    readonly name: "name";
    readonly fees: "fees";
    readonly hostelFees: "hostelFees";
    readonly avgPackage: "avgPackage";
    readonly medianPackage: "medianPackage";
    readonly highestPackage: "highestPackage";
    readonly placementRate: "placementRate";
    readonly cutoff: "cutoff";
    readonly acceptedExams: "acceptedExams";
    readonly duration: "duration";
    readonly seats: "seats";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
export declare const AssessmentQuestionScalarFieldEnum: {
    readonly id: "id";
    readonly collegeId: "collegeId";
    readonly text: "text";
    readonly options: "options";
    readonly correctOptionIndex: "correctOptionIndex";
    readonly explanation: "explanation";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AssessmentQuestionScalarFieldEnum = (typeof AssessmentQuestionScalarFieldEnum)[keyof typeof AssessmentQuestionScalarFieldEnum];
export declare const EntranceExamScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly stream: "stream";
    readonly conductingBody: "conductingBody";
    readonly mode: "mode";
    readonly status: "status";
    readonly registrationTimeline: "registrationTimeline";
    readonly examDatesTimeline: "examDatesTimeline";
    readonly eligibility: "eligibility";
    readonly targetColleges: "targetColleges";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EntranceExamScalarFieldEnum = (typeof EntranceExamScalarFieldEnum)[keyof typeof EntranceExamScalarFieldEnum];
export declare const BlogScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly image: "image";
    readonly category: "category";
    readonly author: "author";
    readonly authorType: "authorType";
    readonly tags: "tags";
    readonly likes: "likes";
    readonly views: "views";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum];
export declare const CounselingBookingScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly phone: "phone";
    readonly email: "email";
    readonly targetCollege: "targetCollege";
    readonly stream: "stream";
    readonly preferredDate: "preferredDate";
    readonly preferredTime: "preferredTime";
    readonly concerns: "concerns";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CounselingBookingScalarFieldEnum = (typeof CounselingBookingScalarFieldEnum)[keyof typeof CounselingBookingScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly picture: "picture";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const CollegeOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly location: "location";
    readonly stream: "stream";
    readonly category: "category";
    readonly naacGrade: "naacGrade";
    readonly image: "image";
};
export type CollegeOrderByRelevanceFieldEnum = (typeof CollegeOrderByRelevanceFieldEnum)[keyof typeof CollegeOrderByRelevanceFieldEnum];
export declare const CourseOrderByRelevanceFieldEnum: {
    readonly key: "key";
    readonly name: "name";
    readonly cutoff: "cutoff";
    readonly acceptedExams: "acceptedExams";
    readonly duration: "duration";
};
export type CourseOrderByRelevanceFieldEnum = (typeof CourseOrderByRelevanceFieldEnum)[keyof typeof CourseOrderByRelevanceFieldEnum];
export declare const AssessmentQuestionOrderByRelevanceFieldEnum: {
    readonly text: "text";
    readonly explanation: "explanation";
};
export type AssessmentQuestionOrderByRelevanceFieldEnum = (typeof AssessmentQuestionOrderByRelevanceFieldEnum)[keyof typeof AssessmentQuestionOrderByRelevanceFieldEnum];
export declare const EntranceExamOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly stream: "stream";
    readonly conductingBody: "conductingBody";
    readonly mode: "mode";
    readonly registrationTimeline: "registrationTimeline";
    readonly examDatesTimeline: "examDatesTimeline";
    readonly eligibility: "eligibility";
    readonly targetColleges: "targetColleges";
};
export type EntranceExamOrderByRelevanceFieldEnum = (typeof EntranceExamOrderByRelevanceFieldEnum)[keyof typeof EntranceExamOrderByRelevanceFieldEnum];
export declare const BlogOrderByRelevanceFieldEnum: {
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly image: "image";
    readonly category: "category";
    readonly author: "author";
    readonly authorType: "authorType";
};
export type BlogOrderByRelevanceFieldEnum = (typeof BlogOrderByRelevanceFieldEnum)[keyof typeof BlogOrderByRelevanceFieldEnum];
export declare const CounselingBookingOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly phone: "phone";
    readonly email: "email";
    readonly targetCollege: "targetCollege";
    readonly stream: "stream";
    readonly preferredTime: "preferredTime";
    readonly concerns: "concerns";
    readonly userId: "userId";
};
export type CounselingBookingOrderByRelevanceFieldEnum = (typeof CounselingBookingOrderByRelevanceFieldEnum)[keyof typeof CounselingBookingOrderByRelevanceFieldEnum];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumExamStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamStatus'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    college?: Prisma.CollegeOmit;
    course?: Prisma.CourseOmit;
    assessmentQuestion?: Prisma.AssessmentQuestionOmit;
    entranceExam?: Prisma.EntranceExamOmit;
    blog?: Prisma.BlogOmit;
    counselingBooking?: Prisma.CounselingBookingOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
