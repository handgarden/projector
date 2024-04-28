import { Injectable } from '@nestjs/common';
import { UploadFile } from 'src/core/entity/domain/UploadFile.entity';
import { User } from 'src/core/entity/domain/user/User.entity';
import { UploadFileRepository } from 'src/core/entity/repository/UploadFile.repository';
import { TokenUser } from 'src/lib/auth/types/TokenUser';
import { S3Service } from 'src/lib/s3/S3.service';
import { UploadFileResponseDto } from './dto/UploadFileResponse.dto';

@Injectable()
export class FileApiService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly uploadFileRepository: UploadFileRepository,
  ) {}

  public async uploadFiles(
    files: Express.Multer.File[],
    uploader: TokenUser,
  ): Promise<UploadFileResponseDto[]> {
    const storedFiles = await this.s3Service.uploadFiles(files);

    return this.uploadFileRepository.manager.transaction((em) => {
      return Promise.all(
        storedFiles.map(async (file) => {
          const user = new User();
          user.id = uploader.id;
          const uploadFile = UploadFile.fromStoredFile(user, file);

          await em.save(uploadFile);
          return new UploadFileResponseDto(
            uploadFile.key,
            file.url,
            file.originalName,
          );
        }),
      );
    });
  }
}
