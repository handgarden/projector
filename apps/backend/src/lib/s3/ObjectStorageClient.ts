import { RawFile } from './RawFile';
import { StoredFile } from './StoredFile';

export interface ObjectStorageClient {
  getPresignedUrl(key: string): Promise<string>;
  putObject(file: RawFile): Promise<StoredFile>;
  deleteObject(key: string): Promise<void>;
}

export const ObjectStorageClient = Symbol('ObjectStorageClient');
