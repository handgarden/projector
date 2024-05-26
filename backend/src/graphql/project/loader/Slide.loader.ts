import { Injectable, Scope } from '@nestjs/common';
import { SlideRepository } from '../../../core/entity/repository/Slide.repository';
import * as DataLoader from 'dataloader';
import { SlideResponse } from '../response/Slide.response';
import { SlideImageResponse } from '../response/SlideImage.response';

@Injectable({ scope: Scope.REQUEST })
export class SlideLoader {
  constructor(private readonly slideRepository: SlideRepository) {}

  loadSlidesById = new DataLoader<string, SlideResponse[]>(
    async (ids: string[]) => {
      const entries = await this.slideRepository.findSlidesByProjectIds(
        ids.map((i) => parseInt(i)),
      );

      const slideMap = new Map<string, SlideResponse[]>();
      entries.forEach(([id, slides]) => {
        const stringId = id.toString();
        if (slideMap.has(stringId)) {
          return;
        }
        slideMap.set(stringId, slides.map(SlideResponse.fromEntity));
      });

      return ids.map((id) => slideMap.get(id) ?? new Error('Slide not found'));
    },
  );

  loadImagesById = new DataLoader<string, SlideImageResponse[]>(
    async (ids: string[]) => {
      const entries = await this.slideRepository.findImagesByIds(
        ids.map((i) => parseInt(i)),
      );

      const imageMap = new Map<string, SlideImageResponse[]>();

      for (const [id, images] of entries) {
        const stringId = id.toString();

        const imageResponse = await Promise.all(
          images.map(SlideImageResponse.fromEntity),
        );
        if (imageMap.has(stringId)) {
          continue;
        }
        imageMap.set(stringId, imageResponse);
      }

      return ids.map((id) => imageMap.get(id) ?? new Error('Image not found'));
    },
  );
}
