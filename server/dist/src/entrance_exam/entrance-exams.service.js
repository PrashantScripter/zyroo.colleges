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
exports.EntranceExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EntranceExamsService = class EntranceExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(queryDto) {
        const { search, stream, status, mode } = queryDto;
        const where = {};
        if (search && search.trim() !== '') {
            const searchTerm = search.trim();
            where.OR = [
                { name: { contains: searchTerm } },
                { conductingBody: { contains: searchTerm } },
            ];
        }
        if (stream && stream !== 'all') {
            where.stream = stream;
        }
        if (status && status !== 'all') {
            where.status = status;
        }
        if (mode && mode !== 'all') {
            where.mode = { contains: mode };
        }
        const exams = await this.prisma.entranceExam.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        return exams.map((exam) => this.transformToFrontendShape(exam));
    }
    async findOne(id) {
        const exam = await this.prisma.entranceExam.findUnique({
            where: { id },
        });
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EntranceExamsService);
//# sourceMappingURL=entrance-exams.service.js.map