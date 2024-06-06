import { DataSource, Repository } from 'typeorm';
import { OAuthUserProfile } from '../../domain/OAuthProfile.entity';
import { OAuthUserProfilePersistencePort } from '../../application/port/out/OAuthUserProfilePersistencePort';
import { Injectable } from '@nestjs/common';
import { Nil } from '../../../common/nil/Nil';
import { OAuthProvider } from '../../domain/OAuthProvider';

@Injectable()
export class OAuthUserProfileTypeORMRepository
  extends Repository<OAuthUserProfile>
  implements OAuthUserProfilePersistencePort
{
  constructor(dataSource: DataSource) {
    super(OAuthUserProfile, dataSource.manager);
  }

  async findByProviderAndUserId(
    provider: OAuthProvider,
    userId: number,
  ): Promise<Nil<OAuthUserProfile>> {
    const profile = await this.findOne({
      where: {
        provider,
        userId,
      },
    });
    return Nil.of(profile);
  }
  async findByProviderAndId(
    provider: OAuthProvider,
    id: string,
  ): Promise<Nil<OAuthUserProfile>> {
    const profile = await this.findOne({
      where: {
        provider,
        id,
      },
    });
    return Nil.of(profile);
  }

  async removeOne(profile: OAuthUserProfile): Promise<void> {
    await this.remove(profile);
  }
}
