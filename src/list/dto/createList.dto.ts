import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Priority, Status } from '../entities/list.entity';

export class CreateListDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    priority?: Priority;

    @IsNumber()
    @IsOptional()
    status?: Status;
}