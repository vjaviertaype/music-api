import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from 'common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const logger = new AppLogger();
  app.useLogger(logger);

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

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
