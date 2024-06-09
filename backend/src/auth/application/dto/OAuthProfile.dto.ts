import { OAuthProfile } from '../../domain/OAuthProfile.entity';

export class OAuthProfileDto {
  id: string;
  userId: number;
  name: string;
  email: string | null;
  provider: string;
  static fromEntity(entity: OAuthProfile) {
    const profile = new OAuthProfileDto();
    profile.id = entity.id;
    profile.name = entity.username;
    profile.email = entity.email;
    profile.provider = entity.provider;
    return profile;
  }
}
