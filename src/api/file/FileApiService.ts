import { Injectable } from '@nestjs/common';
import { UploadFile } from 'src/core/entity/domain/UploadFile.entity';
import { UploadFileRepository } from 'src/core/entity/repository/UploadFile.repository';
import { S3Service } from 'src/lib/s3/S3.service';

@Injectable()
export class FileApiService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly uploadFileRepository: UploadFileRepository,
  ) {}

  public async uploadFiles(
    files: Express.Multer.File[],
  ): Promise<UploadFile[]> {
    const uploadFiles = await this.s3Service.uploadFiles(files);

    return this.uploadFileRepository.manager.transaction((em) => {
      return Promise.all(
        uploadFiles.map(async (uploadFile) => {
          return em.save(uploadFile);
        }),
      );
    });
  }
}
