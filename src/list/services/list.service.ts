import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Imports list entity.
import { ListEntity } from '../entities/list.entity';
import { UserEntity } from '../../authentication/entities/user.entity';

// Imports authentication service.
import { AuthenticationService } from '../../authentication/services/authentication.service';

// Imports DTO.
import { CreateListDto } from '../dto/createList.dto';
import { EditListDto } from '../dto/editList.dto';
import { PaginationListDto } from '../dto/paginationList.dto';

// Import custom exception.
import { CustomErrorException } from '../../common/customException';
import { errorCodes } from '../../common/errorConstants';

@Injectable()
export class ListService {

    constructor(
        @InjectRepository(ListEntity) private readonly listRepository: Repository<ListEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly authenticationService: AuthenticationService,
    ) { }

    // Create a new to do list.
    async createList(userId: number, createListDto: CreateListDto) {
        // Create a new list entity.
        const listEntity = this.listRepository.create({
            userId: userId,
            title: createListDto.title,
            description: createListDto.description,
            priority: createListDto.priority,
            status: createListDto.status,
        });
        const savedList = await this.listRepository.save(listEntity);
        return savedList;
    }

    // Edit a to do list.
    async editList(id: number, editListDto: EditListDto) {

        let result: any;

        // Extract the fields in DTO.
        const { ...fieldsToUpdate } = editListDto;

        // Filter only the fields that are not null.
        const updatedFields = Object.fromEntries(
            Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined),
        );

        // Only proceed if there are fields to update.
        if (Object.keys(updatedFields).length > 0) {
            result = await this.listRepository.update(id, updatedFields);
        }

        return result;
    }

    // Get the to do list by id.
    async getListById(id: number) {
        return await this.listRepository.findOne({ where: { id } });
    }

    // Get a pagenation of to do list of a user.
    async getPaginationList(userId: number, paginationListDto: PaginationListDto) {
        const { page, limit, sortOrder, sortBy, priority, status, search } = paginationListDto;

        // Calculate skip value for pagination.
        const skip = (page - 1) * limit;

        // Build the query.
        const queryBuilder = this.listRepository
            .createQueryBuilder('list')
            .where('list.userId = :userId', { userId })
            .orderBy(`list.${sortBy}`, sortOrder || 'ASC');
        
        // Apply filters.
        if (priority !== undefined) {
            queryBuilder.andWhere('list.priority = :priority', { priority });
        }
        if (status !== undefined) {
            queryBuilder.andWhere('list.status = :status', { status });
        }

        // Add search functionality.
        if (search && search.trim()) {
            queryBuilder.andWhere('list.title ILIKE :search', { search: `%${search}%` });
        }

        // Get total count for pagination info.
        const total = await queryBuilder.getCount();

        // Get the paginated list.
        const data = await queryBuilder
            .skip(skip)
            .take(limit)
            .getMany();
        
        // Calculate the pagination info.
        const totalPages = Math.ceil(total / limit);
        const currentPage = page;
        const hasNextPage = currentPage < totalPages;
        const hasPreviousPage = currentPage > 1;

        return {
            data,
            total,
            currentPage,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        };
    }

    // Delete a to do list by id.
    async deleteListById(id: number) {
        return await this.listRepository.delete(id);
    }

}