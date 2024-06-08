import { DataSource, In, Repository } from 'typeorm';
import { UserPersistencePort } from '../../application/port/out/UserPersistencePort';
import { User } from '../../domain/User.entity';
import { Nil } from '../../../common/nil/Nil';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTypeORMRepository
  extends Repository<User>
  implements UserPersistencePort
{
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  async findUserByAccount(account: string): Promise<Nil<User>> {
    const findUser = await this.findOne({
      where: {
        account,
      },
    });
    return Nil.of(findUser);
  }
  async findUserById(id: number): Promise<Nil<User>> {
    const findUser = await this.findOne({
      where: {
        id,
      },
    });
    return Nil.of(findUser);
  }

  findUsersByIds(ids: number[]): Promise<User[]> {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }
}
