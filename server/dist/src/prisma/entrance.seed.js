"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const promise_1 = require("mysql2/promise");
const mysql2_1 = require("drizzle-orm/mysql2");
const schema_1 = require("../db/schema");
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const pool = (0, promise_1.createPool)({ uri: dbUrl });
const db = (0, mysql2_1.drizzle)(pool);
const ENTRANCE_EXAMS_DATA = [
    {
        id: 'jee-main-2026',
        name: 'JEE Main 2026',
        stream: 'engineering',
        conductingBody: 'National Testing Agency (NTA)',
        mode: 'Online (Computer Based Test)',
        status: 'open',
        registrationTimeline: 'Nov 2025 - Dec 2025',
        examDatesTimeline: 'Jan 24 - Feb 01, 2026',
        eligibility: 'Passed Class 12 with Physics, Chemistry, and Mathematics (PCM) with minimum 75% aggregate marks.',
        targetColleges: 'NITs, IIITs, CFTIs, and qualifying examination for JEE Advanced (IITs).',
    },
    {
        id: 'neet-ug-2026',
        name: 'NEET UG 2026',
        stream: 'medical',
        conductingBody: 'National Testing Agency (NTA)',
        mode: 'Offline (Pen and Paper)',
        status: 'upcoming',
        registrationTimeline: 'Feb 2026 - Mar 2026',
        examDatesTimeline: 'May 03, 2026',
        eligibility: 'Passed Class 12 with Physics, Chemistry, Biology/Biotechnology with minimum 50% aggregate (40% for SC/ST/OBC).',
        targetColleges: 'AIIMS, JIPMER, Central & State Government Medical Colleges, AFMC.',
    },
    {
        id: 'cat-2026',
        name: 'CAT 2026',
        stream: 'management',
        conductingBody: 'Indian Institutes of Management (IIMs)',
        mode: 'Online (Computer Based Test)',
        status: 'upcoming',
        registrationTimeline: 'Aug 2026 - Sep 2026',
        examDatesTimeline: 'Nov 29, 2026',
        eligibility: 'Bachelor Degree with minimum 50% marks or equivalent CGPA (45% for SC/ST/PwD). Final year students are eligible.',
        targetColleges: 'IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi, XLRI, SPJIMR.',
    },
    {
        id: 'gate-2026',
        name: 'GATE 2026',
        stream: 'engineering',
        conductingBody: 'IITs / IISc Bangalore',
        mode: 'Online (Computer Based Test)',
        status: 'closed',
        registrationTimeline: 'Aug 2025 - Oct 2025',
        examDatesTimeline: 'Feb 07 - Feb 15, 2026',
        eligibility: 'Currently in 3rd year or higher of any undergraduate degree program in Engineering / Technology / Architecture / Science.',
        targetColleges: 'M.Tech admissions in IITs, NITs, IISc, and PSU recruitment (IOCL, NTPC, BHEL, etc.).',
    },
    {
        id: 'bitsat-2026',
        name: 'BITSAT 2026',
        stream: 'engineering',
        conductingBody: 'BITS Pilani',
        mode: 'Online (Computer Based Test)',
        status: 'open',
        registrationTimeline: 'Jan 2026 - Apr 2026',
        examDatesTimeline: 'Session 1: May 2026 | Session 2: Jun 2026',
        eligibility: 'Passed Class 12 with Physics, Chemistry, Mathematics, and English with minimum 75% aggregate in PCM.',
        targetColleges: 'BITS Pilani, BITS Goa, and BITS Hyderabad campuses.',
    },
    {
        id: 'cuet-ug-2026',
        name: 'CUET UG 2026',
        stream: 'general',
        conductingBody: 'National Testing Agency (NTA)',
        mode: 'Hybrid (CBT & Pen-Paper)',
        status: 'upcoming',
        registrationTimeline: 'Feb 2026 - Mar 2026',
        examDatesTimeline: 'May 15 - May 31, 2026',
        eligibility: 'Passed Class 12th or currently appearing in Class 12th examination from any recognized board.',
        targetColleges: 'Delhi University (DU), BHU, JNU, Jamia Millia Islamia, and other Central & Private Universities.',
    },
];
async function main() {
    console.log('🧹 Clearing existing entrance exams...');
    await db.delete(schema_1.entranceExams);
    console.log('✅ Cleared existing data.');
    console.log('🌱 Seeding entrance exams...');
    await db.insert(schema_1.entranceExams).values(ENTRANCE_EXAMS_DATA);
    console.log(`✅ Seeded ${ENTRANCE_EXAMS_DATA.length} entrance exams.`);
    process.exit(0);
}
main().catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
});
//# sourceMappingURL=entrance.seed.js.map