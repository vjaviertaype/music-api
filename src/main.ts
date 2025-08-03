import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from 'common/custom-logger.service';
import { AllExceptionsFilter } from 'common/filters/all-exceptions.filter';
import { PrismaExceptionFilter } from 'prisma/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);

  app.useGlobalFilters(
    new AllExceptionsFilter(logger),
    new PrismaExceptionFilter(logger),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
