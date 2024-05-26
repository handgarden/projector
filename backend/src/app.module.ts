import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/Api.module';
import { GqlModule } from './graphql/Gql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<string>('DB_TYPE', 'mysql') as 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: parseInt(configService.get<string>('DB_PORT', '3306')),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', 'password'),
          database: configService.get<string>('DB_NAME', 'test'),
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    ApiModule,
    GqlModule,
  ],
})
export class AppModule {}
