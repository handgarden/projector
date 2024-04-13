import { Injectable, Scope } from '@nestjs/common';
import { SlideRepository } from '../../../core/entity/repository/Slide.repository';
import * as DataLoader from 'dataloader';
import { SlideImageModel } from '../model/SlideImage.model';

@Injectable({ scope: Scope.REQUEST })
export class SlideLoader {
  constructor(private readonly slideRepository: SlideRepository) {}

  loadImagesById = new DataLoader<string, SlideImageModel[]>(
    async (ids: string[]) => {
      const entries = await this.slideRepository.findImagesByIds(
        ids.map((i) => parseInt(i)),
      );

      const imageMap = new Map<string, SlideImageModel[]>();

      for (const [id, images] of entries) {
        const stringId = id.toString();

        if (imageMap.has(stringId)) {
          continue;
        }

        const imageModels = await Promise.all(
          images.map((image) => SlideImageModel.fromEntity(image)),
        );
        imageMap.set(stringId, imageModels);
      }

      return ids.map((id) => imageMap.get(id) ?? new Error('Image not found'));
    },
  );
}
