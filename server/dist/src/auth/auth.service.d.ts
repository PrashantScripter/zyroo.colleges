import { JwtService } from '@nestjs/jwt';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private db;
    private jwtService;
    constructor(db: MySql2Database<typeof import('../db/schema')>, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "STUDENT" | "COUNSELOR" | "PARENT" | "COLLEGE_REP" | null;
            picture: string | null;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "STUDENT" | "COUNSELOR" | "PARENT" | "COLLEGE_REP" | null;
            picture: string | null;
        };
    }>;
    googleLogin(googleUser: {
        email: string;
        name: string;
        picture?: string;
    }): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "STUDENT" | "COUNSELOR" | "PARENT" | "COLLEGE_REP" | null;
            picture: string | null;
        };
    }>;
    private generateToken;
}
