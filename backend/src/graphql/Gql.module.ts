import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserGqlModule } from './user/UserGql.module';
import { UploadFileGqlModule } from './file/UploadFileGql.module';
import { ProjectGqlModule } from './project/ProjectGql.module';
import { LocalDateTimeScalar } from './common/scalar/LocalDateTimeScalar';
import { GqlExceptionFormatter } from './common/GqlExceptionFormatter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      resolvers: {
        LocalDateTime: LocalDateTimeScalar,
      },
      formatError: GqlExceptionFormatter,
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      path: '/graphql',
    }),
    UserGqlModule,
    UploadFileGqlModule,
    ProjectGqlModule,
  ],
})
export class GqlModule {}