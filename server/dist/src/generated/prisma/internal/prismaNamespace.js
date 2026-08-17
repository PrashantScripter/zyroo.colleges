"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.CounselingBookingOrderByRelevanceFieldEnum = exports.BlogOrderByRelevanceFieldEnum = exports.EntranceExamOrderByRelevanceFieldEnum = exports.AssessmentQuestionOrderByRelevanceFieldEnum = exports.CourseOrderByRelevanceFieldEnum = exports.CollegeOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueFilter = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.JsonNullValueInput = exports.NullableJsonNullValueInput = exports.SortOrder = exports.CounselingBookingScalarFieldEnum = exports.BlogScalarFieldEnum = exports.EntranceExamScalarFieldEnum = exports.AssessmentQuestionScalarFieldEnum = exports.CourseScalarFieldEnum = exports.CollegeScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    College: 'College',
    Course: 'Course',
    AssessmentQuestion: 'AssessmentQuestion',
    EntranceExam: 'EntranceExam',
    Blog: 'Blog',
    CounselingBooking: 'CounselingBooking'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    picture: 'picture',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CollegeScalarFieldEnum = {
    id: 'id',
    name: 'name',
    location: 'location',
    stream: 'stream',
    category: 'category',
    nirfRank: 'nirfRank',
    naacGrade: 'naacGrade',
    annualFees: 'annualFees',
    rating: 'rating',
    image: 'image',
    established: 'established',
    campusSize: 'campusSize',
    phdFacultyPct: 'phdFacultyPct',
    ratingAcademics: 'ratingAcademics',
    ratingPlacements: 'ratingPlacements',
    ratingInfrastructure: 'ratingInfrastructure',
    ratingCampusLife: 'ratingCampusLife',
    facilities: 'facilities',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CourseScalarFieldEnum = {
    id: 'id',
    collegeId: 'collegeId',
    key: 'key',
    name: 'name',
    fees: 'fees',
    hostelFees: 'hostelFees',
    avgPackage: 'avgPackage',
    medianPackage: 'medianPackage',
    highestPackage: 'highestPackage',
    placementRate: 'placementRate',
    cutoff: 'cutoff',
    acceptedExams: 'acceptedExams',
    duration: 'duration',
    seats: 'seats',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AssessmentQuestionScalarFieldEnum = {
    id: 'id',
    collegeId: 'collegeId',
    text: 'text',
    options: 'options',
    correctOptionIndex: 'correctOptionIndex',
    explanation: 'explanation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EntranceExamScalarFieldEnum = {
    id: 'id',
    name: 'name',
    stream: 'stream',
    conductingBody: 'conductingBody',
    mode: 'mode',
    status: 'status',
    registrationTimeline: 'registrationTimeline',
    examDatesTimeline: 'examDatesTimeline',
    eligibility: 'eligibility',
    targetColleges: 'targetColleges',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BlogScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    image: 'image',
    category: 'category',
    author: 'author',
    authorType: 'authorType',
    tags: 'tags',
    likes: 'likes',
    views: 'views',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CounselingBookingScalarFieldEnum = {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    targetCollege: 'targetCollege',
    stream: 'stream',
    preferredDate: 'preferredDate',
    preferredTime: 'preferredTime',
    concerns: 'concerns',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    picture: 'picture'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.CollegeOrderByRelevanceFieldEnum = {
    name: 'name',
    location: 'location',
    stream: 'stream',
    category: 'category',
    naacGrade: 'naacGrade',
    image: 'image'
};
exports.CourseOrderByRelevanceFieldEnum = {
    key: 'key',
    name: 'name',
    cutoff: 'cutoff',
    acceptedExams: 'acceptedExams',
    duration: 'duration'
};
exports.AssessmentQuestionOrderByRelevanceFieldEnum = {
    text: 'text',
    explanation: 'explanation'
};
exports.EntranceExamOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    stream: 'stream',
    conductingBody: 'conductingBody',
    mode: 'mode',
    registrationTimeline: 'registrationTimeline',
    examDatesTimeline: 'examDatesTimeline',
    eligibility: 'eligibility',
    targetColleges: 'targetColleges'
};
exports.BlogOrderByRelevanceFieldEnum = {
    title: 'title',
    description: 'description',
    content: 'content',
    image: 'image',
    category: 'category',
    author: 'author',
    authorType: 'authorType'
};
exports.CounselingBookingOrderByRelevanceFieldEnum = {
    name: 'name',
    phone: 'phone',
    email: 'email',
    targetCollege: 'targetCollege',
    stream: 'stream',
    preferredTime: 'preferredTime',
    concerns: 'concerns',
    userId: 'userId'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map