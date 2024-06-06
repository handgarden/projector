import { Module } from '@nestjs/common';
import { AuthController } from './adapter/in/Auth.controller';
import { OAuthUserProfileMutateUseCase } from './application/port/in/OAuthUserProfileMutateUseCase';
import { OAuthUserProfileService } from './application/service/OAuthUserProfile.service';
import { OAuthUserProfilePersistencePort } from './application/port/out/OAuthUserProfilePersistencePort';
import { OAuthUserProfileTypeORMRepository } from './adapter/out/OAuthProfileTypeORMRepository';
import { AuthLibraryModule } from '../lib/auth/AuthLibrary.module';
import { OAuthProviderPort } from './application/port/out/OAuthProviderPort';
import { OAuthProviderFacade } from './adapter/out/OAuthProviderFacade';
import { UserModule } from '../user/User.module';

@Module({
  imports: [AuthLibraryModule, UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: OAuthUserProfileMutateUseCase,
      useClass: OAuthUserProfileService,
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
