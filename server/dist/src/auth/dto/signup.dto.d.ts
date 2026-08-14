import { Role } from '../../generated/prisma/client';
export declare class SignupDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    picture?: string;
}
