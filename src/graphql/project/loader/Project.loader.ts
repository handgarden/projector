import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { SlideImageRepository } from '../../../core/entity/repository/SlideImage.repository';
import { Nil } from '../../../common/nil/Nil';

@Injectable({ scope: Scope.REQUEST })
export class ProjectLoader {
  constructor(private readonly slideImageRepository: SlideImageRepository) {}

  loadThumbnailKeysById = new DataLoader<string, Nil<string>>(
    async (ids: string[]) => {
      const entires = await this.slideImageRepository.findThumbnailByProjectIds(
        ids.map((i) => parseInt(i)),
      );

      const thumbnailMap = new Map<string, string>();
      entires.forEach(([id, thumbnail]) => {
        const stringId = id.toString();
        if (thumbnailMap.has(stringId)) {
          return;
        }
        thumbnailMap.set(stringId, thumbnail);
      });

      return ids.map((id) => Nil.of(thumbnailMap.get(id)));
    },
  );
}
