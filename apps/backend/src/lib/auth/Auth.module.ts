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
import { OAuthModule } from './oauth/OAuth.module';
import { OAuthProfileRepository } from '../../core/entity/repository/OAuthProfile.repository';

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
    OAuthModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
    OAuthProfileRepository,
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
  ],
  exports: [AuthService, OAuthModule],
})
export class AuthModule {}
