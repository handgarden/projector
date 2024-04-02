import { DataSource, Repository } from 'typeorm';
import { User } from '../domain/User.entity';
import { Injectable } from '@nestjs/common';
import { Nil } from 'src/common/nil/Nil';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findOneByAccount(account: string): Promise<Nil<User>> {
    const data = await this.findOne({ where: { account } });
    return new Nil(data);
  }
}