import { Module } from '@nestjs/common';
import { GithubOAuthService } from './github/Github.service';
import { OAuthService } from './OAuth.service';
import { ConfigService } from '@nestjs/config';
import { OAuthFacadeService } from './OAuthFacade.service';

@Module({
  imports: [],
  providers: [
    {
      provide: GithubOAuthService,
      useFactory: (configService: ConfigService) =>
        new GithubOAuthService(configService),
      inject: [ConfigService],
    },
    {
      provide: OAuthService,
      useFactory: (github: GithubOAuthService) => [github],
      inject: [GithubOAuthService],
    },
    OAuthFacadeService,
  ],
  exports: [OAuthFacadeService],
})
export class OAuthModule {}
