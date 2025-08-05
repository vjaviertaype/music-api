import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from 'common/common.module';
import { UserModule } from './user/user.module';
import { HttpLoggerMiddleware } from 'common/middlewares/http-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [PrismaModule, CommonModule, UserModule, AuthModule, AlbumModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
