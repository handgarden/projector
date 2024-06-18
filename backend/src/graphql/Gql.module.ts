import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
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
  ],
})
export class GqlModule {}
