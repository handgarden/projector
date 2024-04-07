import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserModel } from '../../user/model/User.model';
import { ProjectRepository } from '../../../core/entity/repository/Project.repository';
import { SlideModel } from '../model/Slide.model';

@Injectable({ scope: Scope.REQUEST })
export class ProjectLoader {
  constructor(private readonly projectRepository: ProjectRepository) {}

  loadUserById = new DataLoader<string, UserModel>(async (ids: string[]) => {
    const entires = await this.projectRepository.findCreatorByIds(
      ids.map((i) => parseInt(i)),
    );

    const userMap = new Map<string, UserModel>();
    entires.forEach(([id, user]) => {
      const stringId = id.toString();
      if (userMap.has(stringId)) {
        return;
      }
      const userModel = UserModel.fromEntity(user);
      userMap.set(stringId, userModel);
    });

    return ids.map((id) => userMap.get(id) ?? new Error('User not found'));
  });

  loadSlidesById = new DataLoader<string, SlideModel[]>(
    async (ids: string[]) => {
      const entries = await this.projectRepository.findSlidesByIds(
        ids.map((i) => parseInt(i)),
      );

      const slideMap = new Map<string, SlideModel[]>();
      entries.forEach(([id, slides]) => {
        const stringId = id.toString();
        if (slideMap.has(stringId)) {
          return;
        }
        const slideModels = slides.map((slide) => SlideModel.fromEntity(slide));
        slideMap.set(stringId, slideModels);
      });

      return ids.map((id) => slideMap.get(id) ?? new Error('Slide not found'));
    },
  );
}
