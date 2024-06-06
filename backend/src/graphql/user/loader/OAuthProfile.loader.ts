import { Injectable, Scope } from '@nestjs/common';
import { OAuthProfileRepository } from '../../../core/entity/repository/OAuthProfile.repository';
import * as DataLoader from 'dataloader';
import { OAuthProfileResponse } from '../../../auth/adapter/dto/OAuthProfile.response';

@Injectable({
  scope: Scope.REQUEST,
})
export class OAuthProfileLoader {
  constructor(
    private readonly oauthProfileRepository: OAuthProfileRepository,
  ) {}

  public findByUserId = new DataLoader<string, OAuthProfileResponse[]>(
    async (keys) => {
      const profiles = await this.oauthProfileRepository.findByUserIds(
        keys.map((key) => parseInt(key)),
      );
      const profilesMap = new Map<string, OAuthProfileResponse[]>();
      profiles.forEach((profile) => {
        const userId = profile.userId.toString();
        if (!profilesMap.has(userId)) {
          profilesMap.set(userId, [OAuthProfileResponse.fromEntity(profile)]);
        } else {
          profilesMap
            .get(userId)!
            .push(OAuthProfileResponse.fromEntity(profile));
        }
      });

      return keys.map((key) => profilesMap.get(key) ?? []);
    },
  );
}
