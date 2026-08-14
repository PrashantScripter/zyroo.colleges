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
exports.AssessmentsController = void 0;
const common_1 = require("@nestjs/common");
const assessment_service_1 = require("./assessment.service");
const assessment_dto_1 = require("./dto/assessment.dto");
let AssessmentsController = class AssessmentsController {
    assessmentsService;
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    async getColleges() {
        return this.assessmentsService.findAllColleges();
    }
    async getQuestionsByCollege(collegeId) {
        return this.assessmentsService.findQuestionsByCollegeId(collegeId);
    }
    async submitAssessment(dto) {
        return this.assessmentsService.evaluateAssessment(dto.collegeId, dto.answers);
    }
};
exports.AssessmentsController = AssessmentsController;
__decorate([
    (0, common_1.Get)('colleges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "getColleges", null);
__decorate([
    (0, common_1.Get)('questions/:collegeId'),
    __param(0, (0, common_1.Param)('collegeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "getQuestionsByCollege", null);
__decorate([
    (0, common_1.Post)('submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assessment_dto_1.SubmitAssessmentDto]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "submitAssessment", null);
exports.AssessmentsController = AssessmentsController = __decorate([
    (0, common_1.Controller)('assessments'),
    __metadata("design:paramtypes", [assessment_service_1.AssessmentsService])
], AssessmentsController);
//# sourceMappingURL=assessment.controller.js.map