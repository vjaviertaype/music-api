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
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma, Role } from '@prisma/client';
import { Roles } from 'auth/decorators/roles.decorator';
import { GetUser } from 'auth/decorators/get-user.decorator';
import { JwtUser } from 'auth/interfaces/user-request.interface';
import { AlbumService } from 'album/album.service';
import { Public } from 'auth/decorators/public.decorator';

@Controller('song')
export class SongController {
  constructor(
    private readonly song: SongService,
    private readonly album: AlbumService,
  ) {}

  @Roles(Role.ADMIN, Role.ARTIST)
  @Post()
  create(@GetUser() user: JwtUser, @Body() payload: CreateSongDto) {
    if (user.role === Role.ARTIST) payload.artistId = user.id;

    return this.song.create(payload);
  }

  @Public()
  @Get()
  findAll(filter: Prisma.SongFindManyArgs) {
    return this.song.findAll(filter);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.song.findOne({ where: { id } });
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Patch(':id')
  async update(
    @GetUser() user: JwtUser,
    @Param('id') id: string,
    @Body() payload: UpdateSongDto,
  ) {
    if (user.role === Role.ARTIST) {
      const findAlbum = await this.album.findOne({
        where: { id: payload.albumId },
      });
      const findSong = await this.song.findOne({ where: { id } });

      if (!findSong)
        throw new NotFoundException('no existe la cancion con id ' + id);
      if (!findAlbum)
        throw new NotFoundException('no existe el album con id ' + id);

      if (findAlbum?.id !== findSong?.albumId)
        throw new ForbiddenException('este sonido no le pertenece al album');
      if (findAlbum?.artistId !== user.id)
        throw new ForbiddenException('este album no le pertenece al artista');
    }

    return this.song.update(id, payload);
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Delete(':id')
  async remove(@GetUser() user: JwtUser, @Param('id') id: string) {
    if (user.role === Role.ARTIST) {
      const findSong = await this.song.findOne({ where: { id } });

      if (!findSong)
        throw new NotFoundException('no existe la cancion con id ' + id);
      if (findSong?.id !== user.id)
        throw new ForbiddenException('este sonido no le pertenece al artista');
    }

    return this.song.remove(id);
  }
}
