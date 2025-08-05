import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El título no debe superar los 100 caracteres' })
  title: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La duración debe ser un número' })
  @IsNotEmpty({ message: 'La duración es obligatoria' })
  duration: number;

  @IsUUID('4', { message: 'albumId debe ser un UUID válido (v4)' })
  @IsNotEmpty({ message: 'albumId es obligatorio' })
  albumId: string;

  @IsUUID('4', { message: 'artistId debe ser un UUID válido (v4)' })
  @IsNotEmpty({ message: 'artistId es obligatorio' })
  artistId: string;
}
