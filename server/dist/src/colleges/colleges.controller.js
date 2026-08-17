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
exports.CollegesController = void 0;
const common_1 = require("@nestjs/common");
const colleges_service_1 = require("./colleges.service");
const get_colleges_query_dto_1 = require("./dto/get-colleges-query.dto");
let CollegesController = class CollegesController {
    collegesService;
    constructor(collegesService) {
        this.collegesService = collegesService;
    }
    findAll(query) {
        return this.collegesService.findAll(query);
    }
    async findOne(id) {
        const college = await this.collegesService.findOne(id);
        if (!college) {
            throw new common_1.NotFoundException(`College with ID ${id} not found`);
        }
        return college;
    }
};
exports.CollegesController = CollegesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_colleges_query_dto_1.GetCollegesQueryDto]),
    __metadata("design:returntype", void 0)
], CollegesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CollegesController.prototype, "findOne", null);
exports.CollegesController = CollegesController = __decorate([
    (0, common_1.Controller)('colleges'),
    __metadata("design:paramtypes", [colleges_service_1.CollegesService])
], CollegesController);
//# sourceMappingURL=colleges.controller.js.map