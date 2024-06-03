import { Nil } from '../../../../common/nil/Nil';
import { User } from '../../../domain/User.entity';

export interface UserPersistencePort {
  findUserById(id: number): Promise<Nil<User>>;
  findUsersByIds(ids: number[]): Promise<User[]>;
}

const UserPersistencePort = Symbol.for('UserPersistencePort');
