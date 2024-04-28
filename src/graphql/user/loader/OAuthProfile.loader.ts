import { Injectable, Scope } from '@nestjs/common';
import { OAuthProfileRepository } from '../../../core/entity/repository/OAuthProfile.repository';
import * as DataLoader from 'dataloader';
import { OAuthProfileModel } from '../model/OAuthProfile.model';

@Injectable({
  scope: Scope.REQUEST,
})
export class OAuthProfileLoader {
  constructor(
    private readonly oauthProfileRepository: OAuthProfileRepository,
  ) {}

  public findByUserId = new DataLoader<string, OAuthProfileModel[]>(
    async (keys) => {
      const profiles = await this.oauthProfileRepository.findByUserIds(
        keys.map((key) => parseInt(key)),
      );
      const profilesMap = new Map<string, OAuthProfileModel[]>();
      profiles.forEach((profile) => {
        const userId = profile.userId.toString();
        const model = OAuthProfileModel.fromEntity(profile);
        if (!profilesMap.has(userId)) {
          profilesMap.set(userId, [model]);
        } else {
          profilesMap.get(userId)!.push(model);
        }
      });

      return keys.map((key) => profilesMap.get(key) ?? []);
    },
  );
}
