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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssessmentsService = class AssessmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllColleges() {
        return this.prisma.college.findMany({
            orderBy: { id: 'asc' },
            select: {
                id: true,
                name: true,
                location: true,
                stream: true,
            },
        });
    }
    async findQuestionsByCollegeId(collegeId) {
        const questions = await this.prisma.assessmentQuestion.findMany({
            where: { collegeId },
            orderBy: { id: 'asc' },
        });
        return questions.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options,
            correctOptionIndex: q.correctOptionIndex,
            explanation: q.explanation,
        }));
    }
    async evaluateAssessment(collegeId, answers) {
        const questions = await this.prisma.assessmentQuestion.findMany({
            where: { collegeId },
            select: {
                id: true,
                correctOptionIndex: true,
            },
        });
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssessmentsService);
//# sourceMappingURL=assessment.service.js.map