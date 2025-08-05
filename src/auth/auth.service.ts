import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';
import { Role } from '@prisma/client';
import { compare, hash } from './utils/encrypt.util';
import { JwtUser } from './interfaces/user-request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(data: LoginDto): Promise<AccessTokenResponseDto> {
    const { email, password } = data;

    const user = await this.user.findOne({
      where: { email },
      omit: { password: true },
    });

    if (!user?.password)
      throw new BadRequestException('el campo "password" esta vacio');

    const isMatch = compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('"password" incorrecta');
    }

    return await this.generateToken(user);
  }

  async signUp(data: RegisterDto): Promise<AccessTokenResponseDto> {
    const { email, password, role } = data;

    if (role === Role.ADMIN)
      throw new UnauthorizedException(
        'No esta autorizado crear usuarios administradores desde este enlace',
      );

    const existingUser = await this.user.findOne({
      where: { email },
      omit: { password: true },
    });

    if (existingUser) throw new BadRequestException('el email ya está en uso');

    const hashedPassword = await hash(password);

    const newUser = await this.user.create({
      ...data,
      password: hashedPassword,
    });

    return await this.generateToken(newUser);
  }

  private async generateToken(data: JwtUser): Promise<AccessTokenResponseDto> {
    const { id, email, role } = data;

    return {
      access_token: await this.jwt.signAsync({
        id,
        email,
        role,
      }),
    };
  }
}
