"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntranceExamsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_provider_1 = require("../db/db.provider");
const schema_1 = require("../db/schema");
let EntranceExamsService = class EntranceExamsService {
    db;
    constructor(db) {
        this.db = db;
    }
    async findAll(queryDto) {
        const { search, stream, status, mode } = queryDto;
        const whereConditions = [];
        if (search && search.trim() !== '') {
            const term = `%${search.trim()}%`;
            whereConditions.push((0, drizzle_orm_1.sql) `(name LIKE ${term} OR conductingBody LIKE ${term})`);
        }
        if (stream && stream !== 'all') {
            whereConditions.push((0, drizzle_orm_1.eq)(schema_1.entranceExams.stream, stream));
        }
        if (status && status !== 'all') {
            if (schema_1.examStatusValues.includes(status)) {
                whereConditions.push((0, drizzle_orm_1.eq)(schema_1.entranceExams.status, status));
            }
        }
        if (mode && mode !== 'all') {
            whereConditions.push((0, drizzle_orm_1.like)(schema_1.entranceExams.mode, `%${mode}%`));
        }
        const whereClause = whereConditions.length > 0 ? (0, drizzle_orm_1.and)(...whereConditions) : undefined;
        const exams = await this.db
            .select()
            .from(schema_1.entranceExams)
            .where(whereClause)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.entranceExams.createdAt));
        return exams.map((exam) => this.transformToFrontendShape(exam));
    }
    async findOne(id) {
        const [exam] = await this.db
            .select()
            .from(schema_1.entranceExams)
            .where((0, drizzle_orm_1.eq)(schema_1.entranceExams.id, id));
        if (!exam) {
            throw new common_1.NotFoundException(`Entrance exam with ID "${id}" not found`);
        }
        return this.transformToFrontendShape(exam);
    }
    transformToFrontendShape(exam) {
        const { registrationTimeline, examDatesTimeline, ...rest } = exam;
        return {
            ...rest,
            timeline: {
                registration: registrationTimeline,
                examDates: examDatesTimeline,
            },
        };
    }
};
exports.EntranceExamsService = EntranceExamsService;
exports.EntranceExamsService = EntranceExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_provider_1.DRIZZLE)),
    __metadata("design:paramtypes", [Function])
], EntranceExamsService);
//# sourceMappingURL=entrance-exams.service.js.map