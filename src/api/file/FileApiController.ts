import { Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiController } from 'src/common/decorator/ApiController';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileApiService } from './FileApiService';
import { RestTemplate } from 'src/common/response/RestTemplate';
import { Authorized } from 'src/lib/auth/decorator/Authorized.decorator';
import { CurrentUser } from 'src/lib/auth/decorator/CurrentUser.decorator';
import { TokenUser } from 'src/lib/auth/types/TokenUser';

@ApiController('files')
export class FileApiController {
  constructor(private readonly fileService: FileApiService) {}

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
    const uploadFiles = await this.fileService.uploadFiles(files, user);
    return RestTemplate.OK_WITH_DATA(
      uploadFiles.map((uploadFile) => uploadFile.toDto()),
    );
  }
}
