import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'prisma/prisma.service';
import {
  buildAlbumFindManyArgs,
  buildAlbumFindUniqueArgs,
} from './albums.utils';
import { FindAllAlbumDto } from './dto/find-all-album.dto';
import { FindOneAlbumDto } from './dto/find-one-albums.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAlbumDto) {
    return await this.prisma.album.create({ data });
  }

  async findAll(filter: FindAllAlbumDto) {
    return await this.prisma.album.findMany(buildAlbumFindManyArgs(filter));
  }

  async findOne(filter: FindOneAlbumDto) {
    return await this.prisma.album.findUnique(buildAlbumFindUniqueArgs(filter));
  }

  async update(id: string, data: UpdateAlbumDto) {
    return await this.prisma.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }

  async canModifyAlbum(userId: string, albumId: string): Promise<boolean> {
    const album = await this.findOne({ uniqueFilter: { id: albumId } });
    if (!album) return false;

    return album.artistId === userId;
  }
}
