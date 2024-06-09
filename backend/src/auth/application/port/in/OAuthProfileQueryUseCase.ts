import { OAuthProfileDto } from '../../dto/OAuthProfile.dto';
export interface OAuthProfileQueryUseCase {
  getOAuthProfiles(userId: number): Promise<OAuthProfileDto[]>;
}

export const OAuthProfileQueryUseCase = Symbol('OAuthProfileQueryUseCase');
