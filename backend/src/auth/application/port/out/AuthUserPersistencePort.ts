import { Nil } from '../../../../common/nil/Nil';
import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { User } from '../../../../user/domain/User.entity';

export interface AuthUserPersistencePort {
  save(user: User): Promise<User>;
  findOneByAccount(account: string): Promise<Nil<User>>;
  findOneByOAuthProfileIdAndProvider(
    id: string,
    provider: OAuthProvider,
  ): Promise<Nil<User>>;
}

export const AuthUserPersistencePort = Symbol('AuthUserPersistencePort');
