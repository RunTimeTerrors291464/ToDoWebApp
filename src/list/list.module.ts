import { Module } from '@nestjs/common';
import { ListEntity } from './entities/list.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ListService } from './services/list.service';
import { UserEntity } from 'src/authentication/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from './controllers/list.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ListEntity, UserEntity]),
        AuthenticationModule,
    ],
    controllers: [ListController],
    providers: [ListService],
    exports: [ListService],
    })
export class ListModule {}
