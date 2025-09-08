import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Imports user entity.
import { UserEntity } from '../entities/user.entity';

// Imports JWT service.
import { JwtService } from '@nestjs/jwt';

// Import bcrypt.
import * as bcrypt from 'bcrypt';

// Import DTO.
import { AuthenticationDto } from '../dto/authentication.dto';

// Import custom exception.
import { CustomErrorException } from '../../common/customException';
import { errorCodes } from '../../common/errorConstants';

@Injectable()
export class AuthenticationService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    // Register a new user.
    async register(authenticationDto: AuthenticationDto) {
        const { username, password } = authenticationDto;

        // Check if the username is already taken.
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) throw new CustomErrorException(400, errorCodes.USER_ALREADY_EXISTS, 'Username already taken.');

        // Hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user.
        const newUser = this.userRepository.create({ username, password: hashedPassword });
        const savedUser = await this.userRepository.save(newUser);

        return {
            user: {
                id: savedUser.id,
                username: savedUser.username,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            }
        }
    }

    // Login a user.
    async login(authenticationDto: AuthenticationDto) {
        const { username, password } = authenticationDto;

        // Find the user by username.
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) throw new CustomErrorException(401, errorCodes.USER_NOT_FOUND, 'User not found, please try again.');

        // Verify the password.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new CustomErrorException(401, errorCodes.INVALID_PASSWORD, 'Password is incorrect, please try again.');

        // JWT token payload.
        const payload = {
            id: user.id,
            username: user.username,
        }

        // Generate JWT token,
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken: accessToken,
            user: {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        }
    }
    
    // Validate the user by JWT token.
    async validateUser(userId: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as UserEntity;
        }
        return null;
    }

    async getUserById(userId: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) return user;
        else return null;
    }
}