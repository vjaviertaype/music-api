import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSongDto) {
    return await this.prisma.song.create({ data });
  }

  async findAll(filter: Prisma.SongFindManyArgs) {
    return await this.prisma.song.findMany(filter);
  }

  async findOne(filter: Prisma.SongFindUniqueArgs) {
    return await this.prisma.song.findUnique(filter);
  }

  async update(id: string, data: UpdateSongDto) {
    return await this.prisma.song.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.song.delete({ where: { id } });
  }
}
