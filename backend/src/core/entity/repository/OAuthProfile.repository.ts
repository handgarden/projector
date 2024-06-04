import { DataSource, In, Repository } from 'typeorm';
import { OAuthProfile } from '../../../auth/domain/OAuthProfile.entity';
import { Injectable } from '@nestjs/common';
import { OAuthProvider } from '../enum/OAuthProvider';
import { Nil } from '../../../common/nil/Nil';

@Injectable()
export class OAuthProfileRepository extends Repository<OAuthProfile> {
  constructor(dataSource: DataSource) {
    super(OAuthProfile, dataSource.manager);
  }

  async findOneByProviderAndUserId(provider: OAuthProvider, userId: number) {
    const data = await this.findOne({
      where: {
        provider,
        userId,
      },
    });

    return Nil.of(data);
  }

  async findByUserIds(userIds: number[]) {
    const profiles = await this.find({
      where: {
        userId: In(userIds),
      },
    });

    return profiles;
  }

  async deleteByUserIdAndProvider(userId: number, provider: OAuthProvider) {
    await this.delete({
      userId,
      provider,
    });
  }
}
