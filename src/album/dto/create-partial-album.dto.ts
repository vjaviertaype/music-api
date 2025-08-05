import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';

export class CreatePartialAlbumDto extends PartialType(CreateAlbumDto) {}
