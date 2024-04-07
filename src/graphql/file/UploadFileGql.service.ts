import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileRepository } from '../../core/entity/repository/UploadFile.repository';
import { UploadFileModel } from './UploadFile.model';

@Injectable()
export default class UploadFileGqlService {
  constructor(private readonly uploadFileRepository: UploadFileRepository) {}

  async getUploadFile(key: string) {
    const nilFile = await this.uploadFileRepository.findByKey(key);
    if (nilFile.isNil()) {
      throw new NotFoundException();
    }

    const file = nilFile.unwrap();

    return UploadFileModel.fromEntity(file);
  }

  async getUploadFiles(keys: string[]) {
    return Promise.all(
      keys.map((key) => {
        return this.getUploadFile(key);
      }),
    );
  }
}
