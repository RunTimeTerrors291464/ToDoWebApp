import { Controller, Post, Body, Res, HttpCode, UseGuards, Get, Req } from '@nestjs/common';
import type { Response } from 'express';

// Imports authentication service.
import { AuthenticationService } from '../services/authentication.service';

// Imports DTO.
import { AuthenticationDto } from '../dto/authentication.dto';

// Imports custom exception.
import { CustomErrorException } from '../../common/customException';
import { errorCodes } from '../../common/errorConstants';

// Imports JWT guard.
import { JwtGuard } from '../jwt.guard';

@Controller('api/auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    // Register a new user.
    @Post('register')
    @HttpCode(201)
    async register(@Body() authenticationDto: AuthenticationDto) {
        try {
            const result = await this.authenticationService.register(authenticationDto);
            return {
                status: 201,
                message: 'User registered successfully.',
                data: result,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_AUTH_REGISTER_ERROR, error.message);
        }
    }

    // Login a user.
    @Post('login')
    @HttpCode(200)
    async login(@Body() authenticationDto: AuthenticationDto, @Res({ passthrough: true }) response: Response) {
        try {
            const result = await this.authenticationService.login(authenticationDto);

            // Set the JWT token as a cookie.
            response.cookie('accessToken', result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
            });

            return {
                status: 200,
                message: 'User logged in successfully.',
                data: result.user,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_AUTH_LOGIN_ERROR, 'Failed to login, please try again.');
        }
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async getUserInfo(@Req() request: Request) {
        try {
            const userId = (request as any).user.id;
            const user = await this.authenticationService.getUserById(userId);
            return {
                status: 200,
                message: 'User information fetched successfully.',
                data: user,
            }
        } catch (error) {
            throw new CustomErrorException(400, errorCodes.API_AUTH_LOGIN_ERROR, 'Failed to fetch user information, please try again.');
        }
    }
}