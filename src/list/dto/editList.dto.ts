import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Priority, Status } from '../entities/list.entity';

export class EditListDto {
        
    @IsString()
    @IsOptional()
    title?: string;

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