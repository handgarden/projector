import { DataSource, Repository } from 'typeorm';
import { User } from '../domain/user/User.entity';
import { Injectable } from '@nestjs/common';
import { Nil } from 'src/common/nil/Nil';
import { OAuthProfileDto } from '../../../lib/auth/oauth/dto/OAuthProfile';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findOneByAccount(account: string): Promise<Nil<User>> {
    const user = await this.findOne({ where: { account } });
    return Nil.of(user);
  }

  async findById(id: number): Promise<Nil<User>> {
    const user = await this.findOne({ where: { id } });
    return Nil.of(user);
  }

  async findOneByOAuthProfile(oAuthProfile: OAuthProfileDto) {
    const user = await this.findOne({
      where: {
        oauthProfile: {
          provider: oAuthProfile.provider,
          id: oAuthProfile.id,
        },
      },
    });
    return Nil.of(user);
  }
}
