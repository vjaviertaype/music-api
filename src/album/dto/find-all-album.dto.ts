import { Type } from 'class-transformer';
import {
  IsOptional,
  IsUUID,
  IsString,
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { RelationsAlbumDto } from './relations-album.dto';
import { FieldsAlbumDto } from './fields-album.dto';

export class FindAllAlbumDto {
  @IsOptional()
  @IsUUID('4', {
    message: 'El campo "id" debe tener un formato válido de UUID v4.',
  })
  id?: string;

  @IsOptional()
  @IsUUID('4', {
    message: 'El campo "artistId" debe tener un formato válido de UUID v4.',
  })
  artistId?: string;

  @IsOptional()
  @IsString({ message: 'El campo "title" debe ser una cadena de texto.' })
  title?: string;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "isSingle" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  isSingle?: boolean;

  @IsOptional()
  @IsDate({
    message:
      'El campo "createdAfter" debe ser una fecha válida (ej: 2023-01-01).',
  })
  @Type(() => Date)
  createdAfter?: Date;

  @IsOptional()
  @IsDate({
    message:
      'El campo "createdBefore" debe ser una fecha válida (ej: 2023-12-31).',
  })
  @Type(() => Date)
  createdBefore?: Date;

  @IsInt({
    message: 'El campo "skip" debe ser un número entero mayor o igual a 0.',
  })
  @Min(0, { message: 'El valor mínimo de "skip" es 0.' })
  @Type(() => Number)
  skip: number = 0;

  @IsInt({
    message: 'El campo "take" debe ser un número entero mayor o igual a 1.',
  })
  @Min(1, { message: 'El valor mínimo de "take" es 1.' })
  @Type(() => Number)
  take: number = 10;

  @IsIn(['createdAt', 'updatedAt', 'title'], {
    message:
      'El campo "orderBy" solo puede ser "createdAt", "updatedAt" o "title".',
  })
  orderBy: 'createdAt' | 'updatedAt' | 'title' = 'createdAt';

  @IsIn(['asc', 'desc'], {
    message:
      'El campo "orderDirection" solo puede ser "asc" (ascendente) o "desc" (descendente).',
  })
  orderDirection: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationsAlbumDto)
  relations?: RelationsAlbumDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FieldsAlbumDto)
  fields?: FieldsAlbumDto;
}
