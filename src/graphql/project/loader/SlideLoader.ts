import { Injectable, Scope } from '@nestjs/common';
import { SlideRepository } from '../../../core/entity/repository/Slide.repository';
import * as DataLoader from 'dataloader';
import { UploadFileModel } from '../../file/model/UploadFile.model';

@Injectable({ scope: Scope.REQUEST })
export class SlideLoader {
  constructor(private readonly slideRepository: SlideRepository) {}

  loadImagesById = new DataLoader<string, UploadFileModel[]>(
    async (ids: string[]) => {
      const entries = await this.slideRepository.findImagesByIds(
        ids.map((i) => parseInt(i)),
      );

      const imageMap = new Map<string, UploadFileModel[]>();
      entries.forEach(([id, images]) => {
        const stringId = id.toString();

        if (imageMap.has(stringId)) {
          return;
        }
        const imageModels = images.map((image) =>
          UploadFileModel.fromEntity(image),
        );
        imageMap.set(stringId, imageModels);
      });

      return ids.map((id) => imageMap.get(id) ?? new Error('Image not found'));
    },
  );
}
