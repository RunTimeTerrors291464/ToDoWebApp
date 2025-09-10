import { Global, Module } from '@nestjs/common';

// Imports TypeORM module.
import { TypeOrmModule } from '@nestjs/typeorm';

// Imports config module.
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST') || 'localhost',
                port: parseInt(configService.get('DB_PORT') || '5432'),
                username: configService.get('DB_USERNAME') || 'postgres',
                password: configService.get('DB_PASSWORD') || 'postgres',
                database: configService.get('DB_NAME'),
                entities: ['dist/**/*.entity{.ts,.js}'],
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
