import { IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class RelationsAlbumDto {
  @IsOptional()
  @IsBoolean({ message: 'El campo "artist" debe ser true o false (booleano).' })
  @Type(() => Boolean)
  artist?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo "songs" debe ser true o false (booleano).' })
  @Type(() => Boolean)
  songs?: boolean;
}
