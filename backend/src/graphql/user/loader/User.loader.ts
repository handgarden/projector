import { Injectable, Scope } from '@nestjs/common';
import { ProjectRepository } from '../../../core/entity/repository/Project.repository';
import * as DataLoader from 'dataloader';
import { UserResponse } from '../../../user/adapter/dto/response/User.response';
import { UploadFileRepository } from '../../../core/entity/repository/UploadFile.repository';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadFileRepository: UploadFileRepository,
  ) {}

  loadUsersById = new DataLoader<number, UserResponse>(
    async (ids: number[]) => {
      const entires = await this.projectRepository.findCreatorByIds(
        ids.map((i) => parseInt(i)),
      );

      const userMap = new Map<string, UserResponse>();
      entires.forEach(([id, user]) => {
        const stringId = id.toString();
        if (userMap.has(stringId)) {
          return;
        }
        userMap.set(stringId, UserResponse.fromEntity(user));
      });

      return ids.map((id) => userMap.get(id) ?? new Error('User not found'));
    },
  );

  findUserByFileKeys = new DataLoader<string, UserResponse>(
    async (keys: string[]) => {
      const entries = await this.uploadFileRepository.findUserByKeys(keys);

      const userMap = new Map<string, UserResponse>();

      entries.forEach(([key, user]) => {
        if (userMap.has(key)) {
          return;
        }
        userMap.set(key, UserResponse.fromEntity(user));
      });

      return keys.map((key) => userMap.get(key) ?? new Error('User not found'));
    },
  );
}
