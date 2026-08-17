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
const BLOGS_DATA = [
    {
        title: 'IIT Bombay Opens Applications for MTech 2026 Batch',
        description: 'The Indian Institute of Technology Bombay has opened applications for its prestigious MTech programs. Eligible candidates must have valid GATE scores...',
        content: `
      <p>The Indian Institute of Technology Bombay (IITB) has officially opened applications for its Master of Technology (MTech) programs for the 2026 academic session. Aspiring candidates can now apply online through the official admissions portal.</p>
      <p><strong>Eligibility:</strong> Candidates must hold a Bachelor's degree in Engineering/Technology or a Master's degree in Science with a valid GATE score. The application window closes on March 31, 2026.</p>
      <p>IIT Bombay offers specializations in Computer Science, Electrical Engineering, Mechanical Engineering, and several interdisciplinary fields. The institute is known for its world-class faculty, research facilities, and strong industry connections.</p>
      <p>For more details, visit the official admissions website.</p>
    `,
        image: 'https://plus.unsplash.com/premium_photo-1773028329721-628a5714e05a?q=80&w=1170&auto=format&fit=crop',
        category: 'Admissions',
        author: 'IIT Bombay',
        authorType: 'Government',
        tags: ['MTech', 'GATE', 'Engineering'],
        likes: 342,
        views: 12500,
        publishedAt: new Date('2026-06-19T00:00:00.000Z'),
    },
    {
        title: 'VIT University to Host TechFest 2026 — Register Now',
        description: 'VIT Vellore is set to host its annual mega technical festival TechFest 2026 with participation from 3,000+ national and international college students...',
        content: `
      <p>VIT University, Vellore, announces its flagship technical festival <strong>TechFest 2026</strong> scheduled for July 15-17, 2026. The event will feature hackathons, workshops, guest lectures, and competitive coding challenges.</p>
      <p>Over 3,000 students from across India and abroad are expected to participate. The festival aims to foster innovation and collaboration among young engineers and scientists.</p>
      <p>Registration is now open on the official TechFest portal. Early bird discounts are available until June 30.</p>
    `,
        image: 'https://images.unsplash.com/photo-1584309168598-3ae5bb78c70c?q=80&w=687&auto=format&fit=crop',
        category: 'Events',
        author: 'VIT University',
        authorType: 'Deemed',
        tags: ['TechFest', 'Engineering', 'Workshop'],
        likes: 218,
        views: 8700,
        publishedAt: new Date('2026-06-18T00:00:00.000Z'),
    },
    {
        title: 'JNU Announces 100% Scholarship for SC/ST Students in 2026',
        description: 'Jawaharlal Nehru University announces a comprehensive scholarship program covering full tuition, campus housing, and monthly living stipends...',
        content: `
      <p>Jawaharlal Nehru University (JNU) has unveiled a new scholarship initiative that provides 100% fee waiver and additional living allowances to all SC/ST students enrolling in 2026.</p>
      <p>The scholarship covers full tuition, hostel accommodation, and a monthly stipend of ₹12,000 for living expenses. The program is designed to ensure that financial constraints do not hinder access to quality higher education.</p>
      <p>Eligible candidates must have secured admission to any undergraduate or postgraduate program at JNU. The scholarship is automatically awarded upon verification of SC/ST status.</p>
    `,
        image: 'https://images.unsplash.com/photo-1662042255881-da9dc04f5e28?q=80&w=1136&auto=format&fit=crop',
        category: 'Scholarship',
        author: 'Jawaharlal Nehru University',
        authorType: 'Government',
        tags: ['Scholarship', 'SC/ST', 'JNU'],
        likes: 589,
        views: 23400,
        publishedAt: new Date('2026-06-17T00:00:00.000Z'),
    },
];
async function main() {
    console.log('🧹 Clearing existing blogs...');
    await db.delete(schema_1.blogs);
    console.log('✅ Cleared existing blogs.');
    console.log('🌱 Seeding blogs...');
    await db.insert(schema_1.blogs).values(BLOGS_DATA);
    console.log(`✅ Seeded ${BLOGS_DATA.length} blog posts successfully.`);
    process.exit(0);
}
main().catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
});
//# sourceMappingURL=blog.seed.js.map