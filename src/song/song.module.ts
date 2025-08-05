import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { AlbumModule } from 'album/album.module';

@Module({
  imports: [AlbumModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
