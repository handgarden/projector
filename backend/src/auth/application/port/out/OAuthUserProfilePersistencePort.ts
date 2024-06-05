import { Nil } from '../../../../common/nil/Nil';
import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { OAuthUserProfile } from '../../../domain/OAuthProfile.entity';

export interface OAuthUserProfilePersistencePort {
  findByProviderAndUserId(
    provider: OAuthProvider,
    userId: number,
  ): Promise<Nil<OAuthUserProfile>>;
  findByProviderAndId(
    provider: OAuthProvider,
    id: string,
  ): Promise<Nil<OAuthUserProfile>>;
  save(profile: OAuthUserProfile): Promise<OAuthUserProfile>;
  removeOne(profile: OAuthUserProfile): Promise<void>;
}

export const OAuthUserProfilePersistencePort = Symbol(
  'OAuthUserProfilePersistencePort',
);
