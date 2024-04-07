import { Inject, Injectable } from '@nestjs/common';
import { ObjectStorageClient } from './ObjectStorageClient';
import { RawFile } from './RawFile';
import { UUIDUtils } from 'src/util/UUIDUtils';

@Injectable()
export class S3Service {
  constructor(
    @Inject(ObjectStorageClient)
    private readonly objectStorageClient: ObjectStorageClient,
  ) {}

  public async uploadFiles(files: Express.Multer.File[]) {
    return Promise.all(
      files.map((file) => {
        return this.uploadFile(file);
      }),
    );
  }

  public async uploadFile(file: Express.Multer.File) {
    const key = UUIDUtils.generateUUID();
    const rawFile = new RawFile(key, file);
    return this.objectStorageClient.putObject(rawFile);
  }

  public async getPresignedUrl(key: string) {
    return this.objectStorageClient.getPresignedUrl(key);
  }
}
