import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Public } from 'auth/decorators/public.decorator';
import { Roles } from 'auth/decorators/roles.decorator';
import { Prisma, Role } from '@prisma/client';
import { GetUser } from 'auth/decorators/get-user.decorator';
import { JwtUser } from 'auth/interfaces/user-request.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly album: AlbumService) {}

  @Roles(Role.ADMIN, Role.ARTIST)
  @Post()
  create(@GetUser() user: JwtUser, @Body() payload: CreateAlbumDto) {
    if (user.role === Role.ARTIST) payload.artistId = user.id;

    return this.album.create(payload);
  }

  @Public()
  @Get()
  findAll(@Body() filter: Prisma.AlbumFindManyArgs) {
    return this.album.findAll(filter);
  }

  @Public()
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.album.findOne({ where: { id } });
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Patch(':id')
  async update(
    @GetUser() user: JwtUser,
    @Param('id') id: string,
    @Body() payload: UpdateAlbumDto,
  ) {
    if (user.role === Role.ARTIST) {
      const findAlbum = await this.album.findOne({ where: { id } });

      if (!findAlbum)
        throw new NotFoundException('no existe el album con id ' + id);

      if (findAlbum?.artistId !== user.id)
        throw new ForbiddenException('este album no le pertenece al artista');
    }

    return this.album.update(id, payload);
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Delete(':id')
  async remove(@GetUser() user: JwtUser, @Param('id') id: string) {
    if (user.role === Role.ARTIST) {
      const findAlbum = await this.album.findOne({ where: { id } });

      if (!findAlbum)
        throw new NotFoundException('no existe el album con id ' + id);

      if (findAlbum?.artistId !== user.id)
        throw new ForbiddenException('este album no le pertenece al artista');
    }

    return this.album.remove(id);
  }
}
