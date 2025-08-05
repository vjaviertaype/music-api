import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El título no puede superar los 100 caracteres' })
  title: string;

  @IsUUID('4', { message: 'artistId debe ser un UUID válido (v4)' })
  @IsNotEmpty({ message: 'artistId es obligatorio' })
  artistId: string;

  @IsBoolean({ message: 'isSingle debe ser un valor booleano' })
  isSingle?: boolean = false;
}
