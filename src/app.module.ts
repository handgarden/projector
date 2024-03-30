import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/domain/User.entity';

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
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
