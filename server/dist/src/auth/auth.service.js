"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const drizzle_orm_1 = require("drizzle-orm");
const db_provider_1 = require("../db/db.provider");
const schema_1 = require("../db/schema");
let AuthService = class AuthService {
    db;
    jwtService;
    constructor(db, jwtService) {
        this.db = db;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const existing = await this.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, dto.email));
        if (existing.length > 0) {
            throw new common_1.ConflictException('An account with this email address already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        await this.db.insert(schema_1.users).values({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: dto.role,
            picture: dto.picture || null,
        });
        const [user] = await this.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, dto.email));
        const token = this.generateToken(user.id, user.email, false);
        return {
            message: 'Account created successfully',
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                picture: user.picture,
            },
        };
    }
    async login(dto) {
        const [user] = await this.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, dto.email));
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!user.password) {
            throw new common_1.UnauthorizedException('This account was created using Google Sign-In. Please sign in with Google.');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.generateToken(user.id, user.email, dto.rememberMe);
        return {
            message: 'Signed in successfully',
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                picture: user.picture,
            },
        };
    }
    async googleLogin(googleUser) {
        if (!googleUser || !googleUser.email) {
            throw new common_1.UnauthorizedException('Google authentication failed: Missing profile data');
        }
        try {
            let [user] = await this.db
                .select()
                .from(schema_1.users)
                .where((0, drizzle_orm_1.eq)(schema_1.users.email, googleUser.email));
            if (!user) {
                await this.db.insert(schema_1.users).values({
                    email: googleUser.email,
                    name: googleUser.name || 'Google User',
                    picture: googleUser.picture || null,
                    role: 'STUDENT',
                });
                [user] = await this.db
                    .select()
                    .from(schema_1.users)
                    .where((0, drizzle_orm_1.eq)(schema_1.users.email, googleUser.email));
            }
            else if (googleUser.picture && user.picture !== googleUser.picture) {
                await this.db
                    .update(schema_1.users)
                    .set({ picture: googleUser.picture })
                    .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id));
                [user] = await this.db
                    .select()
                    .from(schema_1.users)
                    .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id));
            }
            const token = this.generateToken(user.id, user.email, true);
            return {
                message: 'Authenticated with Google successfully',
                access_token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    picture: user.picture,
                },
            };
        }
        catch (error) {
            console.error('Error during googleLogin database operation:', error);
            throw new common_1.InternalServerErrorException('Database operational failure during Google login');
        }
    }
    generateToken(userId, email, rememberMe) {
        const payload = { sub: userId, email };
        const expiresIn = rememberMe ? '30d' : '1d';
        return this.jwtService.sign(payload, { expiresIn });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_provider_1.DRIZZLE)),
    __metadata("design:paramtypes", [Function, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map