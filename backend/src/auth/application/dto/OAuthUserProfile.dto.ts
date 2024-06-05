import { OAuthUserProfile } from '../../domain/OAuthProfile.entity';

export class OAuthUserProfileDto {
  id: string;
  userId: number;
  name: string;
  email: string | null;
  provider: string;
  static fromEntity(entity: OAuthUserProfile) {
    const profile = new OAuthUserProfileDto();
    profile.id = entity.id;
    profile.name = entity.username;
    profile.email = entity.email;
    profile.provider = entity.provider;
    return profile;
  }
}
