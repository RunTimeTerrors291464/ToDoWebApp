import { IsString, IsNotEmpty, MinLength } from 'class-validator';

// Imports Swagger.
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {

    @ApiProperty({
        description: 'The username of the user.',
        example: 'john_doe',
        required: true,
        minLength: 1
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user.',
        example: 'secure123',
        required: true,
        minLength: 8,
        maxLength: 32,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;
}