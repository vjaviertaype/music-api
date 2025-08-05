import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthenticatedRequest } from 'auth/interfaces/authenticate-request.interface';
import { JwtUser } from 'auth/interfaces/user-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwt.verifyAsync<JwtUser>(token, {
        secret: process.env.JWT_SECRET ?? 'supersecret',
      });

      if (!payload?.id || !payload?.role || !payload?.email) {
        throw new UnauthorizedException('Token inválido');
      }

      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException('Token expirado');
      }

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
