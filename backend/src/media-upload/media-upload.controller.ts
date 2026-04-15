import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaUploadService } from './media-upload.service';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IUploadedFile } from './media-uploaded-file.types';

@Controller('media-upload')
export class MediaUploadController {
  constructor(private readonly mediaService: MediaUploadService) {}

  @HttpCode(200)
  @Post('avatar')
  @Auth()
  @UseInterceptors(
    FileInterceptor('file', { limits: { fieldSize: 5 * 1024 * 1024 } }),
  )
  async uploadAvatar(@UploadedFile() file: IUploadedFile) {
    return await this.mediaService.saveAvatar(file);
  }
}
