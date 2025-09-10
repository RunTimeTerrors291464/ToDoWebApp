import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/globalExceptionFilter';
import cookieParser from 'cookie-parser';

// Add Swagger.
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Add cookie parser.
    app.use(cookieParser());

    // Add global exception filter.
    app.useGlobalFilters(new GlobalExceptionFilter());

    // Add validation pipe.
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));

    // Add cors.
    app.enableCors({
        origin: '*'
    });

    // Listen to the IP and port.
    const port = process.env.PORT ?? 3000;
    const bindIP = process.env.BIND_IP ?? '0.0.0.0';
    const hostIP = process.env.HOST_IP ?? '0.0.0.0';

    await app.listen(port, bindIP);

    console.log(`Server is running on port ${port}`);
    console.log(`Bind IP (container): ${bindIP}`);
    console.log(`External access: http://${hostIP}:${port}`);
}
bootstrap();
