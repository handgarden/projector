import { DataSource, Repository } from 'typeorm';
import { UserPersistencePort } from '../../application/out/UserPersistencePort';
import { User } from '../../../core/entity/domain/user/User.entity';
import { Nil } from '../../../common/nil/Nil';

export class UserTypeORMRepository
  extends Repository<User>
  implements UserPersistencePort
{
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  async findById(id: number): Promise<Nil<User>> {
    const findUser = await this.findOne({
      where: {
        id,
      },
    });
    return Nil.of(findUser);
  }
}
