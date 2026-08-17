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
exports.AssessmentResultDto = exports.SubmitAssessmentDto = exports.GetQuestionsParamDto = exports.QuestionResponseDto = exports.CollegeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CollegeDto {
    id;
    name;
    location;
    stream;
}
exports.CollegeDto = CollegeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CollegeDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollegeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollegeDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollegeDto.prototype, "stream", void 0);
class QuestionResponseDto {
    id;
    text;
    options;
    correctOptionIndex;
    explanation;
}
exports.QuestionResponseDto = QuestionResponseDto;
class GetQuestionsParamDto {
    collegeId;
}
exports.GetQuestionsParamDto = GetQuestionsParamDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetQuestionsParamDto.prototype, "collegeId", void 0);
class SubmitAssessmentDto {
    collegeId;
    answers;
}
exports.SubmitAssessmentDto = SubmitAssessmentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SubmitAssessmentDto.prototype, "collegeId", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SubmitAssessmentDto.prototype, "answers", void 0);
class AssessmentResultDto {
    correct;
    total;
    percentage;
}
exports.AssessmentResultDto = AssessmentResultDto;
//# sourceMappingURL=assessment.dto.js.map