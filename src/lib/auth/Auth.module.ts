import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/Local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { UserRepository } from 'src/core/entity/repository/User.repository';
import { BcryptPasswordEncoder } from 'src/common/password/BcryptPasswordEncorder';
import { PasswordEncoder } from 'src/common/password/PasswordEncoder';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
