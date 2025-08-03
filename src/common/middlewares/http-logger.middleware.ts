import { Injectable, NestMiddleware } from '@nestjs/common';
import chalk from 'chalk';
import { CustomLoggerService } from 'common/custom-logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new CustomLoggerService();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;

      let statusColor = chalk.green;
      if (statusCode >= 500) statusColor = chalk.red;
      else if (statusCode >= 400) statusColor = chalk.yellow;
      const statusMessage = statusColor(`[${statusCode}]`);

      this.logger.log(
        `${method} ${originalUrl} ${statusMessage} - ${duration}ms\n`,
      );
    });

    next();
  }
}
