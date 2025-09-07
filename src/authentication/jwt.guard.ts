import { Injectable, ExecutionContext } from '@nestjs/common';

// Imports AuthGuard.
import { AuthGuard } from '@nestjs/passport';

// Imports custom exception.
import { CustomErrorException } from '../common/customException';
import { errorCodes } from '../common/errorConstants';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new CustomErrorException(401, errorCodes.API_AUTH_UNAUTHORIZED, 'Unauthorized. Please login to continue.');
        }
        return user;
    }
}