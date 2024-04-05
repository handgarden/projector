import { Inject, Injectable } from '@nestjs/common';
import { ObjectStorageClient } from './ObjectStorageClient';
import { RawFile } from './RawFile';
import { UUIDUtilService } from 'src/util/UUIDUtil.service';

@Injectable()
export class S3Service {
  constructor(
    @Inject(ObjectStorageClient)
    private readonly objectStorageClient: ObjectStorageClient,
    private readonly uuidService: UUIDUtilService,
  ) {}

  public async uploadFiles(files: Express.Multer.File[]) {
    return Promise.all(
      files.map((file) => {
        return this.uploadFile(file);
      }),
    );
  }

  public async uploadFile(file: Express.Multer.File) {
    const key = this.uuidService.generateUUID();
    const rawFile = new RawFile(key, file);
    return this.objectStorageClient.putObject(rawFile);
  }
}
