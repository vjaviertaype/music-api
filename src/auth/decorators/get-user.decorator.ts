import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from 'auth/interfaces/authenticate-request.interface';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
