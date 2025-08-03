import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import {
  buildUserFindManyArgs,
  buildUserFindUniqueArgs,
  buildUserSelect,
} from './user.utils';
import { findOneUserDto } from './dto/find-one-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compare, hash } from 'auth/utils/encrypt.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findAll(filter: FindAllUsersDto): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany(buildUserFindManyArgs(filter));
  }

  async findOne(filter: findOneUserDto): Promise<User | null> {
    return await this.prisma.user.findUnique(buildUserFindUniqueArgs(filter));
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      select: buildUserSelect(),
      where: { id },
      data,
    });
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { currentPassword, newPassword } = data;

    const user = await this.findOne({ uniqueFilter: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = compare(user.password, currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const hashedPassword = await hash(newPassword);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
