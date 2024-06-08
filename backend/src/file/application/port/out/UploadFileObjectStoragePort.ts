import { RawFile } from '../../../../lib/s3/RawFile';
import { StoredFile } from '../../../../lib/s3/StoredFile';

export interface UploadFileObjectStoragePort {
  putObject(file: RawFile): Promise<StoredFile>;
  getPresignedUrl(key: string): Promise<string>;
}

export const UploadFileObjectStoragePort = Symbol(
  'UploadFileObjectStoragePort',
);
