import { Module } from '@nestjs/common';
import { GithubOAuthService } from './github/Github.service';

@Module({
  imports: [],
  providers: [GithubOAuthService],
  exports: [GithubOAuthService],
})
export class OAuthModule {}
