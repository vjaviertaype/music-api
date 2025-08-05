import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsUUID('4', { message: 'albumId debe ser un UUID válido (v4)' })
  @IsNotEmpty({ message: 'albumId es obligatorio' })
  albumId: string;
}
