import { Nil } from '../../../../common/nil/Nil';
import { OAuthProvider } from '../../../domain/OAuthProvider';
import { OAuthProfile } from '../../../domain/OAuthProfile.entity';

export interface OAuthProfilePersistencePort {
  findByProviderAndUserId(
    provider: OAuthProvider,
    userId: number,
  ): Promise<Nil<OAuthProfile>>;
  findByProviderAndId(
    provider: OAuthProvider,
    id: string,
  ): Promise<Nil<OAuthProfile>>;
  save(profile: OAuthProfile): Promise<OAuthProfile>;
  removeOne(profile: OAuthProfile): Promise<void>;
}

export const OAuthProfilePersistencePort = Symbol(
  'OAuthProfilePersistencePort',
);
