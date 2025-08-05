import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { RelationsAlbumDto } from './relations-album.dto';
import { FieldsAlbumDto } from './fields-album.dto';

class UniqueAlbumFilterDto {
  @IsUUID('4', {
    message: 'El campo "id" debe tener un formato válido de UUID v4.',
  })
  id: string;
}

export class FindOneAlbumDto {
  @ValidateNested()
  @Type(() => UniqueAlbumFilterDto)
  uniqueFilter: UniqueAlbumFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationsAlbumDto)
  relations?: RelationsAlbumDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FieldsAlbumDto)
  fields?: FieldsAlbumDto;
}
