import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/Local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { BcryptPasswordEncoder } from 'src/common/password/BcryptPasswordEncorder';
import { PasswordEncoder } from 'src/common/password/PasswordEncoder';
import { OAuthModule } from './oauth/OAuth.module';

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
    LocalStrategy,
    JwtStrategy,
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
  ],
  exports: [OAuthModule, PasswordEncoder, JwtService],
})
export class AuthLibraryModule {}
