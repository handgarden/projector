import { Module } from '@nestjs/common';
import { AuthController } from './adapter/in/Auth.controller';
import { AuthService } from './application/service/Auth.service';
import { AuthMutateUseCase } from './application/port/in/AuthMutateUseCase';
import { OAuthUserProfileMutateUseCase } from './application/port/in/OAuthUserProfileMutateUseCase';
import { OAuthUserProfileService } from './application/service/OAuthUserProfile.service';
import { AuthUserPersistencePort } from './application/port/out/AuthUserPersistencePort';
import { AuthUserTypeOrmRepository } from './adapter/out/AuthUserTypeORMRepository';
import { OAuthUserProfilePersistencePort } from './application/port/out/OAuthUserProfilePersistencePort';
import { OAuthUserProfileTypeORMRepository } from './adapter/out/OAuthProfileTypeORMRepository';
import { AuthLibraryModule } from '../lib/auth/AuthLibrary.module';
import { OAuthProviderPort } from './application/port/out/OAuthProviderPort';
import { OAuthProviderFacade } from './adapter/out/OAuthProviderFacade';

@Module({
  imports: [AuthLibraryModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthMutateUseCase,
      useClass: AuthService,
    },
    {
      provide: OAuthUserProfileMutateUseCase,
      useClass: OAuthUserProfileService,
    },
    {
      provide: AuthUserPersistencePort,
      useClass: AuthUserTypeOrmRepository,
    },
    {
      provide: OAuthUserProfilePersistencePort,
      useClass: OAuthUserProfileTypeORMRepository,
    },
    {
      provide: OAuthProviderPort,
      useClass: OAuthProviderFacade,
    },
  ],
})
export class AuthModule {}
