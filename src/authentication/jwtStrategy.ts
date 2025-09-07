import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

// Import passport and JWT.
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Import config service.
import { ConfigService } from '@nestjs/config';

// Import authentication service.
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.accessToken;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || '',
        });
    }

    async validate(payload: any) {
        const user = await this.authenticationService.validateUser(payload.id);
        if (!user) return null;
        return user;
    }
}