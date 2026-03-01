import { ConfigService } from '@nestjs/config';
import { DEVELOPMENT } from '@constants/environment';

export const isDev = (configService: ConfigService): boolean => {
  return configService.get('MODE') === DEVELOPMENT;
};
