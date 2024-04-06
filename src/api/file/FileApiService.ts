import { Injectable } from '@nestjs/common';
import { UploadFile } from 'src/core/entity/domain/UploadFile.entity';
import { User } from 'src/core/entity/domain/User.entity';
import { UploadFileRepository } from 'src/core/entity/repository/UploadFile.repository';
import { TokenUser } from 'src/lib/auth/types/TokenUser';
import { S3Service } from 'src/lib/s3/S3.service';

@Injectable()
export class FileApiService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly uploadFileRepository: UploadFileRepository,
  ) {}

  public async uploadFiles(
    files: Express.Multer.File[],
    uploader: TokenUser,
  ): Promise<UploadFile[]> {
    const uploadFiles = await this.s3Service.uploadFiles(files);

    uploadFiles.forEach((uploadFile) => {
      const userEntity = new User();
      userEntity.id = uploader.id;
      uploadFile.uploader = userEntity;
    });

    return this.uploadFileRepository.manager.transaction((em) => {
      return Promise.all(
        uploadFiles.map(async (uploadFile) => {
          return em.save(uploadFile);
        }),
      );
    });
  }
}
