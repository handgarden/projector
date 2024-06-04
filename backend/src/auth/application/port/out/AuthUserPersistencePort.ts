import { Nil } from '../../../../common/nil/Nil';
import { User } from '../../../../user/domain/User.entity';

export interface AuthUserPersistencePort {
  save(user: User): Promise<User>;
  findOneByAccount(account: string): Promise<Nil<User>>;
}
