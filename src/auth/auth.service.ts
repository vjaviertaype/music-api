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
import { User } from '@prisma/client';
import { compare, hash } from './utils/encrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(data: LoginDto): Promise<AccessTokenResponseDto> {
    const { email, password } = data;

    const user = await this.user.findOne({
      uniqueFilter: { email },
      fields: { password: true },
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
    const { email, password } = data;

    const existingUser = await this.user.findOne({
      uniqueFilter: { email },
    });

    if (existingUser) throw new BadRequestException('el email ya está en uso');

    const hashedPassword = await hash(password);

    const newUser = await this.user.create({
      ...data,
      password: hashedPassword,
    });

    return await this.generateToken(newUser);
  }

  private async generateToken(data: User): Promise<AccessTokenResponseDto> {
    const { id, email, role } = data;

    return {
      access_token: await this.jwt.signAsync({
        sub: id,
        email: email,
        role: role,
      }),
    };
  }
}
