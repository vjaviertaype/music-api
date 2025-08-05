import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compare, hash } from 'auth/utils/encrypt.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findAll(
    filter: Prisma.UserFindManyArgs,
  ): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany(filter);
  }

  async findOne(filter: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return await this.prisma.user.findUnique(filter);
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      omit: { password: true },
      where: { id },
      data,
    });
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { currentPassword, newPassword } = data;

    const user = await this.findOne({ where: { id } });

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

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
