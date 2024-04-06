import { RawFile } from './RawFile';
import { StoredFile } from './StoredFile';

export interface ObjectStorageClient {
  getPresignedObjectUrl(bucket: string, key: string): Promise<string>;
  putObject(file: RawFile): Promise<StoredFile>;
  deleteObject(bucket: string, key: string): Promise<void>;
}

export const ObjectStorageClient = Symbol('ObjectStorageClient');
