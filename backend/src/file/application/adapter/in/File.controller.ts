import { Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiController } from 'src/common/decorator/ApiController';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RestTemplate } from 'src/common/response/RestTemplate';
import { Authorized } from 'src/lib/auth/decorator/Authorized.decorator';
import { CurrentUser } from 'src/lib/auth/decorator/CurrentUser.decorator';
import { TokenUser } from 'src/lib/auth/types/TokenUser';
import { UploadFileMutateUseCase } from '../../port/in/UploadFileMutateUseCase';
import { UUIDUtils } from '../../../../util/UUIDUtils';
import { RawFile } from '../../../../lib/s3/RawFile';

@ApiController('files')
export class FileController {
  constructor(
    private readonly uploadFileMutateUseCase: UploadFileMutateUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    }),
  )
  @Authorized()
  async upload(
    @UploadedFiles()
    files: Express.Multer.File[],
    @CurrentUser() user: TokenUser,
  ) {
    const rawFiles = files.map((file) => {
      const key = UUIDUtils.generateUUID();
      return new RawFile(key, file.originalname, file.buffer);
    });
    const uploadFileDto = await this.uploadFileMutateUseCase.uploadFiles(
      user,
      rawFiles,
    );
    return RestTemplate.OK_WITH_DATA(uploadFileDto);
  }
}
