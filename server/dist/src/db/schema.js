"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessmentQuestionRelations = exports.courseRelations = exports.collegeRelations = exports.counselingBookings = exports.blogs = exports.entranceExams = exports.assessmentQuestions = exports.courses = exports.colleges = exports.users = exports.examStatusEnum = exports.roleEnum = exports.examStatusValues = exports.roleValues = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_orm_2 = require("drizzle-orm");
exports.roleValues = [
    'STUDENT',
    'COUNSELOR',
    'PARENT',
    'COLLEGE_REP',
];
exports.examStatusValues = ['open', 'upcoming', 'closed'];
exports.roleEnum = (0, mysql_core_1.mysqlEnum)('role', exports.roleValues);
exports.examStatusEnum = (0, mysql_core_1.mysqlEnum)('status', exports.examStatusValues);
exports.users = (0, mysql_core_1.mysqlTable)('User', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 })
        .primaryKey()
        .default((0, drizzle_orm_2.sql) `(uuid())`),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    password: (0, mysql_core_1.varchar)('password', { length: 255 }),
    role: exports.roleEnum.default('STUDENT'),
    picture: (0, mysql_core_1.text)('picture'),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    emailIdx: (0, mysql_core_1.uniqueIndex)('User_email_key').on(table.email),
}));
exports.colleges = (0, mysql_core_1.mysqlTable)('colleges', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    location: (0, mysql_core_1.varchar)('location', { length: 255 }).notNull(),
    stream: (0, mysql_core_1.varchar)('stream', { length: 255 }).notNull(),
    category: (0, mysql_core_1.varchar)('category', { length: 255 }).notNull(),
    nirfRank: (0, mysql_core_1.int)('nirfRank').notNull(),
    naacGrade: (0, mysql_core_1.varchar)('naacGrade', { length: 50 }),
    annualFees: (0, mysql_core_1.float)('annualFees').notNull(),
    rating: (0, mysql_core_1.float)('rating').default(0).notNull(),
    image: (0, mysql_core_1.text)('image').notNull(),
    established: (0, mysql_core_1.int)('established'),
    campusSize: (0, mysql_core_1.float)('campusSize'),
    phdFacultyPct: (0, mysql_core_1.float)('phdFacultyPct'),
    ratingAcademics: (0, mysql_core_1.float)('ratingAcademics').default(0),
    ratingPlacements: (0, mysql_core_1.float)('ratingPlacements').default(0),
    ratingInfrastructure: (0, mysql_core_1.float)('ratingInfrastructure').default(0),
    ratingCampusLife: (0, mysql_core_1.float)('ratingCampusLife').default(0),
    facilities: (0, mysql_core_1.json)('facilities').$type(),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    streamIdx: (0, mysql_core_1.index)('colleges_stream_idx').on(table.stream),
    categoryIdx: (0, mysql_core_1.index)('colleges_category_idx').on(table.category),
    nirfIdx: (0, mysql_core_1.index)('colleges_nirfRank_idx').on(table.nirfRank),
}));
exports.courses = (0, mysql_core_1.mysqlTable)('courses', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    collegeId: (0, mysql_core_1.int)('collegeId').notNull(),
    key: (0, mysql_core_1.varchar)('key', { length: 50 }).notNull(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    fees: (0, mysql_core_1.float)('fees').notNull(),
    hostelFees: (0, mysql_core_1.float)('hostelFees').notNull(),
    avgPackage: (0, mysql_core_1.float)('avgPackage').notNull(),
    medianPackage: (0, mysql_core_1.float)('medianPackage').notNull(),
    highestPackage: (0, mysql_core_1.float)('highestPackage').notNull(),
    placementRate: (0, mysql_core_1.float)('placementRate').notNull(),
    cutoff: (0, mysql_core_1.varchar)('cutoff', { length: 255 }).notNull(),
    acceptedExams: (0, mysql_core_1.varchar)('acceptedExams', { length: 255 }).notNull(),
    duration: (0, mysql_core_1.varchar)('duration', { length: 50 }).notNull(),
    seats: (0, mysql_core_1.int)('seats').notNull(),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    collegeIdx: (0, mysql_core_1.index)('courses_collegeId_idx').on(table.collegeId),
    keyIdx: (0, mysql_core_1.index)('courses_key_idx').on(table.key),
}));
exports.assessmentQuestions = (0, mysql_core_1.mysqlTable)('assessment_questions', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    collegeId: (0, mysql_core_1.int)('collegeId').notNull(),
    text: (0, mysql_core_1.text)('text').notNull(),
    options: (0, mysql_core_1.json)('options').$type().notNull(),
    correctOptionIndex: (0, mysql_core_1.int)('correctOptionIndex').notNull(),
    explanation: (0, mysql_core_1.text)('explanation').notNull(),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    collegeIdx: (0, mysql_core_1.index)('assessment_questions_collegeId_idx').on(table.collegeId),
}));
exports.entranceExams = (0, mysql_core_1.mysqlTable)('entrance_exams', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    stream: (0, mysql_core_1.varchar)('stream', { length: 255 }).notNull(),
    conductingBody: (0, mysql_core_1.varchar)('conductingBody', { length: 255 }).notNull(),
    mode: (0, mysql_core_1.varchar)('mode', { length: 50 }).notNull(),
    status: exports.examStatusEnum.notNull(),
    registrationTimeline: (0, mysql_core_1.varchar)('registrationTimeline', {
        length: 255,
    }).notNull(),
    examDatesTimeline: (0, mysql_core_1.varchar)('examDatesTimeline', { length: 255 }).notNull(),
    eligibility: (0, mysql_core_1.text)('eligibility').notNull(),
    targetColleges: (0, mysql_core_1.text)('targetColleges').notNull(),
    createdAt: (0, mysql_core_1.datetime)('created_at', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updated_at', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    streamIdx: (0, mysql_core_1.index)('entrance_exams_stream_idx').on(table.stream),
    statusIdx: (0, mysql_core_1.index)('entrance_exams_status_idx').on(table.status),
}));
exports.blogs = (0, mysql_core_1.mysqlTable)('blogs', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.varchar)('description', { length: 255 }).notNull(),
    content: (0, mysql_core_1.text)('content'),
    image: (0, mysql_core_1.text)('image').notNull(),
    category: (0, mysql_core_1.varchar)('category', { length: 255 }).notNull(),
    author: (0, mysql_core_1.varchar)('author', { length: 255 }).notNull(),
    authorType: (0, mysql_core_1.varchar)('authorType', { length: 255 }).notNull(),
    tags: (0, mysql_core_1.json)('tags').$type().notNull(),
    likes: (0, mysql_core_1.int)('likes').default(0).notNull(),
    views: (0, mysql_core_1.int)('views').default(0).notNull(),
    publishedAt: (0, mysql_core_1.datetime)('publishedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    categoryIdx: (0, mysql_core_1.index)('blogs_category_idx').on(table.category),
    publishedAtIdx: (0, mysql_core_1.index)('blogs_publishedAt_idx').on(table.publishedAt),
    authorIdx: (0, mysql_core_1.index)('blogs_author_idx').on(table.author),
}));
exports.counselingBookings = (0, mysql_core_1.mysqlTable)('counseling_bookings', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    phone: (0, mysql_core_1.varchar)('phone', { length: 20 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    targetCollege: (0, mysql_core_1.varchar)('targetCollege', { length: 255 }).notNull(),
    stream: (0, mysql_core_1.varchar)('stream', { length: 255 }).notNull(),
    preferredDate: (0, mysql_core_1.datetime)('preferredDate', { mode: 'date' }).notNull(),
    preferredTime: (0, mysql_core_1.varchar)('preferredTime', { length: 50 }).notNull(),
    concerns: (0, mysql_core_1.text)('concerns'),
    userId: (0, mysql_core_1.varchar)('userId', { length: 36 }),
    createdAt: (0, mysql_core_1.datetime)('createdAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updatedAt', { mode: 'date' }).default((0, drizzle_orm_2.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('counseling_bookings_email_idx').on(table.email),
    createdAtIdx: (0, mysql_core_1.index)('counseling_bookings_createdAt_idx').on(table.createdAt),
}));
exports.collegeRelations = (0, drizzle_orm_1.relations)(exports.colleges, ({ many }) => ({
    courses: many(exports.courses),
    assessmentQuestions: many(exports.assessmentQuestions),
}));
exports.courseRelations = (0, drizzle_orm_1.relations)(exports.courses, ({ one }) => ({
    college: one(exports.colleges, {
        fields: [exports.courses.collegeId],
        references: [exports.colleges.id],
    }),
}));
exports.assessmentQuestionRelations = (0, drizzle_orm_1.relations)(exports.assessmentQuestions, ({ one }) => ({
    college: one(exports.colleges, {
        fields: [exports.assessmentQuestions.collegeId],
        references: [exports.colleges.id],
    }),
}));
//# sourceMappingURL=schema.js.map