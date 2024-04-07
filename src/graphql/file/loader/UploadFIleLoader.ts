import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserModel } from '../../user/model/User.model';
import { UploadFileRepository } from '../../../core/entity/repository/UploadFile.repository';

@Injectable({ scope: Scope.REQUEST })
export class UploadFileLoader {
  constructor(private readonly uploadFileRepository: UploadFileRepository) {}

  findUserModelByKeys = new DataLoader<string, UserModel>(
    async (keys: string[]) => {
      const entries = await this.uploadFileRepository.findUserByKeys(keys);

      const userMap = new Map<string, UserModel>();

      entries.forEach(([key, user]) => {
        if (userMap.has(key)) {
          return;
        }
        const userModel = UserModel.fromEntity(user);
        userMap.set(key, userModel);
      });

      return keys.map((key) => userMap.get(key) ?? new Error('User not found'));
    },
  );
}
