import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAlbumDto) {
    return await this.prisma.album.create({ data });
  }

  async findAll(filter: Prisma.AlbumFindManyArgs) {
    return await this.prisma.album.findMany(filter);
  }

  async findOne(filter: Prisma.AlbumFindUniqueArgs) {
    return await this.prisma.album.findUnique(filter);
  }

  async update(id: string, data: UpdateAlbumDto) {
    return await this.prisma.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }
}
