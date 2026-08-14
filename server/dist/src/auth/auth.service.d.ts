import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../generated/prisma/enums").Role;
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
            role: import("../generated/prisma/enums").Role;
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
            role: import("../generated/prisma/enums").Role;
            picture: string | null;
        };
    }>;
    private generateToken;
}
