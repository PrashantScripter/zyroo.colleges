import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, displayName } = profile;

    const email = emails?.[0]?.value;
    if (!email) {
      return done(new Error('No email found in Google profile'), false);
    }

    const firstName = name?.givenName || '';
    const lastName = name?.familyName || '';
    const fullName =
      `${firstName} ${lastName}`.trim() || displayName || 'Google User';

    // Safely extract Google avatar URL
    const picture = photos?.[0]?.value || null;

    const user = {
      email,
      name: fullName,
      picture,
    };

    done(null, user);
  }
}
