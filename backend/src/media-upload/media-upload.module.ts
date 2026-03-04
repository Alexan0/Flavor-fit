import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { Module } from '@nestjs/common';
import { MediaUploadService } from './media-upload.service';
import { MediaUploadController } from './media-upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  providers: [MediaUploadService],
  controllers: [MediaUploadController],
})
export class MediaUploadModule {}
