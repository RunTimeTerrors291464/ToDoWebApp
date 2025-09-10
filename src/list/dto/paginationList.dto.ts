import { IsNumber, IsOptional, IsEnum, IsIn, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Priority, Status } from '../entities/list.entity';

export class PaginationListDto {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC' = 'ASC';

    @IsOptional()
    @IsString()
    @Type(() => String)
    @IsIn(['title', 'priority', 'status', 'createdAt'])
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(Priority)
    @Type(() => Number)
    priority?: Priority;

    @IsOptional()
    @IsEnum(Status)
    @Type(() => Number)
    status?: Status;

    @IsOptional()
    @IsString()
    @Type(() => String)
    search?: string;
}
