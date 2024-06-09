import { Inject, Injectable } from '@nestjs/common';
import { ObjectStorageClient } from '../../../lib/s3/ObjectStorageClient';
import { RawFile } from '../../../lib/s3/RawFile';
import { StoredFile } from '../../../lib/s3/StoredFile';
import { UploadFileObjectStoragePort } from '../../application/port/out/UploadFileObjectStoragePort';

@Injectable()
export class UploadObjectStorage implements UploadFileObjectStoragePort {
  constructor(
    @Inject(ObjectStorageClient)
    private readonly objectStorage: ObjectStorageClient,
  ) {}
  putObject(file: RawFile): Promise<StoredFile> {
    return this.objectStorage.putObject(file);
  }
  getPresignedUrl(key: string): Promise<string> {
    return this.objectStorage.getPresignedUrl(key);
  }
}
