import {
  mysqlTable,
  int,
  varchar,
  text,
  float,
  json,
  datetime,
  mysqlEnum,
  uniqueIndex,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// ---------- ENUMS ----------
// Define enum values as const arrays
export const roleValues = [
  'STUDENT',
  'COUNSELOR',
  'PARENT',
  'COLLEGE_REP',
] as const;
export const examStatusValues = ['open', 'upcoming', 'closed'] as const;

// Create the enum columns using the arrays
export const roleEnum = mysqlEnum('role', roleValues);
export const examStatusEnum = mysqlEnum('exam_status', examStatusValues);

// Export the types (union of the literal values)
export type Role = (typeof roleValues)[number];
export type ExamStatus = (typeof examStatusValues)[number];

// ---------- TABLES ----------

// 1. User
export const users = mysqlTable(
  'User',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`(uuid())`),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    role: roleEnum.default('STUDENT'), // FIXED
    picture: text('picture'),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    emailIdx: uniqueIndex('User_email_key').on(table.email),
  }),
);

// 2. College
export const colleges = mysqlTable(
  'colleges',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    stream: varchar('stream', { length: 255 }).notNull(),
    category: varchar('category', { length: 255 }).notNull(),
    nirfRank: int('nirfRank').notNull(),
    naacGrade: varchar('naacGrade', { length: 50 }),
    annualFees: float('annualFees').notNull(),
    rating: float('rating').default(0).notNull(),
    image: text('image').notNull(),
    established: int('established'),
    campusSize: float('campusSize'),
    phdFacultyPct: float('phdFacultyPct'),
    ratingAcademics: float('ratingAcademics').default(0),
    ratingPlacements: float('ratingPlacements').default(0),
    ratingInfrastructure: float('ratingInfrastructure').default(0),
    ratingCampusLife: float('ratingCampusLife').default(0),
    facilities: json('facilities').$type<string[]>(),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    streamIdx: index('colleges_stream_idx').on(table.stream),
    categoryIdx: index('colleges_category_idx').on(table.category),
    nirfIdx: index('colleges_nirfRank_idx').on(table.nirfRank),
  }),
);

// 3. Course
export const courses = mysqlTable(
  'courses',
  {
    id: int('id').primaryKey().autoincrement(),
    collegeId: int('collegeId').notNull(),
    key: varchar('key', { length: 50 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    fees: float('fees').notNull(),
    hostelFees: float('hostelFees').notNull(),
    avgPackage: float('avgPackage').notNull(),
    medianPackage: float('medianPackage').notNull(),
    highestPackage: float('highestPackage').notNull(),
    placementRate: float('placementRate').notNull(),
    cutoff: varchar('cutoff', { length: 255 }).notNull(),
    acceptedExams: varchar('acceptedExams', { length: 255 }).notNull(),
    duration: varchar('duration', { length: 50 }).notNull(),
    seats: int('seats').notNull(),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    collegeIdx: index('courses_collegeId_idx').on(table.collegeId),
    keyIdx: index('courses_key_idx').on(table.key),
  }),
);

// 4. AssessmentQuestion
export const assessmentQuestions = mysqlTable(
  'assessment_questions',
  {
    id: int('id').primaryKey().autoincrement(),
    collegeId: int('collegeId').notNull(),
    text: text('text').notNull(),
    options: json('options').$type<string[]>().notNull(),
    correctOptionIndex: int('correctOptionIndex').notNull(),
    explanation: text('explanation').notNull(),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    collegeIdx: index('assessment_questions_collegeId_idx').on(table.collegeId),
  }),
);

// 5. EntranceExam
export const entranceExams = mysqlTable(
  'entrance_exams',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    stream: varchar('stream', { length: 255 }).notNull(),
    conductingBody: varchar('conductingBody', { length: 255 }).notNull(),
    mode: varchar('mode', { length: 50 }).notNull(),
    status: examStatusEnum.notNull(), // FIXED
    registrationTimeline: varchar('registrationTimeline', {
      length: 255,
    }).notNull(),
    examDatesTimeline: varchar('examDatesTimeline', { length: 255 }).notNull(),
    eligibility: text('eligibility').notNull(),
    targetColleges: text('targetColleges').notNull(),
    createdAt: datetime('created_at', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updated_at', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    streamIdx: index('entrance_exams_stream_idx').on(table.stream),
    statusIdx: index('entrance_exams_status_idx').on(table.status),
  }),
);

// 6. Blog
export const blogs = mysqlTable(
  'blogs',
  {
    id: int('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    content: text('content'),
    image: text('image').notNull(),
    category: varchar('category', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    authorType: varchar('authorType', { length: 255 }).notNull(),
    tags: json('tags').$type<string[]>().notNull(),
    likes: int('likes').default(0).notNull(),
    views: int('views').default(0).notNull(),
    publishedAt: datetime('publishedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    categoryIdx: index('blogs_category_idx').on(table.category),
    publishedAtIdx: index('blogs_publishedAt_idx').on(table.publishedAt),
    authorIdx: index('blogs_author_idx').on(table.author),
  }),
);

// 7. CounselingBooking
export const counselingBookings = mysqlTable(
  'counseling_bookings',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    targetCollege: varchar('targetCollege', { length: 255 }).notNull(),
    stream: varchar('stream', { length: 255 }).notNull(),
    preferredDate: datetime('preferredDate', { mode: 'date' }).notNull(),
    preferredTime: varchar('preferredTime', { length: 50 }).notNull(),
    concerns: text('concerns'),
    userId: varchar('userId', { length: 36 }),
    createdAt: datetime('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: datetime('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    ),
  },
  (table) => ({
    emailIdx: index('counseling_bookings_email_idx').on(table.email),
    createdAtIdx: index('counseling_bookings_createdAt_idx').on(
      table.createdAt,
    ),
  }),
);

// ---------- RELATIONS (optional but useful) ----------
export const collegeRelations = relations(colleges, ({ many }) => ({
  courses: many(courses),
  assessmentQuestions: many(assessmentQuestions),
}));

export const courseRelations = relations(courses, ({ one }) => ({
  college: one(colleges, {
    fields: [courses.collegeId],
    references: [colleges.id],
  }),
}));

export const assessmentQuestionRelations = relations(
  assessmentQuestions,
  ({ one }) => ({
    college: one(colleges, {
      fields: [assessmentQuestions.collegeId],
      references: [colleges.id],
    }),
  }),
);
