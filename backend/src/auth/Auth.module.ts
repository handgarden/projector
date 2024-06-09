import { Module } from '@nestjs/common';
import { AuthController } from './adapter/in/Auth.controller';
import { OAuthProfileService } from './application/service/OAuthProfile.service';
import { OAuthProfileTypeORMRepository } from './adapter/out/OAuthProfileTypeORMRepository';
import { AuthLibraryModule } from '../lib/auth/AuthLibrary.module';
import { OAuthProviderPort } from './application/port/out/OAuthProviderPort';
import { OAuthProviderFacade } from './adapter/out/OAuthProviderFacade';
import { UserModule } from '../user/User.module';
import { OAuthProfileMutateUseCase } from './application/port/in/OAuthUserProfileMutateUseCase';
import { OAuthProfilePersistencePort } from './application/port/out/OAuthProfilePersistencePort';

@Module({
  imports: [AuthLibraryModule, UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: OAuthProfileMutateUseCase,
      useClass: OAuthProfileService,
    },
    {
      provide: OAuthProfilePersistencePort,
      useClass: OAuthProfileTypeORMRepository,
    },
    {
      provide: OAuthProviderPort,
      useClass: OAuthProviderFacade,
    },
  ],
})
export class AuthModule {}
