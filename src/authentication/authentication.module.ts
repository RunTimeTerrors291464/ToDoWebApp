import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserEntity } from './entities/user.entity';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtStrategy } from './jwtStrategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || '',
                signOptions: {
                    expiresIn: '14d',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthenticationModule { }