import { Nil } from '../../../../common/nil/Nil';
import { UploadFile } from '../../../domain/UploadFile.entity';

export interface UploadFilePersistencePort {
  findOneByKey(key: string): Promise<Nil<UploadFile>>;
  findByKeysIn(keys: string[]): Promise<UploadFile[]>;
  saveOne(uploadFile: UploadFile): Promise<UploadFile>;
  saveMany(uploadFiles: UploadFile[]): Promise<UploadFile[]>;
}

export const UploadFilePersistencePort = Symbol('UploadFilePersistencePort');
