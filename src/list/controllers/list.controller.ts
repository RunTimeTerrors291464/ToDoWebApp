import { Controller, Post, Body, Res, UseGuards, Req, Put, Query, Get, Delete, HttpCode } from '@nestjs/common';
import type { Request } from 'express';

// Imports list service.
import { ListService } from '../services/list.service';

// Imports authentication service.
import { AuthenticationService } from '../../authentication/services/authentication.service';

// Imports DTO.
import { CreateListDto } from '../dto/createList.dto';
import { EditListDto } from '../dto/editList.dto';
import { PaginationListDto } from '../dto/paginationList.dto';

// Imports auth guard.
import { JwtGuard } from '../../authentication/jwt.guard';

// Import custom exception.
import { CustomErrorException } from '../../common/customException';
import { errorCodes } from '../../common/errorConstants';

@UseGuards(JwtGuard)
@Controller('api/list')
export class ListController {
    constructor(
        private readonly listService: ListService,
        private readonly authenticationService: AuthenticationService,
    ) { }

    // Create a new to do list.
    @Post('create')
    @HttpCode(201)
    async createList(@Body() createListDto: CreateListDto, @Req() request: Request) {
        try {
            // Get the user id from the request.
            const userId = (request as any).user.id;

            // Create a new to do list.
            const list = await this.listService.createList(userId, createListDto);
            return {
                status: 201,
                message: 'To do list created successfully.',
                data: list,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_LIST_CREATE_ERROR, 'Failed to create to do list. Please try again.');
        }
    }

    // Edit a to do list.
    @Put('edit')
    @HttpCode(200)
    async editList(@Query() id: number, @Body() editListDto: EditListDto, @Req() request: Request) {
        try {
            // Get the user id from the request.
            const userId = (request as any).user.id;

            // Get the to do list by id.
            const list = await this.listService.getListById(id);
            if (!list) throw new CustomErrorException(404, errorCodes.LIST_NOT_FOUND, 'To do list not found, please try again.');

            // Check if the user is the owner of the to do list.
            if (list.userId !== userId) throw new CustomErrorException(403, errorCodes.NOT_OWNER_OF_LIST, 'You are not the owner of this to do list, please try again.');

            // Edit the to do list.
            const editedList = await this.listService.editList(id, editListDto);
            return {
                status: 200,
                message: 'To do list edited successfully.',
                data: editedList,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_LIST_EDIT_ERROR, 'Failed to edit to do list. Please try again.');
        }
    }

    // Get a pagenation of to do list of a user.
    @Get('pagination')
    @HttpCode(200)
    async getPaginationList(@Query() paginationListDto: PaginationListDto, @Req() request: Request) {
        try {
            // Get the user id from the request.
            const userId = (request as any).user.id;

            // Get a pagenation of to do list of a user.
            const result = await this.listService.getPaginationList(userId, paginationListDto);
            return {
                status: 200,
                message: 'To do list fetched successfully.',
                ...result,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_LIST_PAGINATION_ERROR, 'Failed to fetch to do list. Please try again.');
        }
    }

    // Get a to do list by id.
    @Get('id')
    @HttpCode(200)
    async getListById(@Query() id: number, @Req() request: Request) {
        try {
            // Get the user id from the request.
            const userId = (request as any).user.id;

            // Get a to do list by id.
            const list = await this.listService.getListById(id);
            if (!list) throw new CustomErrorException(404, errorCodes.LIST_NOT_FOUND, 'To do list not found, please try again.');

            // If the user is not the owner of the to do list, throw an error.
            if (list.userId !== userId) throw new CustomErrorException(403, errorCodes.NOT_OWNER_OF_LIST, 'You are not the owner of this to do list.');

            return {
                status: 200,
                message: 'To do list fetched successfully.',
                data: list,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_LIST_GET_BY_ID_ERROR, 'Failed to fetch to do list. Please try again.');
        }
    }

    // Delete a to do list by id.
    @Delete('id')
    @HttpCode(200)
    async deleteListById(@Query() id: number, @Req() request: Request) {
        try {
            // Get the user id from the request.
            const userId = (request as any).user.id;

            // Get a to do list by id.
            const list = await this.listService.getListById(id);
            if (!list) throw new CustomErrorException(404, errorCodes.LIST_NOT_FOUND, 'To do list not found, please try again.');

            // If the user is not the owner of the to do list, throw an error.
            if (list.userId !== userId) throw new CustomErrorException(403, errorCodes.NOT_OWNER_OF_LIST, 'You are not the owner of this to do list.');

            // Delete the to do list.
            const deletedList = await this.listService.deleteListById(id);
            return {
                status: 200,
                message: 'To do list deleted successfully.',
                data: deletedList,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_LIST_DELETE_BY_ID_ERROR, 'Failed to delete to do list. Please try again.');
        }
    }

}