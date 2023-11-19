import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_ENVIRONMENT_NAME } from './constants.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET_ENVIRONMENT_NAME),
    });
  }

  public async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
