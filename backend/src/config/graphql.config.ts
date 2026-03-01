import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { DEVELOPMENT } from '@constants/environment';
import { IGqlContext } from 'src/app.interface';

export const getGraphQLconfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: configService.get<string>('MODE') === DEVELOPMENT,
  context: ({ req, res }: IGqlContext) => ({ req, res }),
  sortSchema: true,
});
