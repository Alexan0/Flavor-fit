import { path } from 'app-root-path';
import * as iconv from 'iconv-lite';
import { v4 as uuidv4 } from 'uuid';
import { ensureDir, writeFile } from 'fs-extra';
import type { IUploadResponse } from './upload-response.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaUploadService {
  async saveAvatar(file: Express.Multer.File): Promise<IUploadResponse> {
    const folder = 'avatars';
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);

    const original = iconv.decode(
      Buffer.from(file.originalname, 'binary'),
      'utf8',
    );

    const safeName = original.replace(/[^\w.-]+/g, '-').toLocaleLowerCase();
    const name = `${uuidv4().slice(0, 5)}-${safeName}`;

    await writeFile(`${uploadFolder}/${name}`, file.buffer);

    const url = `/uploads/${folder}/${name}`;

    return { url, name };
  }
}
