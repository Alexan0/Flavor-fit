import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { IGqlContext } from 'src/app.interface';

export const getGraphQLconfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: configService.get<string>('MODE') === 'development',
  context: ({ req, res }: IGqlContext) => ({ req, res }),
  sortSchema: true,
});
