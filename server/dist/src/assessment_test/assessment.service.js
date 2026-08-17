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
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_provider_1 = require("../db/db.provider");
const schema_1 = require("../db/schema");
let AssessmentsService = class AssessmentsService {
    db;
    constructor(db) {
        this.db = db;
    }
    async findAllColleges() {
        const results = await this.db
            .select({
            id: schema_1.colleges.id,
            name: schema_1.colleges.name,
            location: schema_1.colleges.location,
            stream: schema_1.colleges.stream,
        })
            .from(schema_1.colleges)
            .orderBy((0, drizzle_orm_1.asc)(schema_1.colleges.id));
        return results;
    }
    async findQuestionsByCollegeId(collegeId) {
        const questions = await this.db
            .select({
            id: schema_1.assessmentQuestions.id,
            text: schema_1.assessmentQuestions.text,
            options: schema_1.assessmentQuestions.options,
            correctOptionIndex: schema_1.assessmentQuestions.correctOptionIndex,
            explanation: schema_1.assessmentQuestions.explanation,
        })
            .from(schema_1.assessmentQuestions)
            .where((0, drizzle_orm_1.eq)(schema_1.assessmentQuestions.collegeId, collegeId))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.assessmentQuestions.id));
        return questions.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options,
            correctOptionIndex: q.correctOptionIndex,
            explanation: q.explanation,
        }));
    }
    async evaluateAssessment(collegeId, answers) {
        const questions = await this.db
            .select({
            id: schema_1.assessmentQuestions.id,
            correctOptionIndex: schema_1.assessmentQuestions.correctOptionIndex,
        })
            .from(schema_1.assessmentQuestions)
            .where((0, drizzle_orm_1.eq)(schema_1.assessmentQuestions.collegeId, collegeId));
        if (questions.length === 0) {
            throw new common_1.NotFoundException(`No assessment questions found for College ID ${collegeId}`);
        }
        let correctCount = 0;
        questions.forEach((q) => {
            const selectedOption = answers[q.id];
            if (selectedOption !== undefined &&
                selectedOption === q.correctOptionIndex) {
                correctCount++;
            }
        });
        const total = questions.length;
        const percentage = Math.round((correctCount / total) * 100);
        return {
            correct: correctCount,
            total,
            percentage,
        };
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_provider_1.DRIZZLE)),
    __metadata("design:paramtypes", [Function])
], AssessmentsService);
//# sourceMappingURL=assessment.service.js.map