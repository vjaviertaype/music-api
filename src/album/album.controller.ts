import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindAllAlbumDto } from './dto/find-all-album.dto';
import { Public } from 'auth/decorators/public.decorator';
import { Roles } from 'auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'auth/decorators/get-user.decorator';
import { JwtUser } from 'auth/interfaces/user-request.interface';
import { CreatePartialAlbumDto } from './dto/create-partial-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly album: AlbumService) {}

  @Roles(Role.ADMIN, Role.ARTIST)
  @Post()
  create(@GetUser() user: JwtUser, @Body() payload: CreatePartialAlbumDto) {
    if (user.role === Role.ARTIST) payload.artistId = user.id;

    return this.album.create(payload as CreateAlbumDto);
  }

  @Public()
  @Get()
  findAll(@Body() filter: FindAllAlbumDto) {
    return this.album.findAll(filter);
  }

  @Public()
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.album.findOne({ uniqueFilter: { id } });
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Patch(':id')
  async update(
    @GetUser() user: JwtUser,
    @Param('id') id: string,
    @Body() payload: UpdateAlbumDto,
  ) {
    if (user.role === Role.ARTIST) {
      const findAlbum = await this.album.findOne({
        uniqueFilter: { id },
        fields: { artistId: true },
      });

      if (findAlbum?.artistId !== user.id)
        throw new ForbiddenException(
          `este album no le pertenece a este usuario`,
        );
    }

    return this.album.update(id, payload);
  }

  @Roles(Role.ADMIN, Role.ARTIST)
  @Delete(':id')
  async remove(@GetUser() user: JwtUser, @Param('id') id: string) {
    if (user.role === Role.ARTIST) {
      const findAlbum = await this.album.findOne({
        uniqueFilter: { id },
        fields: { artistId: true },
      });

      if (findAlbum?.artistId !== user.id)
        throw new ForbiddenException(
          `este album no le pertenece a este usuario`,
        );
    }

    return this.album.remove(id);
  }
}
