import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './Health.controller';
import { GqlModule } from './graphql/Gql.module';
import { UserModule } from './user/User.module';
import { ProjectModule } from './project/Project.module';
import { UploadFileModule } from './file/UploadFile.module';
import { AuthModule } from './auth/Auth.module';

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
          database: configService.get<string>('DB_NAME', 'projector'),
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    GqlModule,
    UserModule,
    ProjectModule,
    UploadFileModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
