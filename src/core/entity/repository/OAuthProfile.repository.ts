import { DataSource, Repository } from 'typeorm';
import { OAuthProfile } from '../domain/user/OAuthProfile.entity';
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
}
