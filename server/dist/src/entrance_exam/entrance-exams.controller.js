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
exports.EntranceExamsController = void 0;
const common_1 = require("@nestjs/common");
const entrance_exams_service_1 = require("./entrance-exams.service");
const get_entrance_exams_dto_1 = require("./dto/get-entrance-exams.dto");
let EntranceExamsController = class EntranceExamsController {
    entranceExamsService;
    constructor(entranceExamsService) {
        this.entranceExamsService = entranceExamsService;
    }
    async findAll(queryDto) {
        return this.entranceExamsService.findAll(queryDto);
    }
    async findOne(id) {
        return this.entranceExamsService.findOne(id);
    }
};
exports.EntranceExamsController = EntranceExamsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_entrance_exams_dto_1.GetEntranceExamsDto]),
    __metadata("design:returntype", Promise)
], EntranceExamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntranceExamsController.prototype, "findOne", null);
exports.EntranceExamsController = EntranceExamsController = __decorate([
    (0, common_1.Controller)('entrance-exams'),
    __metadata("design:paramtypes", [entrance_exams_service_1.EntranceExamsService])
], EntranceExamsController);
//# sourceMappingURL=entrance-exams.controller.js.map