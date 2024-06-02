import { Nil } from '../../../common/nil/Nil';
import { User } from '../../../core/entity/domain/user/User.entity';

export interface UserPersistencePort {
  findById(id: number): Promise<Nil<User>>;
}

const UserPersistencePort = Symbol.for('UserPersistencePort');
