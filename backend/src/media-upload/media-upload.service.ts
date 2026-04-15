import { path } from 'app-root-path';
import * as iconv from 'iconv-lite';
import { ensureDir, writeFile } from 'fs-extra';
import type { IUploadResponse } from './upload-response.types';
import { Injectable } from '@nestjs/common';
import type { IUploadedFile } from './media-uploaded-file.types';

@Injectable()
export class MediaUploadService {
  async saveAvatar(file: IUploadedFile): Promise<IUploadResponse> {
    const folder = 'avatars';
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);

    const original = iconv.decode(
      Buffer.from(file.originalname, 'binary'),
      'utf8',
    );

    const safeName = original.replace(/[^\w.-]+/g, '-').toLocaleLowerCase();
    const name = `${crypto.randomUUID().slice(0, 5)}-${safeName}`;

    await writeFile(`${uploadFolder}/${name}`, file.buffer);

    const url = `/uploads/${folder}/${name}`;

    return { url, name };
  }
}
