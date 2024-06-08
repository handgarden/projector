import { Inject, Injectable } from '@nestjs/common';
import { RawFile } from '../../../lib/s3/RawFile';
import { UploadFileQueryUseCase } from '../port/in/UploadFileQueryUseCase';
import { UploadFileMutateUseCase } from '../port/in/UploadFileMutateUseCase';
import { UploadFilePersistencePort } from '../port/out/UploadFilePersistencePort';
import { UploadFile } from '../../domain/UploadFile.entity';
import { User } from '../../../user/domain/User.entity';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { UploadFileDto } from '../port/dto/UploadFile.dto';
import { UploadFileObjectStoragePort } from '../port/out/UploadFileObjectStoragePort';

@Injectable()
export class UploadFileService
  implements UploadFileMutateUseCase, UploadFileQueryUseCase
{
  constructor(
    @Inject(UploadFileObjectStoragePort)
    private readonly uploadFileObjectStoragePort: UploadFileObjectStoragePort,
    @Inject(UploadFilePersistencePort)
    private readonly uploadFilePersistencePort: UploadFilePersistencePort,
  ) {}

  async getUploadFile(key: string): Promise<UploadFileDto> {
    const fileNil = await this.uploadFilePersistencePort.findOneByKey(key);
    if (fileNil.isNil()) {
      throw new Error('File not found');
    }

    const file = fileNil.unwrap();

    const url = await this.getPresignedUrl(file.key);

    return new UploadFileDto(url, file);
  }

  async getUploadFiles(keys: string[]): Promise<UploadFileDto[]> {
    const dto = await Promise.all(keys.map(this.getUploadFile));
    return dto;
  }

  public async uploadFiles(tokenUser: TokenUser, files: RawFile[]) {
    const storedFiles = await Promise.all(
      files.map((file) => this.uploadFileObjectStoragePort.putObject(file)),
    );
    const user = User.of(tokenUser.id);
    const uploadFiles = storedFiles.map((storedFile) =>
      UploadFile.fromStoredFile(user, storedFile),
    );
    const saved = await this.uploadFilePersistencePort.saveMany(uploadFiles);
    return saved.map(
      (uploadFile, index) =>
        new UploadFileDto(storedFiles[index].url, uploadFile),
    );
  }

  public async uploadFile(tokenUser: TokenUser, file: RawFile) {
    const stored = await this.uploadFileObjectStoragePort.putObject(file);
    const uploadFile = UploadFile.fromStoredFile(User.of(tokenUser.id), stored);
    const saved = await this.uploadFilePersistencePort.saveOne(uploadFile);
    return new UploadFileDto(stored.url, saved);
  }

  public async getPresignedUrl(key: string) {
    return this.uploadFileObjectStoragePort.getPresignedUrl(key);
  }
}
