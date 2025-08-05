import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsUUID('4', { message: 'artistId debe ser un UUID válido (v4)' })
  @IsNotEmpty({ message: 'artistId es obligatorio' })
  artistId: string;
}
