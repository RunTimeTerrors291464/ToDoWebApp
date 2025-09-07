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

    // Add Swagger.
    const config = new DocumentBuilder()
        .setTitle('Todo List API')
        .setDescription('The Todo List API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Add cors.
    app.enableCors();

    // Listen to the IP and port.
    const port = process.env.PORT ?? 3000;
    const ip = process.env.HOST_IP ?? '0.0.0.0';
    
    await app.listen(port, ip);

    console.log(`Server is running on port ${port} and IP ${ip}`);
}
bootstrap();
