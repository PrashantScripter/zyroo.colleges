"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../generated/prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const adapter = new adapter_mariadb_1.PrismaMariaDb(dbUrl);
const prisma = new client_1.PrismaClient({ adapter });
const ENTRANCE_EXAMS_DATA = [
    {
        id: 'jee-main-2026',
        name: 'JEE Main 2026',
        stream: 'engineering',
        conductingBody: 'National Testing Agency (NTA)',
        mode: 'Online (Computer Based Test)',
        status: client_1.ExamStatus.open,
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
        status: client_1.ExamStatus.upcoming,
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
        status: client_1.ExamStatus.upcoming,
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
        status: client_1.ExamStatus.closed,
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
        status: client_1.ExamStatus.open,
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
        status: client_1.ExamStatus.upcoming,
        registrationTimeline: 'Feb 2026 - Mar 2026',
        examDatesTimeline: 'May 15 - May 31, 2026',
        eligibility: 'Passed Class 12th or currently appearing in Class 12th examination from any recognized board.',
        targetColleges: 'Delhi University (DU), BHU, JNU, Jamia Millia Islamia, and other Central & Private Universities.',
    },
];
async function main() {
    await prisma.entranceExam.deleteMany();
    await prisma.entranceExam.createMany({ data: ENTRANCE_EXAMS_DATA });
    console.log('Entrance exams seeded successfully');
}
main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=entrance.seed.js.map