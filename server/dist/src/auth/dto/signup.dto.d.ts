import { Role } from '../../db/schema';
export declare class SignupDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    picture?: string;
}
