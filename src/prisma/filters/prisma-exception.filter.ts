import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomLoggerService } from 'common/custom-logger.service';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(private logger: CustomLoggerService) {}
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Ya existe un registro con ese valor único (${exception.meta?.target})`;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'No se encontró el registro solicitado';
        break;
      default:
        message = exception.message;
        break;
    }

    this.logger.error(
      `Error Prisma (${exception.code}) en ${request.method} ${request.url}`,
      JSON.stringify({
        exception: exception.message,
        target: exception.meta?.target,
        path: request.url,
      }),
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
