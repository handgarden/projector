import { Nil } from '../../../../common/nil/Nil';
import { User } from '../../../../core/entity/domain/user/User.entity';

export interface UserPersistencePort {
  findUserById(id: number): Promise<Nil<User>>;
  findUsersByIds(ids: number[]): Promise<User[]>;
}

const UserPersistencePort = Symbol.for('UserPersistencePort');
