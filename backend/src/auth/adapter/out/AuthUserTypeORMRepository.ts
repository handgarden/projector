import { DataSource, Repository } from 'typeorm';
import { User } from '../../../user/domain/User.entity';
import { AuthUserPersistencePort } from '../../application/port/out/AuthUserPersistencePort';
import { Nil } from '../../../common/nil/Nil';
import { Injectable } from '@nestjs/common';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';

@Injectable()
export class AuthUserTypeOrmRepository
  extends Repository<User>
  implements AuthUserPersistencePort
{
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  async findOneByOAuthProfileIdAndProvider(
    id: string,
    provider: OAuthProvider,
  ): Promise<Nil<User>> {
    const user = await this.findOne({
      where: {
        oauthProfile: {
          id,
          provider,
        },
      },
    });
    return Nil.of(user);
  }

  async findOneByAccount(account: string): Promise<Nil<User>> {
    const find = await this.findOne({
      where: {
        account,
      },
    });
    return Nil.of(find);
  }
}
