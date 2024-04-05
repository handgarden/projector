import { UploadFile } from 'src/core/entity/domain/UploadFile.entity';
import { RawFile } from './RawFile';

export interface ObjectStorageClient {
  getPresignedObjectUrl(bucket: string, key: string): Promise<string>;
  putObject(file: RawFile): Promise<UploadFile>;
  deleteObject(bucket: string, key: string): Promise<void>;
}

export const ObjectStorageClient = Symbol('ObjectStorageClient');
