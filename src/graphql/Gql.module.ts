import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserGqlModule } from './user/UserGql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    UserGqlModule,
  ],
})
export class GqlModule {}
