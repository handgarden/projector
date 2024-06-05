import { Injectable } from '@nestjs/common';
import { OAuthUserProfileMutateUseCase } from '../port/in/OAuthUserProfileMutateUseCase';
import { OAuthUserProfilePersistencePort } from '../port/out/OAuthUserProfilePersistencePort';
import { OAuthProviderPort } from '../port/out/OAuthProviderPort';
import { OAuthRequestDto } from '../dto/OAuthRequest.dto';
import { AuthUserPersistencePort } from '../port/out/AuthUserPersistencePort';
import { OAuthAccountNotFoundError } from '../../../lib/auth/error/OAuthAccountNotFoundError';
import { AuthUserDto } from '../dto/AuthUser.dto';
import { OAuthUserProfileDto } from '../dto/OAuthUserProfile.dto';
import { OAuthUserProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';
import { DuplicateOAuthProfileError } from '../../../lib/auth/error/DuplicateOAuthProfileError';

@Injectable()
export class OAuthUserProfileService implements OAuthUserProfileMutateUseCase {
  constructor(
    private readonly oauthProviderPort: OAuthProviderPort,
    private readonly oauthProfilePersistencePort: OAuthUserProfilePersistencePort,
    private readonly authUserPersistencePort: AuthUserPersistencePort,
  ) {}
  async loginWithOAuthProfile(dto: OAuthRequestDto): Promise<AuthUserDto> {
    const vendorProfile = await this.oauthProviderPort.getOAuthProfile(
      dto.code,
      dto.provider,
    );

    const userNil =
      await this.authUserPersistencePort.findOneByOAuthProfileIdAndProvider(
        vendorProfile.id,
        vendorProfile.provider,
      );

    if (userNil.isNil()) {
      throw new OAuthAccountNotFoundError();
    }

    const user = userNil.unwrap();

    return AuthUserDto.fromEntity(user);
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
