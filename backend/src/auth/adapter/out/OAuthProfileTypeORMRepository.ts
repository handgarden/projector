import { DataSource, Repository } from 'typeorm';
import { OAuthProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProfilePersistencePort } from '../../application/port/out/OAuthProfilePersistencePort';
import { Injectable } from '@nestjs/common';
import { Nil } from '../../../common/nil/Nil';
import { OAuthProvider } from '../../domain/OAuthProvider';

@Injectable()
export class OAuthProfileTypeORMRepository
  extends Repository<OAuthProfile>
  implements OAuthProfilePersistencePort
{
  constructor(dataSource: DataSource) {
    super(OAuthProfile, dataSource.manager);
  }
  findByUserId(userId: number): Promise<OAuthProfile[]> {
    return this.find({
      where: {
        userId,
      },
    });
  }

  async findByProviderAndUserId(
    provider: OAuthProvider,
    userId: number,
  ): Promise<Nil<OAuthProfile>> {
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
  ): Promise<Nil<OAuthProfile>> {
    const profile = await this.findOne({
      where: {
        provider,
        id,
      },
    });
    return Nil.of(profile);
  }

  async removeOne(profile: OAuthProfile): Promise<void> {
    await this.remove(profile);
  }
}
