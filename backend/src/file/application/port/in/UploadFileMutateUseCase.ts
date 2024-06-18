import { TokenUser } from '../../../../lib/auth/types/TokenUser';
import { RawFile } from '../../../../lib/s3/RawFile';
import { UploadFileDto } from '../dto/UploadFile.dto';

export interface UploadFileMutateUseCase {
  uploadFiles(user: TokenUser, files: RawFile[]): Promise<UploadFileDto[]>;
  uploadFile(user: TokenUser, file: RawFile): Promise<UploadFileDto>;
}

export const UploadFileMutateUseCase = Symbol('UploadFileMutateUseCase');
