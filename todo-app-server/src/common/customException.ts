import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomErrorException extends HttpException {
    constructor(
        statusCode: number,
        errorCode: number,
        message?: string,
        errorDetails?: string[]
    ) {
        // If the message is not provided, use the default message for the error code.
        const defaultMessage = 'Something went wrong, please try again later.';
        if (!message) {
            message = defaultMessage;
        }

        const errorResponse = {
            status: statusCode,
            errorCode: errorCode,
            message: message,
            ...(errorDetails && { errorMessage: errorDetails }),
        };

        super(errorResponse, statusCode);
    }
}