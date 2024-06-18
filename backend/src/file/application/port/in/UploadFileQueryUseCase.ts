import { UploadFileDto } from '../dto/UploadFile.dto';

export interface UploadFileQueryUseCase {
  getPresignedUrl(key: string): Promise<string>;
  getUploadFile(key: string): Promise<UploadFileDto>;
  getUploadFiles(keys: string[]): Promise<UploadFileDto[]>;
}

export const UploadFileQueryUseCase = Symbol('UploadFileQueryUseCase');
