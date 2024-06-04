import { DataSource, Repository } from 'typeorm';
import { User } from '../../../user/domain/User.entity';
import { AuthUserPersistencePort } from '../../application/port/out/AuthUserPersistencePort';
import { Nil } from '../../../common/nil/Nil';

export class AuthUserTypeOrmRepository
  extends Repository<User>
  implements AuthUserPersistencePort
{
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
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
