"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounselingModule = void 0;
const common_1 = require("@nestjs/common");
const counseling_controller_1 = require("./counseling.controller");
const counseling_service_1 = require("./counseling.service");
let CounselingModule = class CounselingModule {
};
exports.CounselingModule = CounselingModule;
exports.CounselingModule = CounselingModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [counseling_controller_1.CounselingController],
        providers: [counseling_service_1.CounselingService],
        exports: [counseling_service_1.CounselingService],
    })
], CounselingModule);
//# sourceMappingURL=counseling.module.js.map