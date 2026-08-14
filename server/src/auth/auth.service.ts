import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        'An account with this email address already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

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

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'This account was created using Google Sign-In. Please sign in with Google.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
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

  async googleLogin(googleUser: {
    email: string;
    name: string;
    picture?: string;
  }) {
    if (!googleUser || !googleUser.email) {
      throw new UnauthorizedException(
        'Google authentication failed: Missing profile data',
      );
    }

    try {
      let user = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email,
            name: googleUser.name || 'Google User',
            picture: googleUser.picture || null,
            role: 'STUDENT',
          },
        });
      } else if (googleUser.picture && user.picture !== googleUser.picture) {
        // Update avatar if user picture changed in Google
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { picture: googleUser.picture },
        });
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
    } catch (error) {
      console.error('Error during googleLogin database operation:', error);
      throw new InternalServerErrorException(
        'Database operational failure during Google login',
      );
    }
  }

  private generateToken(userId: string, email: string, rememberMe?: boolean) {
    const payload = { sub: userId, email };
    const expiresIn = rememberMe ? '30d' : '1d';

    return this.jwtService.sign(payload, { expiresIn });
  }
}
