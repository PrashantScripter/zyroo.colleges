import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
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
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
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
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
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
