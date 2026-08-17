// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/db.provider';
import { users } from '../../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../../db/schema')>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'zyroo_colleges_super_secret_jwt_key_2026',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const result = await this.db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        picture: users.picture,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, payload.sub));

    const user = result[0];

    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    return user;
  }
}