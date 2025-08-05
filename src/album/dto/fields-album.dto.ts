import { IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class FieldsAlbumDto {
  @IsOptional()
  @IsBoolean({ message: 'El campo "id" debe ser true o false (booleano).' })
  @Type(() => Boolean)
  id?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo "title" debe ser true o false (booleano).' })
  @Type(() => Boolean)
  title?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "artistId" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  artistId?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "isSingle" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  isSingle?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "createdAt" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  createdAt?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "updatedAt" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  updatedAt?: boolean;
}
