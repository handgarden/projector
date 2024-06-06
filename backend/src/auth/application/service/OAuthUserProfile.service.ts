import { Injectable } from '@nestjs/common';
import { OAuthUserProfileMutateUseCase } from '../port/in/OAuthUserProfileMutateUseCase';
import { OAuthUserProfilePersistencePort } from '../port/out/OAuthUserProfilePersistencePort';
import { OAuthProviderPort } from '../port/out/OAuthProviderPort';
import { OAuthRequestDto } from '../dto/OAuthRequest.dto';
import { OAuthAccountNotFoundError } from '../../../lib/auth/error/OAuthAccountNotFoundError';
import { OAuthUserProfileDto } from '../dto/OAuthUserProfile.dto';
import { OAuthUserProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProvider } from '../../domain/OAuthProvider';
import { DuplicateOAuthProfileError } from '../../../lib/auth/error/DuplicateOAuthProfileError';
import { UserQueryUseCase } from '../../../user/application/port/in/UserQueryUseCase';
import { UserDto } from '../../../user/application/dto/User.dto';

@Injectable()
export class OAuthUserProfileService implements OAuthUserProfileMutateUseCase {
  constructor(
    private readonly oauthProviderPort: OAuthProviderPort,
    private readonly oauthProfilePersistencePort: OAuthUserProfilePersistencePort,
    private readonly userQueryUseCase: UserQueryUseCase,
  ) {}
  async loginWithOAuthProfile(dto: OAuthRequestDto): Promise<UserDto> {
    const vendorProfile = await this.oauthProviderPort.getOAuthProfile(
      dto.code,
      dto.provider,
    );

    const oauthProfile =
      await this.oauthProfilePersistencePort.findByProviderAndId(
        vendorProfile.provider,
        vendorProfile.id,
      );
    if (oauthProfile.isNil()) {
      throw new OAuthAccountNotFoundError();
    }

    return this.userQueryUseCase.getUser(oauthProfile.unwrap().userId);
  }

  async linkOAuthProfile(
    userId: number,
    dto: OAuthRequestDto,
  ): Promise<OAuthUserProfileDto> {
    const vendorProfile = await this.oauthProviderPort.getOAuthProfile(
      dto.code,
      dto.provider,
    );

    await this.checkOAuthProfileDuplicate(
      vendorProfile.id,
      vendorProfile.provider,
    );

    const profile = OAuthUserProfile.create({
      userId,
      id: vendorProfile.id,
      provider: vendorProfile.provider,
      name: vendorProfile.name,
      email: vendorProfile.email,
    });

    const saved = await this.oauthProfilePersistencePort.save(profile);

    return OAuthUserProfileDto.fromEntity(saved);
  }

  async unlinkOAuthProfile(
    userId: number,
    provider: OAuthProvider,
  ): Promise<void> {
    const profile =
      await this.oauthProfilePersistencePort.findByProviderAndUserId(
        provider,
        userId,
      );

    if (profile.isNil()) {
      return;
    }

    await this.oauthProfilePersistencePort.removeOne(profile.unwrap());
  }

  private async checkOAuthProfileDuplicate(
    id: string,
    provider: OAuthProvider,
  ) {
    const profileNil =
      await this.oauthProfilePersistencePort.findByProviderAndId(provider, id);
    if (profileNil.isNotNil()) {
      throw new DuplicateOAuthProfileError({ provider });
    }
  }
}
