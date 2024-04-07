import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileRepository } from '../../core/entity/repository/UploadFile.repository';
import { UploadFileModel } from './UploadFile.model';
import { S3Service } from '../../lib/s3/S3.service';

@Injectable()
export default class UploadFileGqlService {
  constructor(
    private readonly uploadFileRepository: UploadFileRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getUploadFile(key: string) {
    const nilFile = await this.uploadFileRepository.findByKey(key);
    if (nilFile.isNil()) {
      throw new NotFoundException();
    }

    const file = nilFile.unwrap();
    const url = await this.s3Service.getPresignedUrl(key);

    return UploadFileModel.fromEntity(file, url);
  }

  async getUploadFiles(keys: string[]) {
    return Promise.all(
      keys.map((key) => {
        return this.getUploadFile(key);
      }),
    );
  }
}
