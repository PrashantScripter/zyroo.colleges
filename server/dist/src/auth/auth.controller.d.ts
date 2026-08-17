import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    getProfile(req: any): any;
}
