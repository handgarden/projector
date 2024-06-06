import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/Local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { PasswordEncoder } from 'src/common/password/PasswordEncoder';
import { OAuthModule } from './oauth/OAuth.module';
import { UserModule } from '../../user/User.module';

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
    UserModule,
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [OAuthModule, PasswordEncoder, JwtService],
})
export class AuthLibraryModule {}
