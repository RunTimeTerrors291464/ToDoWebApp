import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errorCodes } from './errorConstants';
import { CustomErrorException } from './customException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status: number;
        let errorResponse: any;

        if (exception instanceof CustomErrorException) {
            
            status = exception.getStatus();
            errorResponse = exception.getResponse();

        } else if (exception instanceof HttpException) {

            status = exception.getStatus();
            const exceptionResponse = exception.getResponse() as any;

            if (status === HttpStatus.BAD_REQUEST && exceptionResponse.message) {

                errorResponse = {
                    status: 400,
                    errorCode: errorCodes.VALIDATION_ERROR,
                    message: 'DTO can not validate your data',
                    errorDetails: Array.isArray(exceptionResponse.message)
                        ? exceptionResponse.message
                        : [exceptionResponse.message],
                };
            } else {
                errorResponse = {
                    status: status,
                    errorCode: errorCodes.INTERNAL_SERVER_ERROR,
                    message: exceptionResponse.message || 'Something is wrong, please try again later',
                };
            }
        } else {
            // Handle unexpected errors
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorResponse = {
                status: 500,
                errorCode: errorCodes.INTERNAL_SERVER_ERROR,
                message: 'Something is wrong, please try again later',
            };
        }

        response.status(status).json(errorResponse);
    }
}