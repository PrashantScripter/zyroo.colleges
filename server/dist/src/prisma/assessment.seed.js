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
const COLLEGES_DATA = [
    {
        id: 1,
        name: 'Indian Institute of Technology (IIT), Madras',
        location: 'Chennai, Tamil Nadu',
        stream: 'engineering',
        category: 'government',
        nirfRank: 1,
        naacGrade: 'Exempt (IIT)',
        annualFees: 209000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585',
        established: 1959,
        campusSize: 617,
        phdFacultyPct: 98,
        ratingAcademics: 4.9,
        ratingPlacements: 4.9,
        ratingInfrastructure: 4.8,
        ratingCampusLife: 4.7,
        facilities: [
            'Research Park',
            'Hostels',
            'Central Library',
            'Sports Complex',
        ],
    },
    {
        id: 3,
        name: 'BITS Pilani - Vidya Vihar Campus',
        location: 'Pilani, Rajasthan',
        stream: 'engineering',
        category: 'private',
        nirfRank: 25,
        naacGrade: 'A',
        annualFees: 535000,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3',
        established: 1964,
        campusSize: 328,
        phdFacultyPct: 92,
        ratingAcademics: 4.7,
        ratingPlacements: 4.8,
        ratingInfrastructure: 4.6,
        ratingCampusLife: 4.9,
        facilities: ['Innovation Lab', 'Library', 'Hostels'],
    },
    {
        id: 5,
        name: 'Delhi Technological University (DTU)',
        location: 'Delhi, New Delhi',
        stream: 'engineering',
        category: 'government',
        nirfRank: 29,
        naacGrade: 'A',
        annualFees: 219000,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        established: 1941,
        campusSize: 164,
        phdFacultyPct: 85,
        ratingAcademics: 4.5,
        ratingPlacements: 4.6,
        ratingInfrastructure: 4.4,
        ratingCampusLife: 4.6,
        facilities: ['Computing Center', 'Sports Complex', 'Auditorium'],
    },
    {
        id: 7,
        name: 'Indian Institute of Management (IIM), Ahmedabad',
        location: 'Ahmedabad, Gujarat',
        stream: 'management',
        category: 'government',
        nirfRank: 1,
        naacGrade: 'Exempt (IIM)',
        annualFees: 2500000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
        established: 1961,
        campusSize: 106,
        phdFacultyPct: 99,
        ratingAcademics: 5.0,
        ratingPlacements: 5.0,
        ratingInfrastructure: 4.8,
        ratingCampusLife: 4.8,
        facilities: ['Vikram Sarabhai Library', 'Incubation Centre', 'Hostels'],
    },
];
const ASSESSMENT_QUESTIONS_DATA = [
    {
        collegeId: 1,
        text: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctOptionIndex: 2,
        explanation: 'A balanced BST cuts the search space in half with each comparison, resulting in logarithmic time complexity.',
    },
    {
        collegeId: 1,
        text: 'Which HTTP status code represents an Internal Server Error?',
        options: [
            '400 Bad Request',
            '404 Not Found',
            '500 Internal Server Error',
            '503 Service Unavailable',
        ],
        correctOptionIndex: 2,
        explanation: 'The 5xx series status codes represent server-side errors.',
    },
    {
        collegeId: 1,
        text: 'In React, what hook would you use to optimize performance by memoizing a computed value across renders?',
        options: ['useEffect', 'useMemo', 'useCallback', 'useState'],
        correctOptionIndex: 1,
        explanation: 'useMemo caches the result of a calculation between renders.',
    },
    {
        collegeId: 3,
        text: 'Which scheduling algorithm can cause the problem of starvation?',
        options: [
            'Round Robin',
            'First Come First Served',
            'Priority Scheduling',
            'Shortest Job First',
        ],
        correctOptionIndex: 2,
        explanation: 'Priority scheduling allows low-priority tasks to wait indefinitely if higher priority tasks keep coming.',
    },
    {
        collegeId: 3,
        text: 'What is the primary role of an Indexing structural framework in PostgreSQL queries?',
        options: [
            'To encrypt tabular disk rows',
            'To reduce disk sequential access scans',
            'To automatically normalise schemas',
            'To isolate database concurrency transactions',
        ],
        correctOptionIndex: 1,
        explanation: 'Indexes allow fast lookup without scanning every row in a table.',
    },
    {
        collegeId: 5,
        text: 'Which layer of the OSI model handles logical network addressing and routing?',
        options: [
            'Data Link Layer',
            'Transport Layer',
            'Network Layer',
            'Physical Layer',
        ],
        correctOptionIndex: 2,
        explanation: 'The Network layer is responsible for logical addressing (IP) and routing.',
    },
    {
        collegeId: 7,
        text: 'Which framework is primarily used to analyze the competitive environment of an industry?',
        options: [
            'BCG Matrix',
            "Porter's Five Forces",
            "Kotler's 4 Ps",
            'Ansoff Matrix',
        ],
        correctOptionIndex: 1,
        explanation: "Porter's Five Forces identifies and analyzes five competitive forces that shape every industry.",
    },
];
async function main() {
    console.log('🧹 Cleaning up existing assessment data...');
    await db.delete(schema_1.assessmentQuestions);
    await db.delete(schema_1.colleges);
    console.log('✅ Cleared existing data.');
    console.log('🌱 Seeding assessment colleges and questions...');
    for (const college of COLLEGES_DATA) {
        await db.insert(schema_1.colleges).values(college);
    }
    await db.insert(schema_1.assessmentQuestions).values(ASSESSMENT_QUESTIONS_DATA);
    console.log('✅ Assessment data seeded successfully.');
    process.exit(0);
}
main().catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
});
//# sourceMappingURL=assessment.seed.js.map