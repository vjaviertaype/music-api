import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from 'common/common.module';
import { UserModule } from './user/user.module';
import { HttpLoggerMiddleware } from 'common/middlewares/http-logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [PrismaModule],
  imports: [PrismaModule, CommonModule, UserModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
