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
        name: 'Indian Institute of Technology (IIT), Madras',
        location: 'Chennai, Tamil Nadu',
        stream: 'engineering',
        category: 'government',
        nirfRank: 1,
        naacGrade: 'Exempt (IIT)',
        annualFees: 220000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60',
        established: 1959,
        campusSize: 617,
        phdFacultyPct: 98,
        ratingAcademics: 4.9,
        ratingPlacements: 4.8,
        ratingInfrastructure: 4.7,
        ratingCampusLife: 4.6,
        facilities: [
            'Supercomputing Lab',
            'Research Park',
            'Hostels (100% Wi-Fi)',
            'Olympic Swimming Pool',
            'Smart Classrooms',
        ],
        courses: [
            {
                key: 'cse',
                name: 'B.Tech Computer Science & Engineering',
                fees: 220000,
                hostelFees: 35000,
                avgPackage: 31.2,
                medianPackage: 26.5,
                highestPackage: 131.0,
                placementRate: 96,
                cutoff: 'JEE Rank 148',
                acceptedExams: 'JEE Advanced',
                duration: '4 Years',
                seats: 85,
            },
            {
                key: 'ece',
                name: 'B.Tech Electrical Engineering',
                fees: 220000,
                hostelFees: 35000,
                avgPackage: 24.5,
                medianPackage: 20.2,
                highestPackage: 85.0,
                placementRate: 91,
                cutoff: 'JEE Rank 520',
                acceptedExams: 'JEE Advanced',
                duration: '4 Years',
                seats: 110,
            },
        ],
    },
    {
        name: 'BITS Pilani - Main Campus',
        location: 'Pilani, Rajasthan',
        stream: 'engineering',
        category: 'private',
        nirfRank: 25,
        naacGrade: 'A',
        annualFees: 595000,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=60',
        established: 1964,
        campusSize: 328,
        phdFacultyPct: 92,
        ratingAcademics: 4.7,
        ratingPlacements: 4.6,
        ratingInfrastructure: 4.5,
        ratingCampusLife: 4.8,
        facilities: [
            'Clock Tower Hub',
            'BITS Library (24/7)',
            'Startup Incubator',
            'Student Activity Center',
            'High-Tech Labs',
        ],
        courses: [
            {
                key: 'cse',
                name: 'B.E. Computer Science',
                fees: 595000,
                hostelFees: 78000,
                avgPackage: 28.4,
                medianPackage: 24.0,
                highestPackage: 60.7,
                placementRate: 98,
                cutoff: 'BITSAT 331 Marks',
                acceptedExams: 'BITSAT',
                duration: '4 Years',
                seats: 120,
            },
            {
                key: 'ece',
                name: 'B.E. Electronics & Communication',
                fees: 595000,
                hostelFees: 78000,
                avgPackage: 22.1,
                medianPackage: 18.5,
                highestPackage: 48.0,
                placementRate: 93,
                cutoff: 'BITSAT 296 Marks',
                acceptedExams: 'BITSAT',
                duration: '4 Years',
                seats: 100,
            },
        ],
    },
    {
        name: 'National Institute of Technology (NIT), Trichy',
        location: 'Tiruchirappalli, Tamil Nadu',
        stream: 'engineering',
        category: 'government',
        nirfRank: 9,
        naacGrade: 'A+',
        annualFees: 145000,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1607237138185-eedd996e5b09?w=500&auto=format&fit=crop&q=60',
        established: 1964,
        campusSize: 800,
        phdFacultyPct: 89,
        ratingAcademics: 4.6,
        ratingPlacements: 4.5,
        ratingInfrastructure: 4.3,
        ratingCampusLife: 4.4,
        facilities: [
            'Octagon Computing Center',
            'CSG Network Facilities',
            'State-of-the-Art Hostels',
            'Mega Sports Complex',
            'Research Labs',
        ],
        courses: [
            {
                key: 'cse',
                name: 'B.Tech Computer Science & Engineering',
                fees: 145000,
                hostelFees: 42000,
                avgPackage: 27.2,
                medianPackage: 22.8,
                highestPackage: 52.8,
                placementRate: 97,
                cutoff: 'JEE Main Rank 1100',
                acceptedExams: 'JEE Main',
                duration: '4 Years',
                seats: 119,
            },
            {
                key: 'ece',
                name: 'B.Tech Electronics & Communication',
                fees: 145000,
                hostelFees: 42000,
                avgPackage: 21.0,
                medianPackage: 17.2,
                highestPackage: 40.0,
                placementRate: 92,
                cutoff: 'JEE Main Rank 3200',
                acceptedExams: 'JEE Main',
                duration: '4 Years',
                seats: 115,
            },
        ],
    },
    {
        name: 'All India Institute of Medical Sciences (AIIMS)',
        location: 'New Delhi, Delhi',
        stream: 'medical',
        category: 'government',
        nirfRank: 1,
        naacGrade: 'A++',
        annualFees: 1628,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=500&auto=format&fit=crop&q=60',
        established: 1956,
        campusSize: 115,
        phdFacultyPct: 99,
        ratingAcademics: 4.9,
        ratingPlacements: 4.9,
        ratingInfrastructure: 4.6,
        ratingCampusLife: 4.3,
        facilities: [
            'Trauma Center',
            'Convergence Block',
            'Central Library',
            'Research Labs',
            'Hostels',
        ],
        courses: [
            {
                key: 'mbbs',
                name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
                fees: 1628,
                hostelFees: 4220,
                avgPackage: 18.0,
                medianPackage: 16.5,
                highestPackage: 35.0,
                placementRate: 100,
                cutoff: 'NEET Rank 50',
                acceptedExams: 'NEET UG',
                duration: '5.5 Years',
                seats: 125,
            },
        ],
    },
];
async function main() {
    console.log('🧹 Cleaning up existing college and course data...');
    await db.delete(schema_1.courses);
    await db.delete(schema_1.colleges);
    console.log('✅ Cleared existing data.');
    console.log('🌱 Seeding colleges and courses...');
    for (const collegeItem of COLLEGES_DATA) {
        const { courses: courseData, ...collegeData } = collegeItem;
        const [insertedCollege] = await db
            .insert(schema_1.colleges)
            .values(collegeData)
            .$returningId();
        const collegeId = insertedCollege.id;
        if (courseData.length > 0) {
            await db.insert(schema_1.courses).values(courseData.map((course) => ({
                ...course,
                collegeId: collegeId,
            })));
        }
    }
    console.log('✅ Colleges and relational courses seeded successfully.');
    process.exit(0);
}
main().catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map