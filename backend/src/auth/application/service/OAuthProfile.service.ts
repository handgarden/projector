import { Inject, Injectable } from '@nestjs/common';
import { OAuthProfileMutateUseCase } from '../port/in/OAuthProfileMutateUseCase';
import { OAuthProfilePersistencePort } from '../port/out/OAuthProfilePersistencePort';
import { OAuthProviderPort } from '../port/out/OAuthProviderPort';
import { OAuthRequestDto } from '../dto/OAuthRequest.dto';
import { OAuthAccountNotFoundError } from '../../../lib/auth/error/OAuthAccountNotFoundError';
import { OAuthProfileDto } from '../dto/OAuthProfile.dto';
import { OAuthProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProvider } from '../../domain/OAuthProvider';
import { DuplicateOAuthProfileError } from '../../../lib/auth/error/DuplicateOAuthProfileError';
import { UserQueryUseCase } from '../../../user/application/port/in/UserQueryUseCase';
import { UserDto } from '../../../user/application/dto/User.dto';
import { OAuthProfileQueryUseCase } from '../port/in/OAuthProfileQueryUseCase';

@Injectable()
export class OAuthProfileService
  implements OAuthProfileMutateUseCase, OAuthProfileQueryUseCase
{
  constructor(
    @Inject(OAuthProviderPort)
    private readonly oauthProviderPort: OAuthProviderPort,
    @Inject(OAuthProfilePersistencePort)
    private readonly oauthProfilePersistencePort: OAuthProfilePersistencePort,
    @Inject(UserQueryUseCase)
    private readonly userQueryUseCase: UserQueryUseCase,
  ) {}
  async getOAuthProfiles(userId: number): Promise<OAuthProfileDto[]> {
    const profiles =
      await this.oauthProfilePersistencePort.findByUserId(userId);
    return profiles.map((profile) => OAuthProfileDto.fromEntity(profile));
  }
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
  ): Promise<OAuthProfileDto> {
    const vendorProfile = await this.oauthProviderPort.getOAuthProfile(
      dto.code,
      dto.provider,
    );

    await this.checkOAuthProfileDuplicate(
      vendorProfile.id,
      vendorProfile.provider,
    );

    const profile = OAuthProfile.create({
      userId,
      id: vendorProfile.id,
      provider: vendorProfile.provider,
      name: vendorProfile.name,
      email: vendorProfile.email,
    });

    const saved = await this.oauthProfilePersistencePort.save(profile);

    return OAuthProfileDto.fromEntity(saved);
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
